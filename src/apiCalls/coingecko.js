export const getCoins = async (limit) => {
	try {
		const coins = await fetch(
			'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=25&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d'
		);
		return coins.json();
	} catch (error) {
		console.log(error);
	}
};
