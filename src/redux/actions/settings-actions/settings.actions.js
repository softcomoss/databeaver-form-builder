import axios from "axios";
import { toast } from "react-toastify";
import {
	LOADING_ADMINS,
	ADD_ADMIN,
	LOADING,
	LOADING_COMPLETE,
	LOAD_ADMINS,
	LOAD_ADMIN,
	LOADING_ADMINS_COMPLETED,
	GET_ALL_ROLES,
	LOADING_ROLES,
	LOADING_ROLES_COMPLETED,
	CREATE_ROLE,
	GET_ROLE,
	EDIT_ROLE_NAME,
	UPDATING_ROLE,
	UPDATING_ROLE_COMPLETED,
	GET_PROFILE,
	CHANGE_PASSWORD,
	DELETE_ROLE,
	DELETING_ROLE,
	DELETED_ROLE,
	GET_PERMISSIONS,
} from "../../action-types/settings-actions.types";

export const addAdmin = (adminDetails, callback) => (dispatch) => {
	dispatch({
		type: LOADING,
	});
	axios
		.post(`/admins`, adminDetails, callback)
		.then((response) => {})
		.then((data) => {
			dispatch({
				type: LOADING_COMPLETE,
			});
			callback();
		})
		.catch((error) => {
			dispatch({
				type: LOADING_COMPLETE,
			});
			if (error.response !== undefined && error.response.data !== undefined) {
				toast.error("Error adding new admin");
			}
		});
};

export const getAllAdmins = (page) => (dispatch) => {
	dispatch({
		type: LOADING_ADMINS,
	});
	axios
		.get(`/admins?skip=${(page - 1) * 20}&limit=20`)
		.then((response) => {
			if (response.data !== undefined && response.data.success === true) {
				dispatch({
					type: LOAD_ADMINS,
					payload: response.data.data,
				});
			}
		})
		.then((data) => {
			dispatch({
				type: LOADING_ADMINS_COMPLETED,
			});
		})
		.catch((error) => {
			dispatch({
				type: LOADING_ADMINS_COMPLETED,
			});
		});
};

export const searchAdmin = (query) => (dispatch) => {
	let url = "";
	let searchParameter = query.trim();
	if (searchParameter.length > 0) {
		url = `/admins/search?q=${query}&skip=0&limit=0`;
	} else {
		url = `/admins?skip=0&limit=0`;
	}
	axios
		.get(url)
		.then((response) => {
			if (response.data !== undefined && response.data.success === true) {
				dispatch({
					type: LOAD_ADMINS,
					payload: response.data.data,
				});
			}
		})
		.then((data) => {
			dispatch({
				type: LOADING_ADMINS_COMPLETED,
			});
		})
		.catch((error) => {
			dispatch({
				type: LOADING_ADMINS_COMPLETED,
			});
		});
};

export const getAllRoles = (page, callback) => (dispatch) => {
	console.log("page from page", page);
	let url = `/roles?skip=${(1 - 1) * 20}&limit=20`;
	dispatch({
		type: LOADING_ROLES,
	});
	axios
		.get(url)
		.then((response) => {
			if (response.data !== undefined && response.data.success === true) {
				dispatch({
					type: GET_ALL_ROLES,
					payload: response.data.data,
				});
			}
		})
		.then((data) => {
			dispatch({
				type: LOADING_ROLES_COMPLETED,
			});
			callback();
		})
		.catch((error) => {
			dispatch({
				type: LOADING_ROLES_COMPLETED,
			});
		});
};

export const createRole = (details, callback) => (dispatch) => {
	dispatch({
		type: LOADING,
	});
	axios
		.post(`/roles`, details)
		.then((response) => {
			if (response.data !== undefined && response.data.success === true) {
			}
		})
		.then((data) => {
			dispatch({
				type: LOADING_COMPLETE,
			});
			callback();
		})
		.catch((error) => {
			dispatch({
				type: LOADING_COMPLETE,
			});
			if (error.response !== undefined && error.response.data !== undefined) {
				toast.error(error.response.data.error);
			}
		});
};

export const getRole = (id, callback) => (dispatch) => {
	dispatch({
		type: LOADING,
	});
	axios
		.get(`/roles/${id}`)
		.then((response) => {
			if (response.data !== undefined && response.data.success === true) {
				dispatch({
					type: GET_ROLE,
					payload: response.data.data,
				});
			}
			callback();
		})
		.then((data) => {
			dispatch({
				type: LOADING_COMPLETE,
			});
			callback();
		})
		.catch((error) => {
			dispatch({
				type: LOADING_COMPLETE,
			});
			// if (error.response !== undefined && error.response.data !== undefined) {
			// 	toast.error(error.response.data.error);
			// }
		});
};

export const editRoleNAme = (name) => (dispatch) => {
	dispatch({
		type: EDIT_ROLE_NAME,
		payload: {
			name,
		},
	});
};

export const updateRole = (id, name, callback) => (dispatch) => {
	dispatch({
		type: UPDATING_ROLE,
	});
	axios
		.put(`/roles/${id}`, name)
		.then((response) => {
			if (response.data !== undefined && response.data.success === true) {
				// dispatch({
				// 	type: GET_ROLE,
				// 	payload: response.data.data
				// });
			}
		})
		.then((data) => {
			dispatch({
				type: UPDATING_ROLE_COMPLETED,
			});
			callback();
		})
		.catch((error) => {
			dispatch({
				type: UPDATING_ROLE_COMPLETED,
			});
			// if (error.response !== undefined && error.response.data !== undefined) {
			// 	toast.error(error.response.data.error);
			// }
			toast.error("There was an error updating role");
		});
};

