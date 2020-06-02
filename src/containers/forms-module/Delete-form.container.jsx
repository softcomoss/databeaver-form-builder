import React from "react";
import { deleteForm } from "../../redux/actions/form-action/form.actions";

const DeleteForm = (props) => {
	const { formDetails, deleteForm } = props;
	return (
		<>
			<h2 className="uk-modal-title"> Are you sure?</h2>
			<div className="uk-modal-body">
				<p>
					You’re about to <span className="co-warning">permanently delete</span> this form, are you sure
					you want to do that?
				</p>
			</div>
			<div className="uk-modal-footer uk-text-left">
				<button
					onClick={() => deleteForm(formDetails)}
					className="modal-actn-btn bg-warning co-white"
					type="button">
					Yes,delete
				</button>
				<button className="uk-modal-close modal-cancel-btn modal-actn-btn" type="button">
					No,cancel
				</button>
			</div>
		</>
	);
};

export default DeleteForm;
