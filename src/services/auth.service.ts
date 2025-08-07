import { PrismaClient } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Service } from 'typedi';
import { SECRET_KEY } from '@config';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/httpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';

@Service()
export class AuthService {
  public users = new PrismaClient().user;

  public async signup(userData: CreateUserDto): Promise<User> {
    const findUserWithDuplicateData: User = await this.users.findFirst({
      where: {
        OR: [
          { email: userData.email },
          { cpf: userData.cpf },
          { phone: userData.phone }
        ]
      }
    });

    if (findUserWithDuplicateData) {
      if (findUserWithDuplicateData.email === userData.email)
        throw new HttpException(409, `This email "${userData.email}" already exists`);

      else if (findUserWithDuplicateData.cpf === userData.cpf)
        throw new HttpException(409, `This cpf "${userData.cpf}" already exists`);

      else if (findUserWithDuplicateData.phone === userData.phone)
        throw new HttpException(409, `This phone "${userData.phone}" already exists`);
    }

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: Promise<User> = this.users.create({ data: { ...userData, password: hashedPassword } });

    return createUserData;
  }

  public async login(userData: CreateUserDto): Promise<{ cookie: string; findUser: User }> {
    const findUser: User = await this.users.findUnique({ where: { email: userData.email } });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, "Password is not matching");

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return { cookie, findUser };
  }

  public async logout(userData: User): Promise<User> {
    const findUser: User = await this.users.findFirst({
      where: {
        email: userData.email,
        password: userData.password
      }
    });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}
