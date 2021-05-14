import { AddExchangeAccountInvalidRequest, AddExchangeAccountRequest, AddExchangeAccountResponse, InvalidExchangeCredentials, UserNotFound } from '.';
import { IUseCase, Result } from '../../../../definitions';
import { Exchange, ExchangeAccount, IExchangeCredentials, User } from '../../../../entities';
import { IUserEntityGateway } from '../../../user';
import IExchangeAccountEntityGateway from '../ExchangeAccountEntityGateway';

export type VerifyCredentialsHandler = (exchange: Exchange, exchangeCredentials: IExchangeCredentials) => Promise<boolean>;

class AddExchangeAccountUseCase implements IUseCase<AddExchangeAccountRequest, AddExchangeAccountResponse> {
	private userEntityGateway: IUserEntityGateway;
	private exchangeAccountEntityGateway: IExchangeAccountEntityGateway;
	private generateId: () => string;
	private verifyCredentials: VerifyCredentialsHandler;

	constructor(
		userEntityGateway: IUserEntityGateway,
		exchangeAccountEntityGateway: IExchangeAccountEntityGateway,
		generateId: () => string,
		verifyCredentials: VerifyCredentialsHandler
	) {
		this.userEntityGateway = userEntityGateway;
		this.exchangeAccountEntityGateway = exchangeAccountEntityGateway;
		this.generateId = generateId;
		this.verifyCredentials = verifyCredentials;
	}

	async execute(request: AddExchangeAccountRequest): Promise<AddExchangeAccountResponse> {
		if (!request || !request.email || !request.nickname || !request.credentials || !request.exchange) {
			return Result.fail(new AddExchangeAccountInvalidRequest(request));
		}

		const exchange = <Exchange> request.exchange;

		const user: User | undefined = await this.userEntityGateway.getUser(request.email);

		if (!user) { return Result.fail(new UserNotFound(request.email)); }

		let accountId: string;
		do { accountId = this.generateId();	} 
    while (await this.exchangeAccountEntityGateway.exists(accountId));

		const validCredentials = await this.verifyCredentials(exchange, request.credentials);
		if (!validCredentials) {
			return Result.fail(new InvalidExchangeCredentials(request.credentials));
		}

		const savedAccount = await this.exchangeAccountEntityGateway.createExchangeAccount({ ...request, accountId });
		await this.userEntityGateway.addExchangeAccountForUser(request.email, savedAccount);

		return Result.ok<ExchangeAccount>(savedAccount);
	}
}

export default AddExchangeAccountUseCase;
