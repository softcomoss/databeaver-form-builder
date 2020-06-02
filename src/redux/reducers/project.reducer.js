import {
	GET_ALL_PROJECTS,
	LOADING_PROJECTS_COMPLETED,
	LOADING_PROJECTS,
	CREATING_PROJECTS,
	CREATING_PROJECTS_COMPLETED,
	GET_SINGLE_PROJECT,
	LOADING_SINGLE_PROJECT,
	LOADING_SINGLE_PROJECT_COMPLETED,
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
	GET_DISPATCH_ENTRY,
	LOADING_COMPLETE,
	LOADING,
	GET_PROJECT_ENTRIES,
	GET_PROJECT_DASHBOARD_COUNT,
	GET_AGENT_ACTIVITIES,
	GET_PROJECT_CHART,
	GET_DISPATCH_COUNT,
	GET_DISPATCH_AGENTS_ACTIVITIES,
	GET_ACTIVE_DISPATCH_LOCATIONS,
	ADD_DISPATCH_INSTRUCTIONS_FILES,
	DELETE_DISPATCH_INSTRUCTIONS_FILES,
	GET_DISPATCH_ENTRIES_BY_STATUS,
	GET_DISPATCH_ENTRY_CHART,
	TOGGLE_HAVE_BUDGET,
	ADD_DISPATCH_INSTRUCTIONS_SUMMARY,
	GET_ENTRIES_MAP_DATA,
} from "../action-types/project-actions.types";

