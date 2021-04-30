import { Request } from 'express';

export default interface RequestWithJwt extends Request {
	user: {
		sub: string;
	}
}