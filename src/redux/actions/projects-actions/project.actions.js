import axios from "axios";
import { moment } from "moment";
import { toast } from "react-toastify";
import {
	GET_ALL_PROJECTS,
	LOADING_PROJECTS,
	LOADING_PROJECTS_COMPLETED,
	CREATING_PROJECTS,
	CREATING_PROJECTS_COMPLETED,
	GET_DISPATCH_ENTRIES_BY_STATUS,
	LOADING_SINGLE_PROJECT,
	LOADING_SINGLE_PROJECT_COMPLETED,
	GET_SINGLE_PROJECT,
	RENAME_PROJECT,
	HIGHLIGHT_PROJECT,
	SELECT_PROJECT_TO_DISPATCH,
	SELECT_FORM_TO_DISPATCH,
	SET_DISPATCH_NAME,
	SET_DISPATCH_START_DATE,
	SET_DISPATCH_END_DATE,
	SET_DISPATCH_COLOUR,
	SET_DISPATCH_TYPE,
	SET_DISPATCH_FREQUENCY,
	ADD_REMOVE_GROUP,
	ADD_BUDGET,
	EXPECTED_ENTRY,
	PUSHING_DISPATCH,
	PUSHING_DISPATCH_COMPLETED,
	GET_ACTIVE_PROJECT_DISPATCHES,
	ADD_REMOVE_AGENT,
	SELECT_UNSELECT_ALL_AGENTS,
	SEARCH_PROJECTS,
	GET_DISPATCH_DETAILS,
	GET_DISPATCH_ENTRIES,
	GET_PROJECT_ENTRIES,
	LOADING,
	LOADING_COMPLETE,
	GET_DISPATCH_DETAILS_BY_PROJECT,
	GET_DISPATCH_ENTRY,
	GET_PROJECT_DASHBOARD_COUNT,
	GET_AGENT_ACTIVITIES,
	GET_PROJECT_CHART,
	GET_DISPATCH_COUNT,
	GET_DISPATCH_AGENTS_ACTIVITIES,
	GET_ACTIVE_DISPATCH_LOCATIONS,
	ADD_DISPATCH_INSTRUCTIONS_FILES,
	DELETE_DISPATCH_INSTRUCTIONS_FILES,
	GET_DISPATCH_ENTRY_CHART,
	ADD_DISPATCH_INSTRUCTIONS_SUMMARY,
} from "../../action-types/project-actions.types";
import { closeModal } from "../../../utils/modal-control.utils";
import { convertToISO } from "../../../utils/convert-date.utils";

export const getAllProjects = (page, callback) => (dispatch) => {
	dispatch({
		type: LOADING_PROJECTS,
	});
	axios
		.get(`/projects/?skip=${(page - 1) * 20}&limit=20`)
		.then((response) => {
			if (response.data.success === true) {
				dispatch({
					type: GET_ALL_PROJECTS,
					payload: response.data.data,
				});
			}
		})
		.then((res) => {
			dispatch({
				type: LOADING_PROJECTS_COMPLETED,
			});
			callback();
		})
		.catch((err) => {
			if (err.response !== undefined && err.response.data.success === false) {
				toast.error(err.response.data.message);
			} else {
				// toast.error("Please check your network connection");
			}
			dispatch({
				type: LOADING_PROJECTS_COMPLETED,
			});
		});
};

export const createProject = (name, callback) => (dispatch) => {
	dispatch({
		type: CREATING_PROJECTS,
	});
	axios
		.post(`/projects`, name)
		.then((response) => {
			if (response.data.success === true) {
				// console.log("success");
			}
		})
		.then((res) => {
			toast.success("New Project created");
			dispatch({
				type: CREATING_PROJECTS_COMPLETED,
			});
		})
		.then((data) => {
			callback();
		})
		.catch((err) => {
			if (err.response !== undefined && err.response.data.success === false) {
				toast.error(err.response.data.error);
			} else {
				toast.error("Please check your network connection");
			}
			dispatch({
				type: CREATING_PROJECTS_COMPLETED,
			});
		});
};