const INITIAL_STATE = {
	allProjects: {},
	loadingProjects: false,
	savingProject: false,
	activeProject: {},
	activeProjectDispatchList: {},
	highlightedProject: {},
	projectToDispatch: {},
	formToDispatch: {},
	dispatchName: "",
	startDate: "",
	endDate: "",
	endDateIso: "",
	dispatchColour: "#000000",
	dispatchType: "basic",
	dispatchFrequency: " ",
	selectedGroups: [],
	selectedGroupId: [],
	selectedAgentsId: [],
	selectedAgents: [],
	projectChart: {},
	dispatchAgents: [],
	haveBudget: false,
	budget: 0,
	expectedEntry: 0,
	instructions: {
		instructions: "",
		attachments: [],
	},
	pushing: false,
	selectAllAgents: false,
	activeDispatch: {},
	activeDispatchCounts: {},
	dispatchEntries: {},
	activeEntry: {},
	loading: false,
	projectDashboardCount: {},
	agentsActivities: {},
	activeDispatchLocations: [],
	dispatchEntriesByStatus: {},
	dispatchEntryChart: {},
	entriesMapData: {},
};

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case GET_ALL_PROJECTS:
			return {
				...state,
				allProjects: action.payload,
			};
		case GET_ACTIVE_DISPATCH_LOCATIONS:
			return {
				...state,
				activeDispatchLocations: action.payload,
			};
		case GET_DISPATCH_ENTRY_CHART:
			return {
				...state,
				dispatchEntryChart: action.payload,
			};
		case GET_DISPATCH_ENTRIES_BY_STATUS:
			return {
				...state,
				dispatchEntriesByStatus: action.payload,
			};
		case GET_DISPATCH_ENTRIES_BY_STATUS:
			return {
				...state,
				dispatchEntriesByStatus: action.payload,
			};
		case SEARCH_PROJECTS:
			return {
				...state,
				allProjects: action.payload,
			};
		case GET_PROJECT_DASHBOARD_COUNT:
			return {
				...state,
				projectDashboardCount: action.payload,
			};
		case GET_AGENT_ACTIVITIES:
			return {
				...state,
				agentsActivities: action.payload,
			};
		case LOADING:
			return {
				...state,
				loading: true,
			};
		case LOADING_COMPLETE:
			return {
				...state,
				loading: false,
			};
		case LOADING_PROJECTS_COMPLETED:
			return {
				...state,
				loadingProjects: false,
			};
		case LOADING_PROJECTS:
			return {
				...state,
				loadingProjects: true,
			};
		case CREATING_PROJECTS:
			return {
				...state,
				savingProject: true,
			};
		case CREATING_PROJECTS_COMPLETED:
			return {
				...state,
				savingProject: false,
			};
		case GET_DISPATCH_AGENTS_ACTIVITIES:
			return {
				...state,
				dispatchAgents: action.payload,
			};
		case TOGGLE_HAVE_BUDGET:
			return {
				...state,
				haveBudget: !state.haveBudget,
			};
		case GET_SINGLE_PROJECT:
			return {
				...state,
				activeProject: action.payload,
				projectToDispatch: action.payload,
			};
		case HIGHLIGHT_PROJECT:
			return {
				...state,
				highlightedProject: action.payload.project,
			};
		case SELECT_PROJECT_TO_DISPATCH:
			return {
				...state,
				projectToDispatch: action.payload.project,
			};
		case GET_PROJECT_CHART:
			return {
				...state,
				projectChart: action.payload,
			};
		case SELECT_FORM_TO_DISPATCH:
			return {
				...state,
				formToDispatch: action.payload.form,
			};
		case GET_ENTRIES_MAP_DATA:
			return {
				...state,
				entriesMapData: action.payload,
			};
		case SET_DISPATCH_NAME:
			return {
				...state,
				dispatchName: action.payload.name,
			};
		case GET_DISPATCH_COUNT:
			return {
				...state,
				activeDispatchCounts: action.payload,
			};
		case SET_DISPATCH_START_DATE:
			return {
				...state,
				startDate: action.payload.startDate,
			};
		case SET_DISPATCH_END_DATE:
			return {
				...state,
				endDate: action.payload.endDate,
			};
		case SET_DISPATCH_COLOUR:
			return {
				...state,
				dispatchColour: action.payload.colour,
			};
		case SET_DISPATCH_TYPE:
			return {
				...state,
				dispatchType: action.payload.dispatchType,
			};
		case SET_DISPATCH_FREQUENCY:
			return {
				...state,
				dispatchFrequency: action.payload.frequency,
			};
		case ADD_BUDGET:
			return {
				...state,
				budget: action.payload.value,
			};
		case EXPECTED_ENTRY:
			return {
				...state,
				expectedEntry: action.payload.value,
			};
		case GET_ACTIVE_PROJECT_DISPATCHES:
			return {
				...state,
				activeProjectDispatchList: action.payload,
			};
		case GET_DISPATCH_DETAILS:
			return {
				...state,
				activeDispatch: action.payload,
			};
		case GET_DISPATCH_ENTRIES:
			return {
				...state,
				dispatchEntries: action.payload,
			};
		case GET_PROJECT_ENTRIES:
			return {
				...state,
				dispatchEntries: action.payload,
			};
		case GET_DISPATCH_ENTRY:
			return {
				...state,
				activeEntry: action.payload,
			};
		case PUSHING_DISPATCH:
			return {
				...state,
				pushing: true,
			};
		case PUSHING_DISPATCH_COMPLETED:
			return {
				...state,
				pushing: false,
			};
		case DELETE_DISPATCH_INSTRUCTIONS_FILES:
			let intructionToDelete = { ...state.instructions };
			let newAttachments = intructionToDelete.attachments.filter((attach, i) => {
				return i !== action.payload.index;
			});
			return {
				...state,
				instructions: { instructions: intructionToDelete.instructions, attachments: newAttachments },
			};
		case ADD_DISPATCH_INSTRUCTIONS_FILES:
			let tempInstructions = { ...state.instructions };
			tempInstructions.attachments.push({ type: action.payload.type, url: action.payload.url });
			return {
				...state,
				instructions: tempInstructions,
			};
		case ADD_DISPATCH_INSTRUCTIONS_SUMMARY:
			let tempInstructionSummary = { ...state.instructions };
			tempInstructionSummary.instructions = action.payload.summary;
			return {
				...state,
				instructions: tempInstructionSummary,
			};
		case SELECT_UNSELECT_ALL_AGENTS:
			let tempSelectAllAgents = [];
			let tempSelectAllAgentsId = [];
			if (state.selectAllAgents === false) {
				action.payload.allAgents.agents.map((agent, i) => {
					tempSelectAllAgents.push(agent);
					tempSelectAllAgentsId.push(agent._id);
				});
			} else {
				tempSelectAllAgents = [];
				tempSelectAllAgentsId = [];
			}
			return {
				...state,
				selectAllAgents: !state.selectAllAgents,
				selectedAgents: tempSelectAllAgents,
				selectedAgentsId: tempSelectAllAgentsId,
			};
		case ADD_REMOVE_GROUP:
			let tempSelectedGroups = [...state.selectedGroups];
			let tempSelectedGroupId = [...state.selectedGroupId];
			if (tempSelectedGroupId.includes(action.payload.group._id)) {
				let filterTempSelectedGroupsId = tempSelectedGroupId.filter((el) => {
					return el !== action.payload.group._id;
				});
				tempSelectedGroupId = filterTempSelectedGroupsId;
				let filterTempSelectedGroups = tempSelectedGroups.filter((elem) => {
					return elem._id !== action.payload.group._id;
				});
				tempSelectedGroupId = filterTempSelectedGroupsId;
				tempSelectedGroups = filterTempSelectedGroups;
			} else {
				tempSelectedGroupId.push(action.payload.group._id);
				tempSelectedGroups.push(action.payload.group);
			}
			return {
				...state,
				selectedGroups: tempSelectedGroups,
				selectedGroupId: tempSelectedGroupId,
			};

		case ADD_REMOVE_AGENT:
			let tempSelectedAgent = [...state.selectedAgents];
			let tempSelectedAgentId = [...state.selectedAgentsId];
			if (tempSelectedAgent.some((agent) => agent._id === action.payload.agent._id)) {
				tempSelectedAgent.map((selectedAgent, i) => {
					if (selectedAgent._id === action.payload.agent._id) {
						tempSelectedAgent.splice(i, 1);
					}
				});
			} else {
				tempSelectedAgent.push(action.payload.agent);
			}
			if (tempSelectedAgentId.some((agent) => agent === action.payload.agent._id)) {
				tempSelectedAgentId.map((selectedAgentId, i) => {
					if (selectedAgentId === action.payload.agent._id) {
						tempSelectedAgentId.splice(i, 1);
					}
				});
			} else {
				tempSelectedAgentId.push(action.payload.agent._id);
			}
			return {
				...state,
				selectedAgents: tempSelectedAgent,
				selectedAgentsId: tempSelectedAgentId,
			};
		default:
			return {
				...state,
			};
	}
}
