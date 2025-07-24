import { App } from '@/app';
import { ValidateEnv } from '@utils/validateEnv';

import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { EventRoute } from '@routes/events.route';
import { CategoryRoute } from '@routes/categories.route';

ValidateEnv();

const app = new App([new UserRoute(), new AuthRoute(), new EventRoute(), new CategoryRoute()]);

app.listen();
