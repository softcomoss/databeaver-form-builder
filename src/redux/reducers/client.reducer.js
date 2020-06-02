import {
	GET_DISPATCH,
	LOADING_DISPATCH,
	LOADING_DISPATCH_COMPLETED,
	NEXT_PAGE,
	PREVIOUS_PAGE,
	ADD_ANSWER,
	SUBMITTING_FORM,
	FORM_SUBMIT_COMPLETED,
	ADD_ADDRESS,
	ADD_MULTI_CHOICE_ANSWER,
	ANSWER_RESET_ACTION,
	ADD_MULTI_CHOICE_OTHER,
} from "../action-types/client-actions.types";
import { GET_FORM_DRAFT } from "../action-types/project-actions.types";

const INITIAL_STATE = {
	dispatch: {},
	loadingDispatch: false,
	currentPage: 1,
	dispatchId: "",
	pages: [],
	currentTime: "",
	totalTime: "",
	savingForm: false,
	formDraft: {},
};

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case GET_DISPATCH:
			if (action.payload.form.form.formData.length > 0) {
				var data = [];
				action.payload.form.form.formData.map((page, i) => {
					let tempPages = [];
					page.elements.map((element, i) => {
						tempPages.push({
							answer: "",
							id: element.unique_id,
							type: element.type,
							question: element.label.length > 0 ? element.label : "unlabeled",
						});
					});
					data.push(tempPages);
				});
			}
			return {
				...state,
				dispatch: action.payload,
				pages: data,
				currentTime: Date.now(),
			};
			break;
		case LOADING_DISPATCH:
			return {
				...state,
				loadingDispatch: true,
			};
			break;
		case LOADING_DISPATCH_COMPLETED:
			return {
				...state,
				loadingDispatch: false,
			};
			break;
		case GET_FORM_DRAFT:
			if (action.payload.formData.length > 0) {
				var tempData = [];

				action.payload.formData.map((page, i) => {
					let tempDraftPages = [];
					page.elements.map((element, i) => {
						tempDraftPages.push({
							answer: "",
							id: element.unique_id,
							type: element.type,
							question: element.label.length > 0 ? element.label : "unlabeled",
						});
					});
					tempData.push(tempDraftPages);
				});
			}
			return {
				...state,
				formDraft: action.payload,
				pages: tempData,
			};
			break;
		case NEXT_PAGE:
			return {
				...state,
				currentPage: state.currentPage + 1,
			};
			break;
		case ANSWER_RESET_ACTION:
			const { targetId, targetPage } = action.payload;
			let pagesToResetAnswer = [...state.pages];
			pagesToResetAnswer[targetPage - 1].map((elem, i) => {
				if (elem.id === targetId) {
					elem.answer = "";
				}
			});
			return {
				...state,
			};
			break;
		case SUBMITTING_FORM:
			return {
				...state,
				savingForm: true,
			};
			break;
		case FORM_SUBMIT_COMPLETED:
			return {
				...state,
				savingForm: false,
			};
			break;
		case PREVIOUS_PAGE:
			return {
				...state,
				currentPage: state.currentPage - 1,
			};
			break;

		case ADD_ANSWER:
			const { page, index, value } = action.payload;
			let pageToEdit = [...state.pages];
			pageToEdit[page - 1][index].answer = value;
			return {
				...state,
				pages: pageToEdit,
			};
			break;
		case ADD_MULTI_CHOICE_ANSWER:
			// const { page, index, value } = action.payload;
			let pageToAddMultiAnswer = [...state.pages];
			if (pageToAddMultiAnswer[action.payload.page - 1][action.payload.index].answer.length < 1) {
				pageToAddMultiAnswer[action.payload.page - 1][action.payload.index].answer = [
					action.payload.value,
				];
			} else {
				if (
					pageToAddMultiAnswer[action.payload.page - 1][action.payload.index].answer.includes(
						action.payload.value
					)
				) {
					let temIndex = pageToAddMultiAnswer[action.payload.page - 1][
						action.payload.index
					].answer.indexOf(action.payload.value);
					pageToAddMultiAnswer[action.payload.page - 1][action.payload.index].answer.splice(temIndex, 1);
				} else {
					pageToAddMultiAnswer[action.payload.page - 1][action.payload.index].answer = [
						...pageToAddMultiAnswer[action.payload.page - 1][action.payload.index].answer,
						action.payload.value,
					];
				}
			}

			return {
				...state,
				pages: pageToAddMultiAnswer,
			};
			break;
		case ADD_ADDRESS:
			const { target } = action.payload;
			let pageToAddAddress = [...state.pages];
			pageToAddAddress[action.payload.page - 1][action.payload.index].answer = {
				...pageToAddAddress[action.payload.page - 1][action.payload.index].answer,
			};

			if (target === "houseNumber") {
				pageToAddAddress[action.payload.page - 1][action.payload.index].answer["houseNumber"] =
					action.payload.value;
			}

			if (target === "streetAddress") {
				pageToAddAddress[action.payload.page - 1][action.payload.index].answer["streetAddress"] =
					action.payload.value;
			}

			if (target === "nearestLandmark") {
				pageToAddAddress[action.payload.page - 1][action.payload.index].answer["nearestLandmark"] =
					action.payload.value;
			}

			return {
				...state,
				pages: pageToAddAddress,
			};

		case ADD_MULTI_CHOICE_OTHER:
			let pageToAddMultiChoiceOther = [...state.pages];
			if (pageToAddMultiChoiceOther[action.payload.page - 1][action.payload.index].answer.length < 1) {
				pageToAddMultiChoiceOther[action.payload.page - 1][action.payload.index].answer = [
					{ other: action.payload.value },
				];
			} else {
				/**
				 *@function objectSearch check of there is already an object in answer array
				 */
				let otherExists = false;

				pageToAddMultiChoiceOther[action.payload.page - 1][action.payload.index].answer.map((ans) => {
					if (typeof ans === "object") {
						console.log(typeof ans);
						otherExists = true;
					}
				});
				if (otherExists) {
					pageToAddMultiChoiceOther[action.payload.page - 1][action.payload.index].answer.map(
						(ans, i) => {
							if (typeof ans === "object") {
								ans.other = action.payload.value;
							}
						}
					);
				} else {
					pageToAddMultiChoiceOther[action.payload.page - 1][action.payload.index].answer.push({
						other: action.payload.value,
					});
				}
			}
			return {
				...state,
				pages: pageToAddMultiChoiceOther,
			};

		default:
			return {
				...state,
			};
			break;
	}
}