// get single project
export const getSingleProject = (id) => (dispatch) => {
	dispatch({
		type: LOADING_PROJECTS,
	});
	axios
		.get(`/projects/${id}`)
		.then((response) => {
			if (response.data.success === true) {
				dispatch({
					type: GET_SINGLE_PROJECT,
					payload: response.data.data,
				});
			}
		})
		.then((res) => {
			// callback(res);
			dispatch({
				type: LOADING_PROJECTS_COMPLETED,
			});
		})
		.catch((err) => {
			if (err.response !== undefined && err.response.data.success === false) {
				toast.error(err.response.data.message);
			} else {
				toast.error("Please check your network connection");
			}
			dispatch({
				type: LOADING_PROJECTS_COMPLETED,
			});
		});
};

// rename project
export const renameProject = (name, id, callback) => (dispatch) => {
	dispatch({
		type: CREATING_PROJECTS,
	});
	axios
		.put(`/projects/${id}`, { name })
		.then((response) => {
			if (response.data.success === true) {
			}
		})
		.then((res) => {
			toast.success(`Project Renamed to ${name}`);
			dispatch({
				type: CREATING_PROJECTS_COMPLETED,
			});
		})
		.then((data) => {
			callback();
		})
		.catch((err) => {
			if (err.response !== undefined && err.response.data.success === false) {
				toast.error(err.response.data.message);
			} else {
				toast.error("Please check your network connection");
			}
			dispatch({
				type: CREATING_PROJECTS_COMPLETED,
			});
		});
};

export const highlightProject = (project) => (dispatch) => {
	dispatch({
		type: HIGHLIGHT_PROJECT,
		payload: {
			project,
		},
	});
};

// delete project
export const deleteProject = (id, callback) => (dispatch) => {
	dispatch({
		type: CREATING_PROJECTS,
	});
	axios
		.delete(`/projects/${id}`, { id })
		.then((response) => {
			if (response.data.success === true) {
			}
		})
		.then((res) => {
			toast.success(`Project deleted successfully`);
			dispatch({
				type: CREATING_PROJECTS_COMPLETED,
			});
			callback();
		})
		.catch((err) => {
			if (err.response !== undefined && err.response.data.success === false) {
				toast.error(err.response.data.message);
			} else {
				toast.error("Please check your network connection");
			}
			dispatch({
				type: CREATING_PROJECTS_COMPLETED,
			});
		});
};

export const selectProjectToDispatch = (project) => (dispatch) => {
	dispatch({
		type: SELECT_PROJECT_TO_DISPATCH,
		payload: {
			project,
		},
	});
};

export const selectFormToDispatch = (form) => (dispatch) => {
	dispatch({
		type: SELECT_FORM_TO_DISPATCH,
		payload: {
			form,
		},
	});
};

export const setDispatchName = (name) => (dispatch) => {
	dispatch({
		type: SET_DISPATCH_NAME,
		payload: {
			name,
		},
	});
};

export const setStartDate = (startDate) => (dispatch) => {
	let formatedStartDate = new Date(startDate).toISOString();
	dispatch({
		type: SET_DISPATCH_START_DATE,
		payload: {
			startDate: formatedStartDate,
		},
	});
};

export const setEndDate = (endDate) => (dispatch) => {
	dispatch({
		type: SET_DISPATCH_END_DATE,
		payload: {
			endDate: endDate,
		},
	});
};

export const setDispatchColour = (colour) => (dispatch) => {
	dispatch({
		type: SET_DISPATCH_COLOUR,
		payload: {
			colour,
		},
	});
};

export const setDispatchType = (dispatchType) => (dispatch) => {
	dispatch({
		type: SET_DISPATCH_TYPE,
		payload: {
			dispatchType,
		},
	});
};

export const setDispatchFrequency = (frequency) => (dispatch) => {
	dispatch({
		type: SET_DISPATCH_FREQUENCY,
		payload: {
			frequency,
		},
	});
};

