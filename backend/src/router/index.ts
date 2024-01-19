import {Router} from 'express';

import authentication from './authentication';
import users from './users';
import logs from './logs';
import reports from './reports';

const router = Router();

export default (): Router => {
    authentication(router);
    users(router);
    logs(router);
    reports(router);
    return router;
}