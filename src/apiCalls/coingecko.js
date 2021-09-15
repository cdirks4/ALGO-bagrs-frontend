export const getCoins = async (page = 1) => {
	try {
		const coins = await fetch(
			`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
		);
		return coins.json();
	} catch (error) {
		console.log(error);
	}
};

export const getCoinById = async (id) => {
	try {
		const coin = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);

		return coin.json();
	} catch (error) {
		console.log(error);
	}
};
export const getCoinChartById = async (id, days = 1) => {
	try {
		const coin = await fetch(
			`  https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=hourly`
		);
		return coin.json();
	} catch (error) {
		console.log(error);
	}
};