export const createDispatch = (details, callback) => (dispatch) => {
	axios
		.post(`/dispatches`, details)
		.then((response) => {
			if (response.data.success === true) {
				// console.log("dispatche created");
			}
		})
		.then((res) => {
			callback();
		})
		.catch((err) => {
			if (err.response !== undefined && err.response.data.success === false) {
				toast.error(err.response.data.error);
			} else {
				toast.error("Please check your network connection");
			}
		});
};

export const addRemoveGroup = (group) => (dispatch) => {
	dispatch({
		type: ADD_REMOVE_GROUP,
		payload: {
			group,
		},
	});
};

export const addBudget = (value) => (dispatch) => {
	dispatch({
		type: ADD_BUDGET,
		payload: {
			value,
		},
	});
};

export const addExpectedEntry = (value) => (dispatch) => {
	dispatch({
		type: EXPECTED_ENTRY,
		payload: {
			value,
		},
	});
};

export const pushDispatch = (details, callback) => (dispatch) => {
	dispatch({
		type: PUSHING_DISPATCH,
	});
	axios
		.post(`/dispatches/push`, details)
		.then((response) => {
			if (response.data.success === true) {
				// console.log("dispatche created");
			}
		})
		.then((res) => {
			dispatch({
				type: PUSHING_DISPATCH_COMPLETED,
			});
			callback();
		})
		.catch((err) => {
			dispatch({
				type: PUSHING_DISPATCH_COMPLETED,
			});
			if (err.response !== undefined && err.response.data.success === false) {
				toast.error(err.response.data.error);
			} else {
				toast.error("Please check your network connection");
			}
		});
};

// get active project dispatches
export const getActiveProjectDispatches = (id, page) => (dispatch) => {
	axios
		.get(`/dispatches/project/${id}?skip=${(page - 1) * 20}&limit=20`)
		.then((response) => {
			if (response.data.success === true) {
				dispatch({
					type: GET_ACTIVE_PROJECT_DISPATCHES,
					payload: response.data.data,
				});
			}
		})
		.catch((err) => {
			if (err.response !== undefined && err.response.data.success === false) {
				toast.error(err.response.data.message);
			} else {
				toast.error("Please check your network connection");
			}
			dispatch({
				type: LOADING_PROJECTS_COMPLETED,
			});
		});
};

export const addRemoveAgents = (agent) => (dispatch) => {
	dispatch({
		type: ADD_REMOVE_AGENT,
		payload: {
			agent,
		},
	});
};

export const selectUnselectAllAgents = (allAgents) => (dispatch) => {
	dispatch({
		type: SELECT_UNSELECT_ALL_AGENTS,
		payload: {
			allAgents,
		},
	});
};

export const searchProjects = (query) => (dispatch) => {
	let url = "";
	let searchParameter = query.trim();
	if (searchParameter.length > 0) {
		url = `/projects/search?q=${searchParameter}&skip=0&limit=0`;
	} else {
		url = `/projects`;
	}
	axios
		.get(url)
		.then((response) => {
			if (response.data.success === true) {
				dispatch({
					type: SEARCH_PROJECTS,
					payload: response.data.data,
				});
			}
		})
		.catch((err) => {
			if (err.response !== undefined && err.response.data.success === false) {
				toast.error(err.response.data.message);
			} else {
				toast.error("Please check your network connection");
			}
			dispatch({
				type: LOADING_PROJECTS_COMPLETED,
			});
		});
};

export const getDispatchDetails = (dispatchId, callback) => (dispatch) => {
	dispatch({
		type: LOADING_PROJECTS,
	});
	axios
		.get(`/dispatches/${dispatchId}`)
		.then((response) => {
			if (response.data.success === true) {
				dispatch({
					type: GET_DISPATCH_DETAILS,
					payload: response.data.data,
				});
			}
		})
		.then((res) => {
			dispatch({
				type: LOADING_PROJECTS_COMPLETED,
			});
			callback();
		})
		.catch((err) => {
			dispatch({
				type: LOADING_PROJECTS_COMPLETED,
			});
			if (err.response !== undefined && err.response.data.success === false) {
				toast.error(err.response.data.error);
			} else {
				toast.error("Please check your network connection");
			}
		});
};

