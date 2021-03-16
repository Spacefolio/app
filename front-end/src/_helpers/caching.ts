import { ICachedPortfolioDataView, IPortfolioDataView } from '../../../types';

export const updateCachedPortfolio = (portfolio: IPortfolioDataView) => {
	let cachedPortfolios = JSON.parse(localStorage.getItem('Portfolio'));

	if (cachedPortfolios) {
		const updatedList = cachedPortfolios.map((item: IPortfolioDataView) =>
			item.id === portfolio.id
				? { ...portfolio, lastRefresh: Date.now() }
				: item
		);
		localStorage.setItem('Portfolio', JSON.stringify(updatedList));
	} else {
		localStorage.setItem('Portfolio', JSON.stringify([portfolio]));
	}
};

export const getCachedPortfolio = (
	portfolioId: string
): ICachedPortfolioDataView => {
	let cachedPortfolios = JSON.parse(localStorage.getItem('Portfolio'));

	if (cachedPortfolios) {
		let portfolio = cachedPortfolios.filter(
			(item: IPortfolioDataView) => item.id === portfolioId
		);
		if (portfolio.length > 0) {
			return portfolio[0];
		}
	}

	return null;
};

export const getCachedPortfolios = (): ICachedPortfolioDataView[] => {
	let cachedPortfolios = JSON.parse(localStorage.getItem('Portfolio'));

	return cachedPortfolios ? cachedPortfolios : null;
};
