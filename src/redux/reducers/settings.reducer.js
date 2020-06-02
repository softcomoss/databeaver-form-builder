import {
	ADD_ADMIN,
	LOADING_ADMINS,
	LOADING,
	LOADING_ADMINS_COMPLETED,
	LOADING_COMPLETE,
	LOAD_ADMINS,
	LOAD_ADMIN,
	GET_ALL_ROLES,
	LOADING_ROLES,
	LOADING_ROLES_COMPLETED,
	GET_ROLE,
	EDIT_ROLE_NAME,
	UPDATING_ROLE,
	UPDATING_ROLE_COMPLETED,
	GET_PROFILE,
	DELETING_ROLE,
	DELETED_ROLE,
	GET_PERMISSIONS,
} from "../action-types/settings-actions.types";

const initialState = {
	admins: {},
	loadingAdmins: false,
	loading: false,
	allRoles: {},
	loadingRoles: false,
	viewRole: {},
	activeRoleName: "",
	updating: false,
	profile: {},
	adminProfile: {},
	deletingRole: false,
	permissions: {},
	activeRole: {},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case LOADING_ADMINS:
			return { ...state, loadingAdmins: true };
			break;
		case LOADING_ADMINS_COMPLETED:
			return { ...state, loadingAdmins: false };
			break;
		case LOADING:
			return { ...state, loading: true };
			break;
		case LOADING_COMPLETE:
			return { ...state, loading: false };
			break;
		case LOAD_ADMINS:
			return { ...state, admins: action.payload };
			break;
		case GET_ALL_ROLES:
			return { ...state, allRoles: action.payload };
			break;
		case LOADING_ROLES:
			return { ...state, loadingRoles: true };
			break;
		case LOADING_ROLES_COMPLETED:
			return { ...state, loadingRoles: false };
			break;
		case GET_ROLE:
			return { ...state, viewRole: action.payload, activeRole: action.payload };
			break;
		case EDIT_ROLE_NAME:
			return { ...state, activeRoleName: action.payload.name };
			break;
		case UPDATING_ROLE:
			return { ...state, updating: true };
			break;
		case UPDATING_ROLE_COMPLETED:
			return { ...state, updating: false };
			break;
		case GET_PROFILE:
			return { ...state, profile: action.payload };
			break;
		case DELETING_ROLE:
			return { ...state, deletingRole: true };
			break;
		case DELETED_ROLE:
			return { ...state, deletingRole: false };
			break;
		case LOAD_ADMIN:
			return { ...state, adminProfile: action.payload };
			break;
		case GET_PERMISSIONS:
			return { ...state, permissions: action.payload };
			break;
		default:
			return state;
	}
};