export const getDispatchDetailsByProject = (dispatchId, callback) => (dispatch) => {
	dispatch({
		type: LOADING_PROJECTS,
	});
	axios
		.get(`/dispatches/${dispatchId}`)
		.then((response) => {
			if (response.data.success === true) {
				dispatch({
					type: GET_DISPATCH_DETAILS_BY_PROJECT,
					payload: response.data.data,
				});
			}
		})
		.then((res) => {
			dispatch({
				type: LOADING_PROJECTS_COMPLETED,
			});
			callback();
		})
		.catch((err) => {
			dispatch({
				type: LOADING_PROJECTS_COMPLETED,
			});
			if (err.response !== undefined && err.response.data.success === false) {
				toast.error(err.response.data.error);
			} else {
				toast.error("Please check your network connection");
			}
		});
};

export const getDispatchEntries = (page, dispatchId, callback) => (dispatch) => {
	dispatch({
		type: LOADING_PROJECTS,
	});
	axios
		.get(`/entries/dispatch/${dispatchId}?skip=${(page - 1) * 20}&limit=20`)
		.then((response) => {
			if (response.data.success === true) {
				dispatch({
					type: GET_DISPATCH_ENTRIES,
					payload: response.data.data,
				});
			}
		})
		.then((res) => {
			dispatch({
				type: LOADING_PROJECTS_COMPLETED,
			});
		})
		.then((res) => {
			callback();
		})
		.catch((err) => {
			dispatch({
				type: LOADING_PROJECTS_COMPLETED,
			});
			if (err.response !== undefined && err.response.data.success === false) {
				// toast.error(err.response.data.error);
			} else {
				toast.error("Please check your network connection");
			}
		});
};

export const filterDispatchEntries = (page, dispatchId, filterBy, param) => (dispatch) => {
	dispatch({
		type: LOADING_PROJECTS,
	});
	axios
		.get(`/entries/dispatch/${dispatchId}?${filterBy}=${param}`)
		.then((response) => {
			if (response.data.success === true) {
				dispatch({
					type: GET_DISPATCH_ENTRIES,
					payload: response.data.data,
				});
			}
		})
		.then((res) => {
			dispatch({
				type: LOADING_PROJECTS_COMPLETED,
			});
		})
		.catch((err) => {
			dispatch({
				type: LOADING_PROJECTS_COMPLETED,
			});
			if (err.response !== undefined && err.response.data.success === false) {
				toast.error(err.response.data.error);
			} else {
				toast.error("Please check your network connection");
			}
		});
};

export const getActiveDispatchStates = (dispatchId) => (dispatch) => {
	axios
		.get(`/entries/states?level=dispatch&id=${dispatchId}`)
		.then((response) => {
			if (response.data.success === true) {
				dispatch({
					type: GET_ACTIVE_DISPATCH_LOCATIONS,
					payload: response.data.data,
				});
			}
		})
		.catch((err) => {
			if (err.response !== undefined && err.response.data.success === false) {
				toast.error(err.response.data.error);
			}
		});
};

export const getProjectEntries = (page, projectId, callback) => (dispatch) => {
	dispatch({
		type: LOADING_PROJECTS,
	});
	axios
		.get(`/entries/project/${projectId}?skip=${(page - 1) * 20}&limit=20`)
		.then((response) => {
			if (response.data.success === true) {
				dispatch({
					type: GET_PROJECT_ENTRIES,
					payload: response.data.data,
				});
			}
		})
		.then((res) => {
			dispatch({
				type: LOADING_PROJECTS_COMPLETED,
			});
			callback();
		})
		.catch((err) => {
			dispatch({
				type: LOADING_PROJECTS_COMPLETED,
			});
			if (err.response !== undefined && err.response.data.success === false) {
				toast.error(err.response.data.error);
			} else {
				toast.error("Please check your network connection");
			}
		});
};

