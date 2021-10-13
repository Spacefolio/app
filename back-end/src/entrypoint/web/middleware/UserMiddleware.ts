import { Request, Response, NextFunction } from 'express';
import argon2 from 'argon2';
import config from '../../../config';
import jwt from 'jsonwebtoken';

const tokenExpirationInSeconds = 360000;

class UserMiddleware {

	async createJwt(req: Request, res: Response) {
    try {
      const token = jwt.sign({ sub: req.body.email }, config.secret, {
        expiresIn: tokenExpirationInSeconds
      });
      return res
        .status(201)
        .send({ email: req.body.email, token });
    } catch (err) {
      return res.status(500).send();
    }
  }

  /*
	async validJwtNeeded(req: Request, res: Response, next: NextFunction) {
    if (!req.headers['authorization']) { return res.status(401).send(); }

    try {
      const authorization = req.headers['authorization'].split(' ');
      if (authorization[0] !== 'Bearer') { return res.status(401).send(); }
      
      res.locals.jwt = jwt.verify(authorization[1], config.secret) as Token;
      next();
    } catch (err) { return res.status(403).send(); }
  }
  */

	async hashPassword(req: Request, res: Response, next: NextFunction) {
    if (req.body?.password) {
      req.body.password = await argon2.hash(req.body.password);
    }
    next();
	}
}

export default new UserMiddleware();