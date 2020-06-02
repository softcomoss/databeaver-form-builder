import axios from "axios";
import { toast } from "react-toastify";
import {
	GET_DASHBOARD_STATS,
	LOADING_DASHBOARD,
	LOADING_DASHBOARD_COMPLETE,
	GET_ACTIVITY_LOG,
	LOADING,
	LOADING_COMPLETE,
	GET_CHART_DATA,
} from "../../action-types/dashboard-actions.types";

export const getDashboardStats = (page, callback) => (dispatch) => {
	dispatch({
		type: LOADING_DASHBOARD,
	});
	axios
		.get(`/dashboard/counts`)
		.then((response) => {
			if (response.data.success === true) {
				dispatch({
					type: GET_DASHBOARD_STATS,
					payload: response.data.data,
				});
			}
		})
		.then((res) => {
			dispatch({
				type: LOADING_DASHBOARD_COMPLETE,
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
				type: LOADING_DASHBOARD_COMPLETE,
			});
		});
};

export const getActivityLog = (page, callback) => (dispatch) => {
	axios
		.get(`/logs`)
		.then((response) => {
			if (response.data.success === true) {
				dispatch({
					type: GET_ACTIVITY_LOG,
					payload: response.data.data,
				});
			}
		})
		.then((res) => {
			dispatch({
				type: LOADING_DASHBOARD_COMPLETE,
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
				type: LOADING_DASHBOARD_COMPLETE,
			});
		});
};

export const getDashboardChart = (startDate, endDate, callback) => (dispatch) => {
	let url = "";
	if (startDate !== undefined && endDate !== undefined && startDate.length > 0 && endDate.length > 0) {
		url = `/dashboard/chart?startDate=${startDate}&endDate=${endDate}`;
	} else {
		url = "/dashboard/chart";
	}
	axios
		.get(url)
		.then((response) => {
			if (response.data.success === true) {
				dispatch({
					type: GET_CHART_DATA,
					payload: response.data.data,
				});
			}
		})
		.then((res) => {
			dispatch({
				type: LOADING_DASHBOARD_COMPLETE,
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
				type: LOADING_DASHBOARD_COMPLETE,
			});
		});
};
