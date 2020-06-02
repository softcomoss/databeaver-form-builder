import React, { useState, useEffect } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { showModal, closeModal } from "../../utils/modal-control.utils";
import {
	editFormName,
	deleteForm,
	duplicateForm,
	getSingleForm,
	addQuickDispatchName,
	addQuickProjectName,
	addQuickExpectedNumberOfEntries,
	addQuickDispatchStartDate,
	addQuickDispatchDueDate,
	sendQuickDispatch,
} from "../../redux/actions/form-action/form.actions";
import { getAllProjects } from "../../redux/actions/projects-actions/project.actions";
import { getFormDetailsToEdit } from "../../redux/actions/form-action/formPropertyActions";
import DeleteForm from "./Delete-form.container";
import SingleForm from "../../pages/form/Single-form.page";
import { appURL } from "../../utils/base-url-switch.utils";

const FormCard = (props) => {
	const {
		formDetails,
		editFormName,
		deleteForm,
		selectFormToUpdate,
		getFormDetailsToEdit,
		fetchedFormSuccessfully,
		history,
		getSingleForm,
		preview,
		getAllForms,
		duplicateForm,
		loading,
		activeForm,
		getAllProjects,
		addQuickDispatchName,
		addQuickProjectName,
		addQuickExpectedNumberOfEntries,
		addQuickDispatchStartDate,
		addQuickDispatchDueDate,
		sendQuickDispatch,
		allProjects,
	} = props;
	const [newFormName, setNewFormName] = useState("");
	const [selectedForm, setSelectedForm] = useState({});
	const [copySuccess, setCopySuccess] = useState("");
	const [addNewProject, setAddNewProject] = useState(false);
	const [permissions, setPermissions] = useState([]);
	// const [formToUpdate, setFormToUpdate] = useState({});

	useEffect(() => {
		if (fetchedFormSuccessfully === true) {
			setTimeout(() => {
				closeModal("#edit-form");
			}, 200);
			props.history.replace("/form-builder");
		}
		getAllProjects(1, () => null);
		let fetchedPermissions = JSON.parse(sessionStorage.getItem("__beaver__perms"));
		if (fetchedPermissions !== null) {
			setPermissions(fetchedPermissions);
		}
	}, []);

	const formRenameCallback = () => {
		setTimeout(() => {
			window.location.replace("/createform");
		}, 200);
	};

	const editOnFormBuilder = () => {
		closeModal("#edit-form");
		history.push("/form-builder");
	};

	const copyToClipboard = (e) => {
		document.execCommand("copy");
		e.target.focus();
		setCopySuccess("Copied");
	};

	const onSubmitQuickDispatch = () => {
		const { addGeneratedLink, quickDispatch, link } = props;
		let dispatchDetails = {
			name: quickDispatch.name,
			dueDate: quickDispatch.dueDate,
			form: quickDispatch.form,
			totalExpectedEntries: quickDispatch.totalExpectedEntries,
		};

		if (addNewProject === true) {
			dispatchDetails.projectName = quickDispatch.project;
		} else {
			dispatchDetails.projectId = quickDispatch.project;
		}
		sendQuickDispatch(dispatchDetails, () => {
			showModal("#link-generated");
		});
	};

	const changeFormName = () => {
		if (activeForm.name !== newFormName && newFormName !== "") {
			editFormName(activeForm._id, newFormName, () => {
				closeModal("#rename-form");
				formRenameCallback();
			});
		} else {
			toast.error("Form already have this name");
		}
	};

	return (
		<>
			<li className="card-list-item card-deco">
				<a
					onClick={() => {
						if (permissions.includes("Forms_View_Form")) {
							console.log("form details", formDetails);
							setSelectedForm(formDetails);
							showModal(`#preview${formDetails._id}`);
						}
					}}
					className="card j-c-sb">
					<p className="top-info">Created {moment(formDetails.createdAt).fromNow()}</p>
					<h3
						uk-tooltip={`title: ${formDetails.name}; pos: bottom`}
						className="card-title capitalize uk-text-truncate">
						{formDetails.name}
					</h3>
					<p className="bottom-info">
						Modified {moment(formDetails.updatedAt).fromNow()} by {formDetails.createdBy.firstName}{" "}
						{formDetails.createdBy.lastName}
					</p>
				</a>

				{/* single form preview */}
				<div id={`preview${formDetails._id}`} className="uk-modal-full preview-modal" data-uk-modal>
					<div className="uk-modal-dialog">
						<SingleForm selectedForm={selectedForm} formId={formDetails._id} />
					</div>
				</div>
				{/* end single form preview */}
				<div className="border-top card-footer tx-r">
					<div className="uk-inline ">
						<button
							onClick={() => {
								{
									getFormDetailsToEdit(formDetails._id, null);
								}
							}}
							style={{ zIndex: "1 !important" }}
							className="d-flx-alc-jsc btn-icon"
							type="button">
							<svg>
								<use xlinkHref="/uploads/icons.svg#more" />
							</svg>
						</button>
						<div data-uk-dropdown="mode: click" className="drop-wrapper px-1h my-0">
							<div className="drop-list-group">
								<a
									className={
										formDetails.dispatched === true || permissions.includes("Forms_Edit_Form") === false
											? "disabled"
											: ""
									}
									onClick={() => {
										showModal("#edit-form");
									}}>
									Edit
								</a>
								<a
									className={permissions.includes("Dispatches_Create_Dispatch") ? "" : "disabled"}
									href="#"
									onClick={() => showModal(`#generate-link-${formDetails.unique_id}`)}>
									Generate link
								</a>
								<a
									href="#"
									className={permissions.includes("Forms_View_Form") ? "" : "disabled"}
									onClick={() => {
										setSelectedForm(formDetails);
										showModal("#preview");
									}}>
									Preview
								</a>
							</div>
							<div className="drop-list-group">
								<a
									className={
										formDetails.dispatched === true || permissions.includes("Forms_Edit_Form") === false
											? "disabled"
											: ""
									}
									href="#"
									onClick={() => {
										showModal("#rename-form");
									}}>
									rename
								</a>
								<div id="rename-form" data-uk-modal>
									<div className="uk-modal-dialog uk-margin-auto-vertical border-radius">
										<button className="uk-modal-close-default" type="button" data-uk-close />
										<h2 className="uk-modal-title"> Rename form</h2>
										<div className="uk-modal-body">
											<label htmlFor={activeForm._id} className="form-inputs">
												<input
													onChange={(e) => {
														setNewFormName(e.target.value);
													}}
													defaultValue={activeForm.name}
													type="text"
													id={activeForm._id}
													placeholder=" "
												/>
												<span className="label">Form name</span>
											</label>
										</div>
										<div className="uk-modal-footer uk-text-left">
											<button
												onClick={() => {
													changeFormName();
												}}
												className="modal-actn-btn modal-accept-btn"
												type="button">
												Save
											</button>
											<button className="uk-modal-close modal-cancel-btn modal-actn-btn" type="button">
												Cancel
											</button>
										</div>
									</div>
								</div>
								<a
									href="#"
									className={permissions.includes("Forms_Create_Form") === false ? "disabled" : ""}
									onClick={() => {
										showModal("#duplicate-form");
									}}>
									Duplicate
								</a>
							</div>
							<a
								href="#"
								onClick={() => {
									showModal(`#delete-form-${formDetails._id}`);
									selectFormToUpdate(formDetails);
								}}
								className={
									permissions.includes("Forms_Delete_Form")
										? "co-warning drop-del"
										: "co-warning drop-del disabled"
								}>
								delete
							</a>
							{/* delete form modal*/}
							<div id={`delete-form-${formDetails._id}`} data-uk-modal>
								<div className="uk-modal-dialog uk-margin-auto-vertical border-radius">
									<button className="uk-modal-close-default" type="button" data-uk-close />
									<h2 className="uk-modal-title"> Are you sure?</h2>
									<div className="uk-modal-body">
										<p>
											You’re about to <span className="co-warning">permanently delete</span> this form,
											are you sure you want to do that?
										</p>
									</div>
									<div className="uk-modal-footer uk-text-left">
										<button
											onClick={() => deleteForm(activeForm._id)}
											className="modal-actn-btn bg-warning co-white"
											type="button">
											{loading ? "Deleting..." : `Yes,delete`}
										</button>
										<button className="uk-modal-close modal-cancel-btn modal-actn-btn" type="button">
											No,cancel
										</button>
									</div>
								</div>
							</div>
							{/* delete form modal*/}

							{/* duplicate form modal*/}
							<div id="duplicate-form" data-uk-modal>
								<div className="uk-modal-dialog uk-margin-auto-vertical border-radius">
									<button className="uk-modal-close-default" type="button" data-uk-close />
									<h2 className="uk-modal-title">
										{" "}
										Are you sure you want to duplicate {activeForm.name} ?
									</h2>

									<div className="uk-modal-footer uk-text-left">
										<button
											onClick={() => duplicateForm(activeForm._id)}
											className="modal-actn-btn bg-warning co-white"
											type="button"
											style={{ backgroundColor: "#0a71a5" }}>
											{loading ? "Loading..." : `Yes,duplicate`}
										</button>
										<button className="uk-modal-close modal-cancel-btn modal-actn-btn" type="button">
											No,cancel
										</button>
									</div>
								</div>
							</div>
							{/* duplicate form modal*/}

							{/* New form Name for Edit */}
							<div id="edit-form" data-uk-modal>
								<div className="uk-modal-dialog uk-margin-auto-vertical border-radius">
									<button className="uk-modal-close-default" type="button" data-uk-close />
									<h2 className="uk-modal-title"> Edit Form </h2>
									<div className="uk-modal-body">
										<p>
											You’re about to <span className="co-warning">edit</span> {formDetails.name}, are
											you sure you want to do that?
										</p>
									</div>
									<div className="uk-modal-footer uk-text-left">
										<button
											onClick={() => {
												editOnFormBuilder();
												closeModal("#edit-form");
											}}
											className="modal-actn-btn modal-accept-btn"
											type="button">
											Yes, Edit
										</button>

										<button className="uk-modal-close modal-cancel-btn modal-actn-btn" type="button">
											Cancel
										</button>
									</div>
								</div>
							</div>
							{/* End New form Name for Edit */}
						</div>
					</div>
				</div>
				{/* start generate link modal */}
				<div id={`generate-link-${formDetails.unique_id}`} data-uk-modal className="uk-modal">
					<div className="uk-modal-dialog uk-margin-auto-vertical border-radius">
						<button className="uk-modal-close-default uk-close uk-icon" type="button" uk-close>
							<svg width={14} height={14} viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
								<line fill="none" stroke="#000" strokeWidth="1.1" x1={1} y1={1} x2={13} y2={13} />
								<line fill="none" stroke="#000" strokeWidth="1.1" x1={13} y1={1} x2={1} y2={13} />
							</svg>
						</button>
						<h2 className="uk-modal-title"> Generate link</h2>
						<div className="uk-modal-body">
							<div className="input-wrapper" style={{ marginBottom: "1rem" }}>
								{addNewProject === true ? (
									<label htmlFor="project-name" className="form-inputs">
										<input
											onChange={(e) => addQuickProjectName(e.target.value)}
											type="text"
											id="project-name"
											placeholder=" "
										/>
										<span className="label">Project name</span>
									</label>
								) : (
									<>
										<label className="label">Select Project</label>
										<select onChange={(e) => addQuickProjectName(e.target.value)} class="uk-select">
											<option value="">select a project</option>
											{allProjects.projects !== undefined && allProjects.projects.length > 0 ? (
												allProjects.projects.map((project, i) => {
													return (
														<>
															<option key={i} value={project._id}>
																{project.name}
															</option>
														</>
													);
												})
											) : (
												<option value="">No Project created</option>
											)}
										</select>
									</>
								)}
							</div>
							<button
								style={{ backgroundColor: "#0081c2", borderRadius: "4px" }}
								className="uk-button uk-button-primary uk-button-small"
								onClick={() => setAddNewProject(!addNewProject)}
								type="button">
								{!addNewProject ? "New project" : "Existing project"}
							</button>
							<div className="input-wrapper">
								<label htmlFor="dispatch-name" className="form-inputs">
									<input
										onChange={(e) => addQuickDispatchName(e.target.value)}
										type="text"
										id="dispatch-name"
										placeholder=" "
									/>
									<span className="label">Dispatch name</span>
								</label>
							</div>
							<div className="input-wrapper">
								<label htmlFor="entries-to-collect" className="form-inputs">
									<input
										onChange={(e) => addQuickExpectedNumberOfEntries(e.target.value)}
										type="number"
										id="entries-to-collect"
										placeholder=" "
									/>
									<span className="label">Total number of entries to collect</span>
								</label>
							</div>
						</div>
						<div className="uk-modal-footer uk-text-left">
							<button
								onClick={() => showModal("#pick-date")}
								className="modal-actn-btn modal-accept-btn"
								type="button">
								Next
							</button>
						</div>
					</div>
				</div>
				{/* End generate link modal */}
				{/* start pick date modal */}
				<div id="pick-date" data-uk-modal className="uk-modal">
					<div className="uk-modal-dialog uk-margin-auto-vertical border-radius">
						<button className="uk-modal-close-default uk-close uk-icon" type="button" uk-close>
							<svg width={14} height={14} viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
								<line fill="none" stroke="#000" strokeWidth="1.1" x1={1} y1={1} x2={13} y2={13} />
								<line fill="none" stroke="#000" strokeWidth="1.1" x1={13} y1={1} x2={1} y2={13} />
							</svg>
						</button>
						<h2 className="uk-modal-title"> Generate link</h2>
						<div className="uk-modal-body">
							<div className="input-wrapper">
								<label htmlFor="dispatch-name" className="form-inputs">
									<input
										onChange={(e) => addQuickDispatchDueDate(e.target.value)}
										type="date"
										id="dispatch-name"
										placeholder=" "
									/>
									<span className="label">End Date</span>
								</label>
							</div>
						</div>
						<div className="uk-modal-footer uk-text-left">
							<button
								onClick={() => onSubmitQuickDispatch()}
								className="modal-actn-btn modal-accept-btn"
								type="button">
								Generate Link
							</button>

							<div id="link-generated" data-uk-modal className="uk-modal">
								<div className="uk-modal-dialog uk-margin-auto-vertical border-radius">
									<button className="uk-modal-close-default uk-close uk-icon" type="button" uk-close>
										<svg width={14} height={14} viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
											<line fill="none" stroke="#000" strokeWidth="1.1" x1={1} y1={1} x2={13} y2={13} />
											<line fill="none" stroke="#000" strokeWidth="1.1" x1={13} y1={1} x2={1} y2={13} />
										</svg>
									</button>
									<h2 className="uk-modal-title">Link Generated</h2>
									<div className="uk-modal-body">
										<label htmlFor="link-name" className="form-inputs">
											<input
												type="text"
												id="link-name"
												placeholder=" "
												value={`${appURL}generated-form/${props.link}`}
											/>
											<span className="label">Link</span>
											<button style={{ zIndex: 3100 }} className="copy-btn">
												<svg>
													<use xlinkHref="/uploads/icons.svg#copy" />
												</svg>
											</button>
										</label>
										{copySuccess}
									</div>
									<div className="uk-modal-footer uk-text-left">
										<p className="microtext co-faint-gray fw-bold">Share via</p>
										<div className="social-media-btn-wrapper">
											<button>
												<svg>
													<use xlinkHref="/uploads/icons.svg#twitter" />
												</svg>
											</button>
											<button>
												<svg>
													<use xlinkHref="/uploads/icons.svg#fcbk" />
												</svg>
											</button>
											<button>
												<svg>
													<use xlinkHref="/uploads/icons.svg#lnkd" />
												</svg>
											</button>
											<button>
												<svg>
													<use xlinkHref="/uploads/icons.svg#message" />
												</svg>
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* end pick date modal */}
			</li>
		</>
	);
};

const mapStateToProps = (state) => ({
	fetchedFormSuccessfully: state.formReducer.fetchedFormToEdit,
	link: state.formReducer.generatedLink,
	formData: state.formReducer.formdata,
	loading: state.formReducer.loading,
	preview: state.formReducer.formPreview,
	activeForm: state.formReducer.activeForm,
	quickDispatch: state.formReducer.quickDispatch,
	allProjects: state.projects.allProjects,
});

export default connect(mapStateToProps, {
	editFormName,
	deleteForm,
	duplicateForm,
	getSingleForm,
	getFormDetailsToEdit,
	addQuickDispatchName,
	addQuickProjectName,
	addQuickExpectedNumberOfEntries,
	addQuickDispatchStartDate,
	addQuickDispatchDueDate,
	sendQuickDispatch,
	getAllProjects,
})(FormCard);
