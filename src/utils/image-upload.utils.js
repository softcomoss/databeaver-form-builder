import axios from "axios";

export const uploadImage = async (file, url) => {
	try {
		const fileData = new FormData();
		fileData.append("files", file);
		fileData.append("folder", "admin-profile");
		let uploaded = await axios.post(url, fileData);
		const { data, success } = uploaded.data;
		if (success) {
			return data;
		}
	} catch (error) {
		console.log(error);
	}
};