export const getProfile = (callback) => (dispatch) => {
	axios
		.get(`/admins/profile`)
		.then((response) => {
			if (response.data !== undefined) {
				dispatch({
					type: GET_PROFILE,
					payload: response.data.data,
				});
			}
		})
		.then((data) => {
			callback();
			dispatch({
				type: LOADING_COMPLETE,
			});
		})
		.catch((error) => {
			dispatch({
				type: LOADING_COMPLETE,
			});
			// if (error.response !== undefined && error.response.data !== undefined) {
			// 	toast.error(error.response.data.error);
			// }
		});
};

export const updateProfile = (details, callback) => (dispatch) => {
	dispatch({
		type: LOADING,
	});
	axios
		.put(`/admins/update-profile`, details)
		.then((response) => {
			if (response.data !== undefined && response.data.success === true) {
				// dispatch({
				// 	type: GET_ROLE,
				// 	payload: response.data.data
				// });
			}
		})
		.then((data) => {
			dispatch({
				type: LOADING_COMPLETE,
			});
			callback();
		})
		.catch((error) => {
			dispatch({
				type: LOADING_COMPLETE,
			});
			if (error.response !== undefined && error.response.data !== undefined) {
				toast.error(error.response.data.error);
			} else {
				toast.error("There was an error updating role, check your connection");
			}
		});
};

export const getSingleAdmin = (id, callback) => (dispatch) => {
	dispatch({
		type: LOADING,
	});
	axios
		.get(`/admins/${id}`)
		.then((response) => {
			if (response.data !== undefined) {
				dispatch({
					type: LOAD_ADMIN,
					payload: response.data.data,
				});
			}
		})
		.then((data) => {
			dispatch({
				type: LOADING_COMPLETE,
			});
			callback();
		})
		.catch((error) => {
			dispatch({
				type: LOADING_COMPLETE,
			});
			// if (error.response !== undefined && error.response.data !== undefined) {
			// 	toast.error(error.response.data.error);
			// }
		});
};

export const updateAdmin = (id, adminDetails, callback) => (dispatch) => {
	dispatch({
		type: LOADING,
	});
	axios
		.put(`/admins/${id}`, adminDetails)
		.then((response) => {
			if (response.data !== undefined) {
				dispatch({
					type: LOAD_ADMIN,
					payload: response.data.data,
				});
			}
			callback();
		})
		.then((data) => {
			dispatch({
				type: LOADING_COMPLETE,
			});
		})
		.catch((error) => {
			dispatch({
				type: LOADING_COMPLETE,
			});
			if (error.response !== undefined && error.response.data !== undefined) {
				toast.error(error.response.data.error);
			}
			// toast.error("Error updating profile");
		});
};

export const updatePassword = (password, callback) => (dispatch) => {
	dispatch({
		type: LOADING,
	});
	axios
		.post(`/auth/update-password`, password)
		.then((response) => {
			if (response.data.success === true) {
				// console.log("password updated");
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

export const updateOrganization = (id, adminDetails, callback) => (dispatch) => {
	dispatch({
		type: LOADING,
	});
	axios
		.put(`/organizations/${id}`, adminDetails)
		.then((response) => {
			if (response.data !== undefined && response.data.success === true) {
			}
		})
		.then((data) => {
			dispatch({
				type: LOADING_COMPLETE,
			});
			callback();
		})
		.catch((error) => {
			dispatch({
				type: LOADING_COMPLETE,
			});

			toast.error("Error updating profile");
		});
};

export const deleteRole = (id, callback) => (dispatch) => {
	dispatch({
		type: DELETING_ROLE,
	});
	axios
		.delete(`/roles/${id}`)
		.then((response) => {
			if (response.data !== undefined && response.data.success === true) {
				dispatch({
					type: DELETED_ROLE,
				});
			}
		})
		.then((data) => {
			callback();
		})
		.catch((error) => {
			dispatch({
				type: DELETED_ROLE,
			});
			if (error.response !== undefined) {
				toast.error(error.response.data.error);
			} else {
				toast.error("Network error");
			}
		});
};

export const getPermissions = (callback) => (dispatch) => {
	axios
		.get(`/permissions?skip=0&limit=1000`)
		.then((response) => {
			if (response.data !== undefined && response.data.success === true) {
				let definedPermissions = {};
				if (response.data.data.permissions !== undefined && response.data.data.permissions.length > 0) {
					response.data.data.permissions.map((permission, i) => {
						let key = permission.name;
						let id = permission._id;
						definedPermissions[key] = id;
					});
					dispatch({
						type: GET_PERMISSIONS,
						payload: definedPermissions,
					});
				}
			}
		})
		.then((res) => {
			callback();
		})
		.catch((error) => {
			if (error.response !== undefined) {
				toast.error(error.response.data.error);
			}
		});
};

export const addPermission = (id, permissions) => (dispatch) => {
	axios
		.patch(`/roles/add-permissions/${id}`, { permissions })
		.then((response) => {
			if (response.data !== undefined && response.data.success === true) {
				// console.log("add permission", response.data);
			}
		})
		.catch((error) => {
			if (error.response !== undefined) {
				toast.error(error.response.data.error);
			}
		});
};

export const sendAdminInvite = (details, callback) => (dispatch) => {
	axios
		.post(`/admin/invite`, details)
		.then((response) => {
			if (response.data !== undefined && response.data.success === true) {
				toast.success(`${response.data.data.created} admin invites sent`);
			}
		})
		.then((res) => {
			callback();
		})
		.catch((error) => {
			if (error.response !== undefined) {
				toast.error(error.response.data.error);
			}
		});
};
