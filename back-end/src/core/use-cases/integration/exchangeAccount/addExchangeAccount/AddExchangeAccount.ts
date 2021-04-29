import { AddExchangeAccountInvalidRequest, AddExchangeAccountRequest, AddExchangeAccountResponse, UserNotFound } from '.';
import { IUseCase, Result } from '../../../../definitions';
import { ExchangeAccount, User } from '../../../../entities';
import { IUserEntityGateway } from '../../../user';
import IExchangeAccountEntityGateway from '../ExchangeAccountEntityGateway';

class AddExchangeAccountUseCase implements IUseCase<AddExchangeAccountRequest, AddExchangeAccountResponse> {
	private userEntityGateway: IUserEntityGateway;
	private exchangeAccountEntityGateway: IExchangeAccountEntityGateway;
	private generateId: () => string;

	constructor(
		userEntityGateway: IUserEntityGateway,
		exchangeAccountEntityGateway: IExchangeAccountEntityGateway,
		generateId: () => string
	) {
		this.userEntityGateway = userEntityGateway;
		this.exchangeAccountEntityGateway = exchangeAccountEntityGateway;
		this.generateId = generateId;
	}

	async execute(request: AddExchangeAccountRequest): Promise<AddExchangeAccountResponse> {
		if (!request || !request.email || !request.nickname || !request.credentials) {
			return Result.fail(new AddExchangeAccountInvalidRequest(request));
		}

		const user: User | undefined = await this.userEntityGateway.getUser(request.email);

		if (!user) { return Result.fail(new UserNotFound(request.email)); }

		let accountId: string;
		do { accountId = this.generateId();	} 
    while (await this.exchangeAccountEntityGateway.exists(accountId));

		const savedAccount = await this.exchangeAccountEntityGateway.createExchangeAccount({ ...request, accountId });
		await this.userEntityGateway.addExchangeAccountForUser(request.email, savedAccount);

		return Result.ok<ExchangeAccount>(savedAccount);
	}
}

export default AddExchangeAccountUseCase;
