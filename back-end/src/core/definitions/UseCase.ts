// eslint-disable-next-line @typescript-eslint/ban-types
interface IUseCase<Request = {}, Response = {}> {
  execute(request: Request): Promise<Response>;
}

export default IUseCase;