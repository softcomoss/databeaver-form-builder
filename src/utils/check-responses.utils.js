import { request } from "./request-factory.utils";

/**
 * @function checkResponse
 * @description makes a network call with the element Id to fetch answer details, which is used in setting the count and response data where the function is called
 * @returns {void} - returns void
 */
export const checkResponse = (dispatchId, inputId, setResponseCount, setResponseData) => {
	let url = `/dashboard/dispatches/analytics/${dispatchId}?uniqueid=${inputId}`;
	request
		.get(url)
		.then((response) => {
			if (response.data.success === true) {
				const { data } = response.data;
				let arraysWithResponse = [];
				Object.keys(data).map((key) => {
					if (key.length > 0) {
						arraysWithResponse.push(data[key]);
					}
				});
				setResponseData(data);
				let arrayOfCounts = Object.values(response.data.data);

				if (arrayOfCounts.length > 1) {
					let totalCounts = arraysWithResponse.reduce(
						(accumulator, currentValue) => accumulator + currentValue
					);
					setResponseCount(totalCounts);
				} else {
					if (arrayOfCounts.length > 0) {
						setResponseCount(arrayOfCounts[0]);
					}
				}
			}
		})
		.catch((err) => {
			// if (err.response !== undefined && err.response.data.success === false) {
			// }
		});
};
