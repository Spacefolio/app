import { BaseExchange, Exchange, IExchange, IExchangeCredentials } from '../../../core/entities';
import { IDigitalAssetEntityGateway } from '../../../core/use-cases/integration/digitalAsset';
import { VerifyCredentialsHandler } from '../../../core/use-cases/integration/exchangeAccount/addExchangeAccount/AddExchangeAccount';
import CcxtExchangeAdapter from './CcxtExchangeAdapter';
import CcxtService from './CcxtService';
import { Coinbase } from './Implementations/Coinbase';
import { CoinbasePro } from './Implementations/CoinbasePro';
import { FakeExchange } from './Implementations/FakeExchange';

class ExchangesConfiguration {
	digitalAssetEntityGateway: IDigitalAssetEntityGateway;
	exchanges: Map<Exchange, BaseExchange>;

	constructor (digitalAssetEntityGateway: IDigitalAssetEntityGateway) {
		this.digitalAssetEntityGateway = digitalAssetEntityGateway;

		const ccxtExchangeAdapter = new CcxtExchangeAdapter(this.digitalAssetEntityGateway);

		this.exchanges = new Map<Exchange, BaseExchange>([
			[Exchange.FAKE, new FakeExchange()],
			[Exchange.COINBASE, new Coinbase(ccxtExchangeAdapter)],
			[Exchange.COINBASEPRO, new CoinbasePro(ccxtExchangeAdapter)],
		]);
		
		this.get = this.get.bind(this);
		this.getAvailableExchanges = this.getAvailableExchanges.bind(this);
	}

	public get(exchange: Exchange): BaseExchange {
		return <BaseExchange>this.exchanges.get(exchange);
	}

	public getAvailableExchanges(): IExchange[] {
		const availableExchanges: IExchange[] = [];
		this.exchanges.forEach((value: BaseExchange, key: Exchange) => {
			if (key === Exchange.FAKE) {
				return;
			}
			availableExchanges.push(value as IExchange);
		});

		return availableExchanges;
	}

	static getVerifyCredentials(): VerifyCredentialsHandler {
		return ExchangesConfiguration.verifyCredentials;
	}

	private static async verifyCredentials(exchange: Exchange, credentials: IExchangeCredentials): Promise<boolean> {
		return await CcxtService.verifyCredentials(exchange, credentials);
	}
}

export default ExchangesConfiguration;