export const getEntry = (page, entryId, callback) => (dispatch) => {
	dispatch({
		type: LOADING_PROJECTS,
	});
	axios
		.get(`/entries/${entryId}`)
		.then((response) => {
			if (response.data.success === true) {
				dispatch({
					type: GET_DISPATCH_ENTRY,
					payload: response.data.data,
				});
			}
		})
		.then((res) => {
			dispatch({
				type: LOADING_PROJECTS_COMPLETED,
			});
			callback();
		})
		.catch((err) => {
			dispatch({
				type: LOADING_PROJECTS_COMPLETED,
			});
			if (err.response !== undefined && err.response.data.success === false) {
				toast.error(err.response.data.error);
			} else {
				toast.error("Please check your network connection");
			}
		});
};

export const acceptRejectEntry = (entryId, status, reason, callback) => (dispatch) => {
	dispatch({
		type: LOADING,
	});
	let payload = { status: status };
	if (reason.length > 0) {
		payload.message = reason;
	}
	axios
		.put(`/entries/${entryId}`, payload)
		.then((response) => {
			if (response.data.success === true) {
				// console.log("accept reject", response.data.data);
			}
		})
		.then((res) => {
			dispatch({
				type: LOADING_COMPLETE,
			});
			callback();
		})
		.catch((err) => {
			dispatch({
				type: LOADING_COMPLETE,
			});
			if (err.response !== undefined && err.response.data.success === false) {
				toast.error(err.response.data.error);
			} else {
				toast.error("Please check your network connection");
			}
		});
};

export const extendEnddate = (dispatchId, date, callback) => (dispatch) => {
	dispatch({
		type: LOADING,
	});
	axios
		.patch(`/dispatches/${dispatchId}/extend`, date)
		.then((response) => {
			if (response.data.success === true) {
			}
		})
		.then((res) => {
			dispatch({
				type: LOADING_COMPLETE,
			});
			callback();
		})
		.catch((err) => {
			if (err.response !== undefined && err.response.data.success === false) {
				toast.error(err.response.data.error);
			}
			dispatch({
				type: LOADING_COMPLETE,
			});
		});
};

export const suspendDispatch = (dispatchId, callback) => (dispatch) => {
	axios
		.patch(`/dispatches/${dispatchId}/suspend`)
		.then((response) => {
			if (response.data.success === true) {
				callback();
				setTimeout(() => {
					closeModal("#suspend-dispatch");
				}, 2000);
			}
		})
		.then((res) => {
			dispatch({
				type: LOADING_COMPLETE,
			});
		})
		.catch((err) => {
			if (err.response !== undefined && err.response.data.success === false) {
				toast.error(err.response.data.error);
			}
			dispatch({
				type: LOADING_COMPLETE,
			});
		});
};

export const resumeDispatch = (dispatchId, callback) => (dispatch) => {
	axios
		.patch(`/dispatches/${dispatchId}/resume`)
		.then((response) => {
			if (response.data.success === true) {
				setTimeout(() => {
					closeModal("#resume-dispatch");
				}, 2000);
			}
		})
		.then((res) => {
			dispatch({
				type: LOADING_COMPLETE,
			});
			callback();
		})
		.catch((err) => {
			if (err.response !== undefined && err.response.data.success === false) {
				toast.error(err.response.data.error);
			}
			dispatch({
				type: LOADING_COMPLETE,
			});
		});
};

export const getProjectDashboardCount = (id, page) => (dispatch) => {
	axios
		.get(`/dashboard/projects/counts/${id}`)
		.then((response) => {
			if (response.data.success === true) {
				dispatch({
					type: GET_PROJECT_DASHBOARD_COUNT,
					payload: response.data.data,
				});
			}
		})
		.catch((err) => {
			if (err.response !== undefined && err.response.data.success === false) {
				toast.error(err.response.data.message);
			} else {
				toast.error("Please check your network connection");
			}
			dispatch({
				type: LOADING_PROJECTS_COMPLETED,
			});
		});
};

