export const postPortfolio = (userData, id) => {
	fetch(`https:/algobagrs.herokuapp.com/api/portfolio/`, {
		method: 'POST',
		headers: { 'Content-type': 'application/json;charset=UTF-8' },

		body: JSON.stringify(userData),
	}).then((res) => res.json().then((res) => console.log(res)));
};

export const showPortfolio = (id) => {
	return fetch(`https://algobagrs.herokuapp.com/api/portfolio/${id}`, {
		method: 'GET',
		headers: { 'Content-type': 'application/json;charset=UTF-8' },
	}).then((res) => res.json());
};

export const sellCoin = (data, id) => {
	return fetch(`http://localhost:3000/api/portfolio/${id}`, {
		method: 'PATCH',
		headers: { 'Content-type': 'application/json; charset=UTF-8' },
		body: JSON.stringify(data),
	}).then((res) => res.json().then((res) => console.log(res)));
};
