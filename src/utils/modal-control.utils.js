import UIkit from "uikit";

export const showModal = element => {
	if (UIkit.modal(element)) {
		UIkit.modal(element).show();
	}
};

export const closeModal = element => {
	if (UIkit.modal(element)) {
		UIkit.modal(element).hide();
	}
};
