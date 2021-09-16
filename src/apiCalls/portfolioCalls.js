export const postPortfolio = (userData, id) => {
	fetch(`http://localhost:3000/api/portfolio/`, {
		method: 'POST',
		headers: { 'Content-type': 'application/json;charset=UTF-8' },

		body: JSON.stringify(userData),
	}).then((res) => res.json().then((res) => console.log(res)));
};

export const updatePortfolio = async (userData) => {
	const data = await fetch(`${process.env.BASE_URL}/portfolio/`, {
		method: 'PATCH',
		headers: { 'Content-type': 'application/json;charset=UTF-8' },
		body: JSON.stringify(userData),
	});
};

export const showPortfolio = (id) => {
	return fetch(`http://localhost:3000/api/portfolio/${id}`, {
		method: 'GET',
		headers: { 'Content-type': 'application/json;charset=UTF-8' },
	}).then((res) => res.json());
};
