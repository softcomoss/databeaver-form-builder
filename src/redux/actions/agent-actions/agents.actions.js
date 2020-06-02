import axios from "axios";
import { toast } from "react-toastify";
import { request } from "../../../utils/request-factory.utils";
import { agentsActionTypes } from "../../action-types/agents-actions.types";

export const getAllAgents = (page) => (dispatch) => {
	dispatch({
		type: agentsActionTypes.LOADING_AGENTS,
	});
	axios
		.get(
			`/agents?skip=${(page - 1) * 20}&limit=20
		`
		)
		.then((response) => {
			if (response.data.success === true) {
				dispatch({
					type: agentsActionTypes.GET_AGENTS,
					payload: {
						allAgents: response.data.agents,
						count: response.data.count,
					},
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
			}
			dispatch({
				type: agentsActionTypes.AGENTS_LOADING_COMPLETED,
			});
		});
};

// send broadcast message to agents
export const sendBroadcastMessages = (messagePayload, callback) => (dispatch) => {
	dispatch({
		type: agentsActionTypes.SENDING_MESSAGE,
	});
	axios
		.post("/messages", messagePayload)
		.then((response) => {
			dispatch({
				type: agentsActionTypes.MESSAGE_SENT,
			});
			if (response.data.success === true) {
				toast.success(response.data.message);
			}
			callback();
		})
		.catch((err) => {
			dispatch({
				type: agentsActionTypes.MESSAGE_SENT,
			});
			if (err.response !== undefined) {
				// console.log(err.response);
			}
		});
};

export const addSingleAgent = (agentDetails) => (dispatch) => {
	dispatch({
		type: agentsActionTypes.ADDING_AGENT,
	});
	axios
		.post(`/agents`, agentDetails)
		.then((response) => {
			if (response.data.success === true) {
				dispatch({
					type: agentsActionTypes.ADD_AGENTS,
					payload: response.data.data,
				});
				toast.success(`${agentDetails.firstName} added as an Agent`);
			}
		})
		.then((success) => {
			dispatch({
				type: agentsActionTypes.ADDING_AGENT_COMPLETED,
			});
			setTimeout(() => {
				window.location.replace("/agents");
			}, 1000);
		})
		.catch((err) => {
			if (err.response !== undefined && err.response.data.success === false) {
				toast.error(err.response.data.error);
			} else {
				toast.error("Please check your network connection");
			}
			dispatch({
				type: agentsActionTypes.ADDING_AGENT_COMPLETED,
			});
		});
};

export const getSingleAgent = (id) => (dispatch) => {
	dispatch({
		type: agentsActionTypes.LOADING_AGENTS,
	});
	axios
		.get(`/agents/${id}`)
		.then((response) => {
			if (response.data.success === true) {
				dispatch({
					type: agentsActionTypes.GET_SINGLE_AGENT,
					payload: response.data.data,
				});

				dispatch({
					type: agentsActionTypes.AGENTS_LOADING_COMPLETED,
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

export const searchAgents = (query) => (dispatch) => {
	axios
		.get(query.length > 0 ? `/agents/search?q=${query}` : `/agents`)
		.then((response) => {
			if (response.data.success === true) {
				if (query.length > 0) {
					dispatch({
						type: agentsActionTypes.GET_AGENTS,
						payload: {
							allAgents: response.data.data,
							count: response.data.count,
						},
					});
				} else {
					dispatch({
						type: agentsActionTypes.GET_AGENTS,
						payload: {
							allAgents: response.data.agents,
							count: response.data.count,
						},
					});
				}
			}
		})
		.catch((err) => {
			if (err.response !== undefined && err.response.data.success === false) {
				toast.error(err.response.data.message);
			} else {
				// toast.error("Please check your network connection");
			}
			dispatch({
				type: agentsActionTypes.AGENTS_LOADING_COMPLETED,
			});
		});
};

// get all agent groups
export const getAllGroups = () => (dispatch) => {
	dispatch({
		type: agentsActionTypes.LOADING_AGENTS,
	});
	axios
		.get(`/agent-groups`)
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

// create new agent group
export const createNewGroup = (groupDetails, callback) => (dispatch) => {
	dispatch({
		type: agentsActionTypes.CREATING_NEW_GROUP,
	});
	axios
		.post(`/agent-groups`, groupDetails)
		.then((response) => {
			if (response.data.success === true) {
				dispatch({
					type: agentsActionTypes.CREATING_NEW_GROUP,
				});
			}
		})
		.then((res) => {
			toast.success("New agents group added");
			dispatch({
				type: agentsActionTypes.CREATING_NEW_GROUP_COMPLETED,
			});
		})
		.then((data) => {
			callback(data);
			// setTimeout(() => {
			// 	window.location.replace("/agents");
			// }, 1500);
		})
		.catch((err) => {
			if (err.response !== undefined && err.response.data.success === false) {
				toast.error(err.response.data.message);
			} else {
				toast.error("Please check your network connection");
			}
			dispatch({
				type: agentsActionTypes.CREATING_NEW_GROUP_COMPLETED,
			});
		});
};

// set active agent groups
export const setActiveGroup = (id) => (dispatch) => {
	dispatch({
		type: agentsActionTypes.ACTIVE_GROUP,
		payload: {
			id,
		},
	});
};

// get single agent groups
export const getSingleGroup = (id, callback) => (dispatch) => {
	// dispatch({
	// 	type: agentsActionTypes.LOADING_AGENTS
	// });
	axios
		.get(`/agent-groups/${id}`)
		.then((response) => {
			if (response.data.success === true) {
				dispatch({
					type: agentsActionTypes.GET_SINGLE_GROUP,
					payload: response.data.data,
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

// add  agents to group
export const addAgents = (id, agents, callback) => (dispatch) => {
	dispatch({
		type: agentsActionTypes.CREATING_NEW_GROUP,
	});
	axios
		.patch(`/agent-groups/${id}/add-agents`, agents)
		.then((response) => {
			if (response.data.success === true) {
				dispatch({
					type: agentsActionTypes.CREATING_NEW_GROUP_COMPLETED,
				});
			}
		})
		.then((res) => {
			dispatch({
				type: agentsActionTypes.CREATING_NEW_GROUP_COMPLETED,
			});
			callback();
		})
		.then((data) => {
			// setTimeout(() => {
			// 	window.location.replace("/agents");
			// }, 1500);
		})
		.catch((err) => {
			if (err.response !== undefined && err.response.data.success === false) {
				toast.error(err.response.data.message);
			} else {
				toast.error("Please check your network connection");
			}
			dispatch({
				type: agentsActionTypes.CREATING_NEW_GROUP_COMPLETED,
			});
		});
};

// delete agent group
export const deleteAgentGroup = (id, callback) => (dispatch) => {
	dispatch({
		type: agentsActionTypes.LOADING,
	});
	axios
		.delete(`/agent-groups/${id}`)
		.then((response) => {
			if (response.data.success === true) {
				dispatch({
					type: agentsActionTypes.DELETE_AGENT_GROUP,
				});
			}
		})
		.then((res) => {
			dispatch({
				type: agentsActionTypes.LOADING_COMPLETED,
			});
		})
		.then((res) => {
			callback();
		})
		.catch((err) => {
			if (err.response !== undefined && err.response.data.success === false) {
				toast.error(err.response.data.message);
			} else {
				toast.error("Please check your network connection");
			}
			dispatch({
				type: agentsActionTypes.LOADING_COMPLETED,
			});
		});
};

export const filterAgents = (filter, query) => (dispatch) => {
	axios
		.get(`/agents/filter?${filter}=${query}`)
		.then((response) => {
			dispatch({
				type: agentsActionTypes.FILTER,
				payload: {
					allAgents: response.data.data,
				},
			});
		})
		.catch((err) => {
			if (err.response !== undefined && err.response.data.success === false) {
				toast.error(err.response.data.message);
			}
		});
};

export const removeAgent = (agents, callback) => (dispatch) => {
	dispatch({
		type: agentsActionTypes.LOADING,
	});
	axios({
		method: "delete",
		url: "https://api-databeaverv3-admin-staging.bluegreensoft.com/v3/agents",
		data: {
			agents,
		},
	})
		.then((res) => {
			dispatch({
				type: agentsActionTypes.LOADING_COMPLETED,
			});
			callback();
		})
		.catch((err) => {
			console.log("error", err.response);
			if (err.response !== undefined && err.response.data.success === false) {
				toast.error(err.response.data.message);
			}
			dispatch({
				type: agentsActionTypes.LOADING_COMPLETED,
			});
		});
};

export const getAgentCount = (filter, query) => (dispatch) => {
	axios
		.get(`/agents/filter?${filter}=${query}`)
		.then((response) => {
			dispatch({
				type: agentsActionTypes.FILTER,
				payload: {
					allAgents: response.data.data,
				},
			});
		})
		.catch((err) => {
			if (err.response !== undefined && err.response.data.success === false) {
				toast.error(err.response.data.message);
			}
		});
};

export const getCountries = () => (dispatch) => {
	let url = `https://www.universal-tutorial.com/api/countries/`;
	let token =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJ2aW1pYzQ4MDI0QGhpd2F2ZS5vcmciLCJhcGlfdG9rZW4iOiJkQnlfWVRrdUxMczU1R1JrU3VKRzF1alU1MnN3WkdRdXlsMkJVb2t2ZTJJZFZOcVVWazhQNFJvSXdzYTI3VU1MTmJzIn0sImV4cCI6MTU4MDM3MzgyOX0.mYjq32_9wDDSzhihObWXKOr_EE4lv7ZKntZW2wYD2ms";
	let config = {
		headers: {
			Authorization: "Bearer " + token,
		},
	};
	axios
		.get(url, config)
		.then((response) => {
			dispatch({
				type: agentsActionTypes.GET_COUNTRIES,
				payload: response.data,
			});
		})
		.catch((err) => {
			console.log("error", err);
		});
};

export const getCities = (state) => (dispatch) => {
	let url = `https://www.universal-tutorial.com/api/cities/${state}`;
	let token =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJ2aW1pYzQ4MDI0QGhpd2F2ZS5vcmciLCJhcGlfdG9rZW4iOiJkQnlfWVRrdUxMczU1R1JrU3VKRzF1alU1MnN3WkdRdXlsMkJVb2t2ZTJJZFZOcVVWazhQNFJvSXdzYTI3VU1MTmJzIn0sImV4cCI6MTU4MDM3MzgyOX0.mYjq32_9wDDSzhihObWXKOr_EE4lv7ZKntZW2wYD2ms";
	let config = {
		headers: {
			Authorization: "Bearer " + token,
		},
	};
	axios
		.get(url, config)
		.then((response) => {
			dispatch({
				type: agentsActionTypes.GET_CITIES,
				payload: response.data,
			});
		})
		.catch((err) => {
			console.log("error", err);
		});
};

export const getStates = (country) => (dispatch) => {
	let url = `https://www.universal-tutorial.com/api/states/${country}`;
	let token =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJ2aW1pYzQ4MDI0QGhpd2F2ZS5vcmciLCJhcGlfdG9rZW4iOiJkQnlfWVRrdUxMczU1R1JrU3VKRzF1alU1MnN3WkdRdXlsMkJVb2t2ZTJJZFZOcVVWazhQNFJvSXdzYTI3VU1MTmJzIn0sImV4cCI6MTU4MDM3MzgyOX0.mYjq32_9wDDSzhihObWXKOr_EE4lv7ZKntZW2wYD2ms";
	let config = {
		headers: {
			Authorization: "Bearer " + token,
		},
	};
	axios
		.get(url, config)
		.then((response) => {
			dispatch({
				type: agentsActionTypes.GET_STATES,
				payload: response.data,
			});
		})
		.catch((err) => {
			console.log("error", err);
		});
};

export const deactivateAgent = (id, callback) => (dispatch) => {
	axios
		.put(`/agents/${id}/deactivate`)
		.then((response) => {
			console.log("response", response.data.success);
			if (response.data.success === true) {
				callback();
			}
		})
		.catch((err) => {
			console.log("error", err);
		});
};

export const activateAgent = (id, callback) => (dispatch) => {
	axios
		.put(`/agents/${id}/activate`)
		.then((response) => {
			if (response.data.success === true) {
				callback();
			}
		})
		.catch((err) => {
			console.log("error", err);
		});
};

export const filterAgentList = (query) => (dispatch) => {
	dispatch({
		type: agentsActionTypes.LOADING_AGENTS,
	});
	axios
		.get(`/agents/filter?status=${query}`)
		.then((response) => {
			if (response.data.success === true) {
				dispatch({
					type: agentsActionTypes.GET_AGENTS,
					payload: {
						allAgents: response.data.data,
						count: response.data.count,
					},
				});
				dispatch({
					type: agentsActionTypes.AGENTS_LOADING_COMPLETED,
				});
			}
		})
		.catch((err) => {
			dispatch({
				type: agentsActionTypes.AGENTS_LOADING_COMPLETED,
			});
			console.log("error", err);
		});
};

export const getAgentsDashboardCount = () => (dispatch) => {
	axios
		.get(`/dashboard/agents/count`)
		.then((response) => {
			if (response.data.success === true) {
				dispatch({
					type: agentsActionTypes.GET_AGENTS_DASHBOARD_COUNTS,
					payload: response.data.data,
				});
			}
		})
		.catch((err) => {
			console.log("error", err);
		});
};

export const getAgentDashboardChart = () => (dispatch) => {
	axios
		.get(`/dashboard/agents/chart`)
		.then((response) => {
			if (response.data.success === true) {
				dispatch({
					type: agentsActionTypes.GET_AGENTS_DASHBOARD_CHART,
					payload: response.data.data,
				});
			}
		})
		.catch((err) => {
			console.log("error", err);
		});
};

export const inviteSingleAgent = (email, callback) => (dispatch) => {
	request
		.post(`/agents/invite`, { emails: [email] })
		.then((response) => {
			if (response.data.success === true) {
				toast.success(`New agents added (${response.data.data.created})`);
			}
		})
		.then((res) => {
			callback();
		})
		.catch((err) => {
			console.log("error", err);
		});
};

export const inviteMultiAgents = (email, callback) => (dispatch) => {
	request
		.post(`/agents/invite`, { emails: email })
		.then((response) => {
			if (response.data.success === true) {
				toast.success(`New agents added (${response.data.data.created})`);
			}
		})
		.then((res) => {
			callback();
		})
		.catch((err) => {
			console.log("error", err);
		});
};