export const getAgentsActivities = (id, page) => (dispatch) => {
	axios
		.get(`/dashboard/projects/agents/${id}`)
		.then((response) => {
			if (response.data.success === true) {
				dispatch({
					type: GET_AGENT_ACTIVITIES,
					payload: response.data.data,
				});
			}
		})
		.catch((err) => {
			if (err.response !== undefined && err.response.data.success === false) {
				toast.error(err.response.data.message);
			} else {
				toast.error("Please check your network connection");
			}
			dispatch({
				type: LOADING_PROJECTS_COMPLETED,
			});
		});
};

export const getProjectChartData = (id, startDate, endDate) => (dispatch) => {
	let url = "";
	if (startDate !== undefined && endDate !== undefined && startDate.length > 0 && endDate.length > 0) {
		url = `/dashboard/projects/chart/${id}?startDate=${startDate}&endDate=${endDate}`;
	} else {
		url = `/dashboard/projects/chart/${id}`;
	}
	axios
		.get(url)
		.then((response) => {
			if (response.data.success === true) {
				dispatch({
					type: GET_PROJECT_CHART,
					payload: response.data.data,
				});
			}
		})
		.catch((err) => {
			if (err.response !== undefined && err.response.data.success === false) {
				toast.error(err.response.data.message);
			} else {
				toast.error("Please check your network connection");
			}
		});
};

export const getDispatchCount = (dispatchId) => (dispatch) => {
	axios
		.get(`/dashboard/dispatches/counts/${dispatchId}`)
		.then((response) => {
			if (response.data.success === true) {
				dispatch({
					type: GET_DISPATCH_COUNT,
					payload: response.data.data,
				});
			}
		})
		.catch((err) => {
			if (err.response !== undefined && err.response.data.success === false) {
				toast.error(err.response.data.message);
			}
		});
};

export const getDispatchAgentsActivities = (dispatchId) => (dispatch) => {
	axios
		.get(`/dashboard/dispatches/agents/${dispatchId}`)
		.then((response) => {
			if (response.data.success === true) {
				dispatch({
					type: GET_DISPATCH_AGENTS_ACTIVITIES,
					payload: response.data.data,
				});
			}
		})
		.catch((err) => {
			if (err.response !== undefined && err.response.data.success === false) {
				toast.error(err.response.data.message);
			}
		});
};

export const addDispatchInstructions = (type, url) => (dispatch) => {
	dispatch({
		type: ADD_DISPATCH_INSTRUCTIONS_FILES,
		payload: {
			type,
			url,
		},
	});
};

export const addDispatchInstructionSummary = (summary) => (dispatch) => {
	dispatch({
		type: ADD_DISPATCH_INSTRUCTIONS_SUMMARY,
		payload: {
			summary,
		},
	});
};

export const deleteDispatchInstruction = (index) => (dispatch) => {
	dispatch({
		type: DELETE_DISPATCH_INSTRUCTIONS_FILES,
		payload: {
			index,
		},
	});
};

export const getDispatchEntriesByStatus = (id) => (dispatch) => {
	axios
		.get(`/dashboard/dispatches/entries-status/${id}`)
		.then((response) => {
			if (response.data.success === true) {
				dispatch({
					type: GET_DISPATCH_ENTRIES_BY_STATUS,
					payload: response.data.data,
				});
			}
		})
		.catch((err) => {
			// if (err.response !== undefined && err.response.data.success === false) {
			// 	toast.error(err.response.data.message);
			// }
		});
};

export const getDispatchEntryChart = (id) => (dispatch) => {
	axios
		.get(`/dashboard/dispatches/chart/${id}`)
		.then((response) => {
			if (response.data.success === true) {
				dispatch({
					type: GET_DISPATCH_ENTRY_CHART,
					payload: response.data.data,
				});
			}
		})
		.catch((err) => {
			// if (err.response !== undefined && err.response.data.success === false) {
			// 	toast.error(err.response.data.message);
			// }
		});
};
