import expressJwt from 'express-jwt';
import { Request } from 'express';
const config = require('config.json');
import { userService } from '../users/user.service';

export default jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, algorithms: ['HS256'], isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate',
            '/users/register',
            '/users/registration-check'
        ]
    });
}

async function isRevoked(req: Request, payload: any, done: any) {
    const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};