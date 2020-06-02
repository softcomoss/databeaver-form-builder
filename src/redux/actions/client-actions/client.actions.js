import axios from "axios";
import { toast } from "react-toastify";
import {
	GET_DISPATCH,
	LOADING_DISPATCH,
	LOADING_DISPATCH_COMPLETED,
	NEXT_PAGE,
	PREVIOUS_PAGE,
	ADD_ANSWER,
	SUBMITTING_FORM,
	FORM_SUBMIT_COMPLETED,
	ADD_ADDRESS,
	ADD_MULTI_CHOICE_ANSWER,
	ANSWER_RESET_ACTION,
	ADD_MULTI_CHOICE_OTHER,
} from "../../action-types/client-actions.types";
import { agentURL } from "../../../utils/base-url-switch.utils";

export const getDispatch = (id, callback) => (dispatch) => {
	if (id !== undefined) {
		dispatch({
			type: LOADING_DISPATCH,
		});
		axios
			.get(`${agentURL}/dispatches/noauth/${id}`)
			.then((response) => {
				if (response.data !== undefined && response.data.success === true) {
					dispatch({
						type: GET_DISPATCH,
						payload: {
							form: response.data.data,
						},
					});
				}
			})
			.then((data) => {
				dispatch({
					type: LOADING_DISPATCH_COMPLETED,
				});
				callback();
			})
			.catch((error) => {
				dispatch({
					type: LOADING_DISPATCH_COMPLETED,
				});
				if (error.response !== undefined && error.response.data !== undefined) {
					toast.error(error.response.data.error);
				}
			});
	}
};

export const nextPage = () => (dispatch) => {
	dispatch({
		type: NEXT_PAGE,
	});
};

export const previousPage = () => (dispatch) => {
	dispatch({
		type: PREVIOUS_PAGE,
	});
};

export const addAnswer = (index, page, value) => (dispatch) => {
	console.log("check answer", index, page, value);
	dispatch({
		type: ADD_ANSWER,
		payload: {
			index,
			page,
			value,
		},
	});
};

export const addMultiChoiceAnswer = (index, page, value) => (dispatch) => {
	dispatch({
		type: ADD_MULTI_CHOICE_ANSWER,
		payload: {
			index,
			page,
			value,
		},
	});
};

export const addMultiChoiceOther = (index, page, value) => (dispatch) => {
	dispatch({
		type: ADD_MULTI_CHOICE_OTHER,
		payload: {
			index,
			page,
			value,
		},
	});
};

export const addAddress = (index, page, value, target) => (dispatch) => {
	dispatch({
		type: ADD_ADDRESS,
		payload: {
			index,
			page,
			value,
			target,
		},
	});
};

export const submitForm = (formDetails, callback) => (dispatch) => {
	dispatch({
		type: SUBMITTING_FORM,
	});
	axios
		.post(`${agentURL}/entries/noauth`, formDetails)
		.then((response) => {
			if (response.data !== undefined && response.data.success === true) {
				// console.log("response", response.data);
			}
		})
		.then((data) => {
			callback();
			dispatch({
				type: FORM_SUBMIT_COMPLETED,
			});
		})
		.catch((error) => {
			dispatch({
				type: FORM_SUBMIT_COMPLETED,
			});
			if (error.response !== undefined && error.response.data !== undefined) {
				toast.error(error.response.data.error);
			}
		});
};

export const answerResetAction = (unique_id, page) => (dispatch) => {
	dispatch({
		type: ANSWER_RESET_ACTION,
		payload: {
			targetId: unique_id,
			targetPage: page,
		},
	});
};
