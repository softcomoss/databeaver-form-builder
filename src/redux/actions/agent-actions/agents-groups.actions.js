import axios from "axios";
import { toast } from "react-toastify";
import { agentsActionTypes } from "../../action-types/agents-actions.types";

export const searchAgentGroups = (params, page) => (dispatch) => {
	let url = "/agent-groups";
	if (params.trim().length > 0) {
		url = `agent-groups/search?q=${params}&skip=0&limit=0`;
	} else {
		url = "/agent-groups";
	}
	axios
		.get(url)
		.then((response) => {
			if (response.data.success === true) {
				dispatch({
					type: agentsActionTypes.GET_ALL_GROUPS,
					payload: response.data.data.agentGroups,
				});
			}
		})
		.then((res) => {
			dispatch({
				type: agentsActionTypes.AGENTS_LOADING_COMPLETED,
			});
		})
		.catch((err) => {
			if (err.response !== undefined && err.response.data.success === false) {
				toast.error(err.response.data.message);
			} else {
				toast.error("Please check your network connection");
			}
			dispatch({
				type: agentsActionTypes.AGENTS_LOADING_COMPLETED,
			});
		});
};
