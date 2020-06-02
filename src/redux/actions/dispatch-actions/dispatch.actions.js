import { request } from "../../../utils/request-factory.utils";
import { toast } from "react-toastify";
import {
	TOGGLE_HAVE_BUDGET,
	GET_FORM_DRAFT,
	GET_ENTRIES_MAP_DATA,
} from "../../action-types/project-actions.types";

export const recallDispatch = (dispatchId, agents, callback) => (dispatch) => {
	let recallPayload = {
		agents,
		dispatch: dispatchId,
	};
	request
		.post(`/agent-dispatches/recall`, recallPayload)
		.then((response) => {
			if (response.data.success === true) {
				callback();
			}
		})
		.catch((err) => {
			if (err.response !== undefined && err.response.data.success === false) {
				toast.error(err.response.data.error);
			}
		});
};

export const getEntryResponse = async (dispatchId, elementId, callback) => (dispatch) => {
	let url = `/dashboard/dispatches/analytics/${dispatchId}?uniqueid=${elementId}`;
	let data = request
		.get(url)
		.then((response) => {
			if (response.data.success === true) {
				callback(response.data);
			}
		})
		.catch((err) => {
			if (err.response !== undefined && err.response.data.success === false) {
				toast.error(err.response.data.error);
			}
		});
};

export const toggleHaveBudget = () => (dispatch) => {
	dispatch({
		type: TOGGLE_HAVE_BUDGET,
	});
};

export const exportEntries = (dispatchId, callback) => async (dispatch) => {
	let url = `/entries/export/${dispatchId}?includeAgents=true`;
	try {
		let res = await request.get(url);
		const { success, message } = res.data;
		if (success) {
			callback();
			toast.success(message);
			return res.data;
		} else {
			return { success: false };
		}
		return res;
	} catch (error) {
		console.log(error);
		return error;
	}
};

export const getFormDraft = (formId, callback) => async (dispatch) => {
	let url = `/forms/noauth/${formId}`;
	try {
		let res = await request.get(url);
		const { data, success } = res.data;
		if (success) {
			dispatch({
				type: GET_FORM_DRAFT,
				payload: data,
			});
			callback();
			return data;
		}
	} catch (error) {
		console.log(error);
	}
};

export const getEntriesMapData = (id, route) => async (dispatch) => {
	let url = `/entries/map/${route}/${id}?skip=0&limit=100000000`;
	try {
		let getEntries = await request.get(url);
		const { success, data } = getEntries.data;
		if (success) {
			dispatch({
				type: GET_ENTRIES_MAP_DATA,
				payload: data,
			});
			return data;
		}
	} catch (error) {
		console.log(error);
	}
};

export const getDispatchedRecipient = (id, filter) => async (dispatch) => {
	let url = `/agent-dispatches/recipients?dispatch=${id}&recalled=${filter}&limit=10000000`;
	try {
		let recipients = await request.get(url);
		const { data, success } = recipients.data;
		if (success) {
			return data;
		}
		console.log(("recipients", data));
	} catch (error) {
		if (error.response) {
			return error.response;
		}
	}
};
