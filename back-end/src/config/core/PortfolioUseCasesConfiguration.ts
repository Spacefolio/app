import { IDigitalAssetHistoryEntityGateway } from '../../core/use-cases/integration/digitalAsset';
import { IExchangeAccountEntityGateway } from '../../core/use-cases/integration/exchangeAccount';
import { GetMetaportfolioChartUseCase } from '../../core/use-cases/portfolio/getMetaportfolioChart';
import { IUserEntityGateway } from '../../core/use-cases/user';

class PortfolioUseCasesConfiguration {
	static getGetMetaportfolioChartUseCase(
		userEntityGateway: IUserEntityGateway,
		exchangeAccountGateway: IExchangeAccountEntityGateway,
		digitalAssetHistoryEntityGateway: IDigitalAssetHistoryEntityGateway
	): GetMetaportfolioChartUseCase {
		return new GetMetaportfolioChartUseCase(userEntityGateway, exchangeAccountGateway, digitalAssetHistoryEntityGateway);
	}
}

export default PortfolioUseCasesConfiguration;
