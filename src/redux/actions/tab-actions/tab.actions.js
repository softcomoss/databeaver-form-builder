import { CHANGE_TAB } from "../../action-types/tab-actions.types";

export const changeTab = (tab) => (dispatch) => {
	dispatch({
		type: CHANGE_TAB,
		payload: tab,
	});
};
