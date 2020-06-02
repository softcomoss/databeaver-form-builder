import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { editFormName, inputNewFormName } from "../../redux/actions/form-action/form.actions";
import { toast } from "react-toastify";

const RenameForm = (props) => {
	const { form, editFormName, name, selectedForm, inputNewFormName, saveDetails } = props;
	const [newFormName, setNewFormName] = useState("");

	const onEditFormName = () => {
		editFormName(selectedForm._id, newFormName, () => {
			// toast.success("Form Renamed");
		});
	};

	return (
		<>
			<button className="uk-modal-close-default" type="button" data-uk-close />
			<h2 className="uk-modal-title"> Rename form</h2>
			<div className="uk-modal-body">
				<label htmlFor="form-name" className="form-inputs">
					<input
						onChange={(e) => {
							setNewFormName(e.target.value);
							inputNewFormName(e.target.value);
						}}
						defaultValue={name}
						type="text"
						id="form-name"
						placeholder=" "
					/>
					<span className="label">Form name</span>
				</label>
			</div>
			<div className="uk-modal-footer uk-text-left">
				<button
					onClick={() => {
						{
							/* saveDetails(); */
						}

						onEditFormName();
					}}
					className="modal-actn-btn modal-accept-btn"
					type="button">
					Save
				</button>
				<button className="uk-modal-close modal-cancel-btn modal-actn-btn" type="button">
					Close
				</button>
			</div>
		</>
	);
};

const mapStateToProps = (state) => ({
	form: state.formReducer,
	selectedForm: state.formReducer.activeForm,
	name: state.formReducer.name,
});

export default connect(mapStateToProps, { editFormName, inputNewFormName })(RenameForm);
