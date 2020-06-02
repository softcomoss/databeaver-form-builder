import { CHANGE_TAB } from "../action-types/tab-actions.types";

const INITIAL_STATE = {
	activeTab: "/dashboard",
};

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case CHANGE_TAB:
			return {
				...state,
				activeTab: action.payload.tab,
			};
			break;
		default:
			return {
				...state,
			};
	}
}
