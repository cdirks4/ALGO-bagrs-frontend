export const postPortfolio = async (userData, id) => {
	const data = await fetch(`${process.env.BASE_URL}/portfolio/${id}`, {
		method: 'POST',
		headers: { 'Content-type': 'application/json;charset=UTF-8' },

		body: JSON.stringify(userData),
	});
	console.log(data);
};

export const updatePortfolio = async (userData) => {
	const data = await fetch(`${process.env.BASE_URL}/portfolio/`, {
		method: 'PATCH',
		headers: { 'Content-type': 'application/json;charset=UTF-8' },
		body: JSON.stringify(userData),
	});
	console.log(data);
};
