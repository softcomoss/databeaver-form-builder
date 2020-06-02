import { authActionTypes } from "../../action-types/auth-actions.types";
import axios from "axios";
import { toast } from "react-toastify";

/**
 *
 * @param {*} details
 * @function preLogin the function fetches the admin organizations and token needed to complete the auth process
 */
export const preLogin = (details) => async (dispatch) => {
	let url = "/auth/login";
	try {
		let getToken = await axios.post(url, details);
		const { data, success } = getToken.data;
		if (success) {
			return data;
		}
	} catch (error) {
		return error.response.data;
	}
};

export const loginUser = (organization, token) => async (dispatch) => {
	let url = `/auth/select-organization`;
	dispatch({
		type: authActionTypes.IS_LOGING_IN,
	});
	try {
		let login = await axios.post(url, { organization, token });
		const { data, success } = login.data;
		if (success) {
			return data;
		}
	} catch (error) {
		dispatch({
			type: authActionTypes.LOADING_COMPLETE,
		});
		if (error.response) {
			return error.response.data;
		}
	}
};

export const userTyping = () => (dispatch) => {
	dispatch({
		type: authActionTypes.TYPING,
	});
};

export const userSignup = (firstName, lastName, email, password, organizationName) => async (
	dispatch
) => {
	let url = "/auth/signup";
	let newUserDetails = {
		firstName,
		lastName,
		email,
		organizationName,
		password,
	};
	try {
		dispatch({
			type: authActionTypes.LOADING,
		});
		let signup = await axios.post(url, newUserDetails);
		const { data, success } = (await signup).data;
		if (success) {
			dispatch({
				type: authActionTypes.LOADING_COMPLETE,
			});
			setTimeout(() => {
				window.location.replace("/");
			}, 2000);
			toast.success("Sign up successful, a verification link has been sent to your mail");
			return data;
		}
	} catch (error) {
		dispatch({
			type: authActionTypes.LOADING_COMPLETE,
		});
		if (error.response) {
			toast.error(error.response.data.error);
		} else {
			dispatch({
				type: authActionTypes.NETWORK_ERROR,
			});
		}
	}
};

export const logout = () => (dispatch) => {
	dispatch({
		type: authActionTypes.LOGOUT,
	});
	localStorage.clear();
	window.location.replace("/");
};

export const forgotPassword = (email, callback) => (dispatch) => {
	dispatch({
		type: authActionTypes.LOADING,
	});
	axios
		.post("/auth/forgot-password", { email })
		.then((response) => {
			if (response !== undefined && response.data.success === true) {
				dispatch({
					type: authActionTypes.LOGIN,
					payload: response.data,
				});
				toast.success(response.data.data);
				callback();
			}
		})
		.then((complete) => {
			dispatch({
				type: authActionTypes.LOADING_COMPLETE,
			});
		})
		.catch((error) => {
			dispatch({
				type: authActionTypes.LOADING_COMPLETE,
			});
			if (error !== undefined && error.response !== undefined && error.response !== null) {
				toast.error(error.response.data.error);
			} else {
				dispatch({
					type: authActionTypes.NETWORK_ERROR,
				});
			}
		});
};

export const getAllOrganizations = (email) => (dispatch) => {
	dispatch({
		type: authActionTypes.LOADING,
	});
	axios
		.post("/auth/organizations", {
			email,
		})
		.then((response) => {
			if (response !== undefined && response.data.success === true) {
				dispatch({
					type: authActionTypes.GET_ORGANIZATION,
					payload: { organizations: response.data.data.organizations },
				});
			}
		})
		.then(() => {
			dispatch({
				type: authActionTypes.LOADING_COMPLETE,
			});
		})
		.catch((error) => {
			if (error !== undefined && error.response !== undefined && error.response !== null) {
				dispatch({
					type: authActionTypes.AUTH_ERROR,
					payload: {
						errMessage: error.response.data.error,
					},
				});
			} else {
				dispatch({
					type: authActionTypes.NETWORK_ERROR,
				});
			}
			dispatch({
				type: authActionTypes.LOADING_COMPLETE,
			});
		});
};

export const resetPassword = (token, newPassword, callback) => (dispatch) => {
	dispatch({
		type: authActionTypes.LOADING,
	});
	axios
		.post("/auth/reset-password", { token, newPassword })
		.then((response) => {
			if (response !== undefined && response.data.success === true) {
				toast.success(response.data.data);
			}
		})
		.then((complete) => {
			dispatch({
				type: authActionTypes.LOADING_COMPLETE,
			});
		})
		.then((data) => {
			callback();
		})
		.catch((error) => {
			dispatch({
				type: authActionTypes.LOADING_COMPLETE,
			});
			if (error !== undefined && error.response !== undefined && error.response !== null) {
				toast.error(error.response.data.error);
			} else {
				dispatch({
					type: authActionTypes.NETWORK_ERROR,
				});
			}
		});
};

export const getAllOrganizationsForSwitch = () => (dispatch) => {
	axios
		.get("/organizations?skip=0&limit=0")
		.then((response) => {
			if (response !== undefined && response.data.success === true) {
				dispatch({
					type: authActionTypes.GET_ALL_ORGANIZATIONS,
					payload: response.data.data.organizations,
				});
			}
		})
		.catch((error) => {
			if (error !== undefined && error.response !== undefined && error.response !== null) {
				toast.error(error.response.data.error);
			} else {
				dispatch({
					type: authActionTypes.NETWORK_ERROR,
				});
			}
		});
};

export const switchOrganization = (org, callback) => (dispatch) => {
	axios
		.post(`/auth/switch/${org}`)
		.then((response) => {
			if (response !== undefined && response.data.success === true) {
				dispatch({
					type: authActionTypes.SWITCH_ORGANIZATION,
					payload: response.data.data.organizations,
				});
				localStorage.setItem("__beav", JSON.stringify(response.data.data));
			}
		})
		.then((res) => {
			callback();
		})
		.catch((error) => {
			if (error !== undefined && error.response !== undefined && error.response !== null) {
				toast.error(error.response.data.error);
			} else {
				dispatch({
					type: authActionTypes.NETWORK_ERROR,
				});
			}
		});
};

export const resendVerificationLink = (email, callback) => async (dispatch) => {
	let url = "/auth/resend-verification-mail";
	try {
		let emailSent = await axios.post(url, { email });
		const { data } = emailSent;
		if (data.success) {
			toast.success(data.message);
			callback();
			return data;
		}
	} catch (error) {
		toast.error(error.response.data.error);
		return error.response.data;
	}
};

export const getUserPermissions = (roleId, callback) => async (dispatch) => {
	let url = `/roles/${roleId}`;
	try {
		let currentRole = await axios.get(url);
		let permissions = [];
		const { data, success } = currentRole.data;
		if (success) {
			data.permissions.map((perms) => permissions.push(perms.name));
			sessionStorage.setItem("__beaver__perms", JSON.stringify(permissions));
			callback();
			return permissions;
		}
	} catch (error) {
		return [];
	}
};
