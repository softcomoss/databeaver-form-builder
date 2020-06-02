import {
	LOADING_DASHBOARD,
	LOADING_DASHBOARD_COMPLETE,
	GET_DASHBOARD_STATS,
	GET_ACTIVITY_LOG,
	GET_CHART_DATA,
} from "../action-types/dashboard-actions.types";

const INITIAL_STATE = {
	dashboardStats: {},
	loadingDashboard: false,
	activityLogs: {},
	chartData: {},
};

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case LOADING_DASHBOARD:
			return {
				...state,
				loadingDashboard: true,
			};
			break;
		case GET_DASHBOARD_STATS:
			return {
				...state,
				dashboardStats: action.payload,
			};
			break;
		case LOADING_DASHBOARD_COMPLETE:
			return {
				...state,
				loadingDashboard: false,
			};
			break;
		case GET_ACTIVITY_LOG:
			return {
				...state,
				activityLogs: action.payload,
			};
			break;
		case GET_CHART_DATA:
			return {
				...state,
				chartData: action.payload,
			};
			break;
		default:
			return {
				...state,
			};
	}
}
