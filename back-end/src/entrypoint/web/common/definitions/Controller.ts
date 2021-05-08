import { Request, RequestHandler, Response, NextFunction } from 'express';
import { UseCaseError } from '../../../../core/definitions';
import IUseCase from '../../../../core/definitions/UseCase';

export const awaitHandlerFactory = (middleware: RequestHandler) => {
	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			middleware(req, res, next);
		} catch (error) {
			next(error);
		}
	};
};

type JsonResponse = Response<unknown, Record<string, unknown>>;
type Payload = Record<string, unknown>;

abstract class BaseController<T extends IUseCase = IUseCase> {
	protected usecase: T;

	constructor(usecase: T) { 
		this.usecase = usecase;
	}

	protected abstract processRequest(req: Request, res: Response, next: NextFunction): Promise<void>;

	public getRequestHandler(): RequestHandler {
		const handler = this.processRequest.bind(this);
		return awaitHandlerFactory(handler);
	}

	protected ok<T>(res: Response, dto?: T): JsonResponse {
		if (dto) {
			res.type('application/json');
			return res.status(200).json(dto);
		} else {
			return res.sendStatus(200);
		}
	}

	protected fail(res: Response, error: Error | string): JsonResponse {
		console.log(error);
		if (error instanceof Error) {
			const name = error.name;
			return res.status(500).json({
				error: {
					name,
					message: error.message
				}
			});
		}

		return res.status(500).json({
			error: {
				message: error.toString(),
			}
		});
	}

	protected badRequest(res: Response, error?: UseCaseError): JsonResponse {
		return BaseController.jsonResponse(res, 400, { error: { name: error?.name || 'Bad Request', message: error?.message || 'Bad Request' } });
	}

	protected unauthorized(res: Response, error?: UseCaseError): JsonResponse {
		return BaseController.jsonResponse(res, 401, { error: { name: error?.name || 'Unauthorized Request', message: error?.message || 'Unauthorized' } });
	}

	protected forbidden(res: Response, error?: UseCaseError): JsonResponse {
		return BaseController.jsonResponse(res, 403, { error: { name: error?.name || 'Access Denied', message: error?.message || 'Forbidden' } });
	}

	protected notFound(res: Response, error?: UseCaseError): JsonResponse {
		return BaseController.jsonResponse(res, 404, { error: { name: error?.name || 'Resource Not Found', message: error?.message || 'Not Found' } });
	}

	protected unprocessable(res: Response, error?: UseCaseError): JsonResponse {
		return BaseController.jsonResponse(res, 422, { error: { name: error?.name || 'Unprocessable Entity', message: error?.message || 'Unprocessable Entity' } });
	}

	protected created(res: Response, payload: Payload = {}): JsonResponse {
		return BaseController.jsonResponse(res, 201, payload);
	}

	protected static jsonResponse(res: Response, code: number, payload: Payload): JsonResponse {
		return res.status(code).json(payload);
	}
}

export default BaseController;
