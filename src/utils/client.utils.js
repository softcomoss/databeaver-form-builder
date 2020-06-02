/**
 * @description: this utility function will determine if the element is supposed to be displayed based on the set form logic
 * @param {*} details : this is the details of the form element
 * @param {*} formRules : this is all the rules set for the form
 * @param {*} pages : this is all the pages on the form
 * @param {*} resetAction : This is the action to take the element back to original state when the input data is cleared
 * @param {*} currentPage : this is the current active page
 */

export const toBeDisplayed = (details, formRules, pages, resetAction, currentPage) => {
	let allElements = pages.flat();
	let elementId = details.unique_id;
	let ruleSource = "";
	let currentRule = {};
	let expectedValue = "";
	let multiExpectedValues = [];
	let condition = "";
	let action = "";
	let answer;
	let meetCondition = true;

	formRules.map((rule, i) => {
		if (rule.logics.length < 2) {
			if (rule.logics[0].target === elementId) {
				currentRule = rule;
				ruleSource = rule.unique_id;
				expectedValue = rule.logics[0].value; //when a single value is expected
				multiExpectedValues.push(rule.logics[0].value); //when more than one value is expected(multi-choice)
				condition = rule.logics[0].condition;
				action = rule.logics[0].action;
				// console.log("params", ruleSource, expectedValue, condition, elementId);
			}
			allElements.map((element, i) => {
				if (currentRule !== undefined && element.id === ruleSource) {
					answer = Array.isArray(answer) ? [...element.answer] : element.answer;
					if (answer.includes(expectedValue)) {
						if (action === "show") {
							meetCondition = true;
						} else if (action === "hide") {
							meetCondition = false;
						}
					} else {
						meetCondition = false;
					}
				}
			});
		} else {
			rule.logics.map((logic, i) => {
				if (logic.target === elementId) {
					currentRule = rule;
					ruleSource = rule.unique_id;
					expectedValue = logic.value;
					multiExpectedValues.push(logic.value);
					condition = logic.condition;
					action = logic.action;
				}
				allElements.map((element, i) => {
					if (currentRule !== undefined && element.id === ruleSource) {
						answer = Array.isArray(answer) ? [...element.answer] : element.answer;
						if (answer.includes(expectedValue) || multiExpectedValues.includes(answer)) {
							if (action === "show") {
								meetCondition = true;
							} else if (action === "hide") {
								meetCondition = false;
							}
						} else {
							meetCondition = false;
						}
					}
				});
			});
		}
	});

	// return details.hidden === true && meetCondition !== true;
	if (
		details.hidden === true &&
		meetCondition === false &&
		multiExpectedValues.includes(answer) === false
	) {
		resetAction(details.unique_id, currentPage);
		return false;
	} else {
		return true;
	}
};
