import { authActionTypes } from "../action-types/auth-actions.types";

const initialState = {
	user: {},
	isLoggingIn: false,
	loading: false,
	loginStep: 1,
	isAuthenticated: false,
	error: "",
	organizations: [],
	allOrganizations: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case authActionTypes.LOGIN:
			return { ...state, user: action.payload, error: "" };
			break;
		case authActionTypes.GET_ORGANIZATION:
			return {
				...state,
				organizations: action.payload.organizations.length > 0 ? action.payload.organizations : [],
				loginStep: 2,
			};
		case authActionTypes.IS_LOGING_IN:
			return { ...state, isLoggingIn: true };
			break;
		case authActionTypes.LOGIN_COMPLETE:
			return { ...state, isLoggingIn: false, isAuthenticated: true, error: "" };
			break;
		case authActionTypes.AUTH_ERROR:
			return {
				...state,
				isLoggingIn: false,
				isAuthenticated: false,
				error: action.payload.errMessage,
				loading: false,
			};
			break;
		case authActionTypes.LOGOUT:
			return { ...state, isAuthenticated: false, user: {} };
			break;
		case authActionTypes.LOADING:
			return { ...state, loading: true };
			break;
		case authActionTypes.LOADING_COMPLETE:
			return { ...state, loading: false };
			break;
		case authActionTypes.NETWORK_ERROR:
			return { ...state, loading: false, error: "networkError" };
			break;
		case authActionTypes.TYPING:
			return { ...state, error: "" };
			break;
		case authActionTypes.GET_ALL_ORGANIZATIONS:
			return { ...state, allOrganizations: action.payload };
			break;
		default:
			return state;
	}
};
