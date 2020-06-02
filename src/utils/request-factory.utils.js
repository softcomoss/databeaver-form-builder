import axios from "axios";

export const request = {
	post(url, payload) {
		return axios.post(url, payload);
	},
	get(url) {
		return axios.get(url);
	}
};
