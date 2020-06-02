import React, { Component } from "react";
import { showModal, closeModal } from "../../components/modals/modalControl";

export default class AddFormDialog extends Component {
	render() {
		return (
			<div data-uk-modal>
				<div className="uk-modal-dialog uk-margin-auto-vertical border-radius">
					<button className="uk-modal-close-default" type="button" data-uk-close />
					<h2 className="uk-modal-title"> Create a new form</h2>
					<div className="uk-modal-body d-flx-alc-jc-fw">
						<a
							onClick={() => {
								showModal("#create-from-scratch");
							}}
							className="modal-n-modal-btn">
							<svg>
								<use xlinkHref="/uploads/icons.svg#create-scratch" />
							</svg>
							<span>Create from scratch</span>
						</a>
						<div id="create-from-scratch">
							<div className="uk-modal-dialog uk-margin-auto-vertical border-radius">
								<button className="uk-modal-close-default" type="button" data-uk-close />
								<h2 className="uk-modal-title">Name your form</h2>
								<div className="uk-modal-body">
									<label htmlFor="form-name" className="form-inputs">
										<input type="text" id="form-name" placeholder=" " />
										<span className="label">
											Form name <span className="co-warning">*</span>
										</span>
									</label>
									<label htmlFor className="inp-select">
										<span className="label">Sector</span>
										<select name id>
											<option value>Select a sector</option>
											<option value>Select a sector</option>
											<option value>Select a sector</option>
										</select>
									</label>
									<label htmlFor className="inp-select">
										<span className="label">What are you creating it for</span>
										<select name id>
											<option value>Select a sector</option>
											<option value>Select a sector</option>
											<option value>Select a sector</option>
										</select>
									</label>
								</div>
								<div className="uk-modal-footer uk-text-left">
									<button className="modal-actn-btn modal-accept-btn" type="button">
										Continue
									</button>
									<button className="uk-modal-close modal-cancel-btn modal-actn-btn" type="button">
										Cancel
									</button>
								</div>
							</div>
						</div>
						<a className="modal-n-modal-btn" href="/forms/all-templates/">
							<svg>
								<use xlinkHref="/uploads/icons.svg#existing-form" />
							</svg>
							<span>Use existing templates</span>
						</a>
					</div>
				</div>
			</div>
		);
	}
}
