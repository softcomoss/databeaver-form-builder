import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import uid from "uid";
import { deleteElement, setActiveElement } from "../../../redux/actions/form-action/form.actions";
import {
	addElement,
	addMultichoiceElement,
} from "../../../redux/actions/form-action/formControlActions";
import { showModal, closeModal } from "../../../utils/modal-control.utils";
import ChangeElementType from "../Change-element-type.container";
import {
	editElementLabel,
	addElementHint,
	toggleBooleanState,
	addMaximumCharacters,
	addMinimumCharacters,
	addMultiChoiceOption,
	deleteMultichoiceOption,
	toggleWithPhoto,
	duplicateElement,
} from "../../../redux/actions/form-action/formPropertyActions";
import FormLogic from "../Form-logic.container";
import "antd/dist/antd.css";
import { Upload, message, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { nameShortner } from "../../../utils/card-name-shortener.utils";
import { baseURL } from "../../../utils/base-url-switch.utils";

const SingleChoice = (props) => {
	const [settingsDisplay, toggleSettings] = useState(false);
	const [uploading, setUploading] = useState(false);
	const [optionUrl, setOptionUrl] = useState("");
	const [optionLabel, setOptionLabel] = useState("");
	const {
		elementDetails,
		addMultichoiceElement,
		deleteElement,
		addElement,
		setActiveElement,
		activeElement,
		index,
		editElementLabel,
		formData,
		activePage,
		addElementHint,
		toggleBooleanState,
		addMaximumCharacters,
		addMinimumCharacters,
		addMultiChoiceOption,
		deleteMultichoiceOption,
		toggleWithPhoto,
		duplicateElement,
		serialNumber,
	} = props;

	let elementLabel = "";
	let elementHint = "";
	let elementIsMandatory = false;
	let elementEnabled = true;
	let optionsWithPhoto = false;
	let allPages = [];
	let options = [];
	let logic = {};
	formData.map((page, i) => {
		allPages.push(page.elements);
		if (page.label === activePage) {
			page.elements.map((element, i) => {
				if (element.unique_id === activeElement) {
					elementLabel = element.label;
					elementHint = element.hint;
					elementIsMandatory = element.isMandatory;
					elementEnabled = element.enabled;
					optionsWithPhoto = element.withPhoto;
					options = element.options;
					logic = element.logics;
				}
			});
		}
	});

	const uploadImage = (photo) => {
		setUploading(true);
		const data = new FormData();
		data.append("files", photo);
		data.append("folder", "admin-profile");
		const config = { headers: { "Content-Type": "multipart/form-data" } };
		axios
			.post(`/files`, data, config)
			.then((response) => {
				if (response.data !== undefined && response.data.success === true) {
					setOptionUrl(response.data.data[0]);
				}
				setUploading(false);
			})
			.catch((error) => {
				setUploading(false);
				console.log(error);
			});
	};

	const enterButton = (event, callback) => {
		if (event.keyCode === 13) {
			if (optionLabel.length > 0) {
				addMultiChoiceOption(optionsWithPhoto, optionLabel, optionUrl);
				callback();
			}
		}
	};

	const addOption = () => {
		if (optionLabel.length > 0 && optionLabel.trim() !== "" && optionsWithPhoto === false) {
			addMultiChoiceOption(optionsWithPhoto, optionLabel, optionUrl);
			setOptionLabel("");
			setOptionUrl("");
		}
		if (
			optionsWithPhoto === true &&
			optionUrl.length > 0 &&
			optionLabel.trim() !== "" &&
			optionLabel.length > 0
		) {
			addMultiChoiceOption(optionsWithPhoto, optionLabel, optionUrl);
			setOptionLabel("");
			setOptionUrl("");
		}
	};

	const token = JSON.parse(window.localStorage.getItem("__beav")).token;
	const upload = {
		name: "files",
		accept: "image/*",
		showUploadList: false,
		action: `${baseURL}/files`,
		headers: {
			authorization: `Bearer ${token}`,
		},
		data: { folder: "admin-profile" },
		onChange(info) {
			if (info.file.status === "done") {
				setOptionUrl(info.file.response.data[0]);
				message.success(`${info.file.name} file uploaded successfully`);
			} else if (info.file.status === "error") {
				message.error(`${info.file.name} file upload failed.`);
			}
		},
	};

	const onCloseModal = () => {
		closeModal(`#change-type-${elementDetails.unique_id}`);
	};

	return (
		<>
			<div
				onClick={() => {
					setActiveElement(elementDetails.unique_id);
				}}
				className="d-flx-alc-fw form-components">
				<div
					className={activeElement === elementDetails.unique_id ? "form-input is-active" : "form-input"}>
					<div className="d-flx-alc-jsb width-100-pc px-2">
						<div className="d-flx-alc-fw py-2 width-100-pc uk-animation-slide-left">
							<svg className="wh-25">
								<use xlinkHref="/uploads/icons.svg#single-option" />
							</svg>
							<input
								onChange={(e) => {
									editElementLabel(e.target.value);
								}}
								value={elementDetails.label}
								className="question"
								type="text"
								placeholder="Type Question Here..."
							/>
						</div>
						<div className="action-btn-wrapper d-flx-alc">
							<button
								onClick={(e) => {
									toggleBooleanState(
										!elementDetails.isMandatory,
										"isMandatory",
										elementDetails.unique_id
									);
								}}
								className="d-flx-alc-jc required-btn"
								uk-tooltip="title: Click to make the question compulsory; delay: 100; pos: bottom-center"
								title
								aria-expanded="false">
								<svg style={elementDetails.isMandatory ? { color: "#0081c2" } : { color: "#666" }}>
									<use xlinkHref="/uploads/icons.svg#required" />
								</svg>
							</button>
							<button
								onClick={() => {
									toggleSettings(!settingsDisplay);
								}}
								className="d-flx-alc-jc settings-btn">
								<svg>
									<use xlinkHref="/uploads/icons.svg#settings" />
								</svg>
							</button>
							<div className="uk-inline">
								<button className="d-flx-alc-jc" type="button">
									<svg>
										<use xlinkHref="/uploads/icons.svg#more-hor" />
									</svg>
								</button>
								<div uk-dropdown="mode: click" className="drop-wrapper px-1h uk-dropdown">
									<ul className="drop-lists none my-0">
										<li className="drop-list-item">
											<button
												type="button"
												onClick={() => duplicateElement(elementDetails, index, activePage)}>
												Duplicate
											</button>
										</li>
										<li className="drop-list-item">
											<button
												type="button"
												onClick={() => showModal(`#change-type-${elementDetails.unique_id}`)}>
												Change type
											</button>
										</li>
										<li>
											<a
												onClick={() => {
													deleteElement(elementDetails.unique_id, elementDetails.pos);
												}}
												className="co-warning drop-del">
												Delete
											</a>
										</li>
									</ul>
									<div id={`change-type-${elementDetails.unique_id}`} data-uk-modal className="uk-modal">
										<div className="uk-modal-dialog uk-margin-auto-vertical border-radius">
											<ChangeElementType
												closeModal={onCloseModal}
												elementType={"singleChoice"}
												index={index}
												activePage={activePage}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div
						className={
							settingsDisplay
								? "input-dtls border-top py-2 uk-animation-slide-bottom-medium active"
								: "input-dtls uk-animation-slide-bottom-medium border-top py-2"
						}>
						{elementDetails.options !== undefined && elementDetails.options.length > 0
							? elementDetails.options.map((option, i) => {
									return (
										<label key={i} className="input-check px-2">
											<input disabled className="uk-radio" type="radio" />
											<span>{option.label}</span>
											<small
												onClick={() => {
													deleteMultichoiceOption(i);
												}}
												style={{ color: "red" }}>
												delete option
											</small>
										</label>
									);
							  })
							: ""}

						{elementDetails.other && (
							<div className="input-wrapper width-50-pc px-2">
								<label htmlFor="min-char-num" className="form-inputs">
									<input type="text" id="min-char-num" placeholder=" " disabled />
									<span className="label d-flx-alc">Other</span>
								</label>
							</div>
						)}

						<div className="flex-width-1-2 px-2 add-option">
							<div className="input-wrapper">
								<label htmlFor="min-char-num" className="form-inputs">
									<input
										onChange={(e) => {
											setOptionLabel(e.target.value);
										}}
										value={optionLabel}
										type="text"
										id="min-char-num"
										placeholder=" "
										onKeyDown={(e) => {
											if (e.keyCode === 13 || e.which === 13) {
												enterButton(e, () => {
													setOptionLabel("");
												});
											}
										}}
									/>
									<span className="label d-flx-alc">Enter Option</span>
								</label>
							</div>
							{optionsWithPhoto && (
								<label className="upload-btn btn btn-null-fill" htmlFor="upload-prefill">
									<Upload {...upload}>
										<Button>
											<UploadOutlined onChange={(e) => console.log("file", e.file, e.fileList)} />
										</Button>
									</Upload>
								</label>
							)}
							<button
								onClick={() => {
									addOption();
								}}
								className="btn btn-fill add-option-button mt-2">
								Add
							</button>
						</div>
						<span
							onClick={() => {
								toggleBooleanState(!elementDetails.other, "other", elementDetails.unique_id);
							}}
							style={{ cursor: "pointer", color: "#0881c2" }}
							className="px-2">
							{!elementDetails.other ? "-Add Other" : "Remove other"}
						</span>
						<div className="flex-width-1-2 py-3 px-2">
							<div className="d-flx-alc-jsb ">
								<label className="input-check">
									<input
										onClick={(e) => {
											toggleBooleanState(e.target.checked, "isMandatory", elementDetails.unique_id);
										}}
										className="uk-checkbox"
										type="checkbox"
										checked={elementDetails.isMandatory}
									/>
									<span>Required</span>
								</label>
								<label className="input-check">
									<input
										className="uk-checkbox"
										type="checkbox"
										onClick={(e) => {
											toggleBooleanState(e.target.checked, "enabled", elementDetails.unique_id);
										}}
										checked={elementDetails.enabled}
									/>
									<span>Enabled</span>
								</label>

								<label className="input-check">
									<input
										onClick={() => toggleWithPhoto()}
										className="uk-checkbox"
										type="checkbox"
										checked={elementDetails.withPhoto}
									/>
									<span>With Photo</span>
								</label>
								<label className="input-check">
									<input
										className="uk-checkbox"
										type="checkbox"
										onClick={(e) => {
											toggleBooleanState(e.target.checked, "hidden", elementDetails.unique_id);
										}}
										checked={elementDetails.hidden}
									/>
									<span>Hidden</span>
								</label>
							</div>
						</div>
						{/* form logic */}
						<FormLogic allPages={allPages} elementDetails={{ elementDetails }} logics={logic} />
					</div>
				</div>
				{elementDetails.withPhoto === false && (
					<div className="preview-container">
						<div className="width-100-pc d-flx prev-question">
							<span className="index-no">{serialNumber + 1}</span>
							<div className="mb-2-nlc-noc-child formbuilder-prev-inpts">
								<span
									className="label uk-text-truncate"
									data-uk-tooltip={`title: ${elementDetails.label}; pos: bottom-left`}>
									{elementDetails.isMandatory && <span className="required">*</span>}
									{nameShortner(elementDetails.label, 30)}.{" "}
								</span>
								{elementDetails.options !== undefined && elementDetails.options.length > 0
									? elementDetails.options.map((option, i) => {
											return (
												<label key={i} className="input-check p-2">
													<input className="uk-radio" type="radio" />
													<span>{option.label}</span>
												</label>
											);
									  })
									: ""}
								{elementDetails.other && (
									<div className="input-wrapper width-100-pc px-2">
										<label htmlFor="min-char-num" className="form-inputs">
											<input type="text" id="min-char-num" placeholder=" " disabled />
											<span className="label d-flx-alc">Other</span>
										</label>
									</div>
								)}
							</div>
						</div>
					</div>
				)}

				{elementDetails.withPhoto === true && (
					<div className="preview-container">
						<div className="formbuilder-prev-inpts">
							<span className="label mb-1 d-blk">
								{serialNumber + 1}. {nameShortner(elementDetails.label, 30)}{" "}
								{elementDetails.isMandatory && <span className="required">*</span>}{" "}
								<span className="required"></span>
							</span>

							<div className="flex-width-1-3-wg">
								{elementDetails.options !== undefined &&
								elementDetails.options.length > 0 &&
								elementDetails.withPhoto === true
									? elementDetails.options.map((option, i) => {
											return (
												<>
													<label htmlFor={`check-opt${i}`} className="input-radio">
														<img height={100} width={100} src={option.url} alt="" />
														<input
															type="radio"
															className="uk-radio"
															id={`check-opt${i}`}
															name="quest1"
															disabled
														/>
													</label>
												</>
											);
									  })
									: ""}
							</div>
							{elementDetails.other && (
								<div className="input-wrapper width-50-pc px-2">
									<label htmlFor="min-char-num" className="form-inputs">
										<input type="text" id="min-char-num" placeholder=" " disabled />
										<span className="label d-flx-alc">Other</span>
									</label>
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</>
	);
};

const mapStateToProps = (state) => ({
	activeElement: state.formReducer.activeElement,
	formData: state.formReducer.formdata,
	elements: state.formReducer,
	activePage: state.formReducer.activePage,
	activeSection: state.formReducer.activeSection,
	currentView: state.formReducer.currentView,
	activeElement: state.formReducer.activeElement,
});

export default connect(mapStateToProps, {
	deleteElement,
	addMultichoiceElement,
	setActiveElement,
	editElementLabel,
	addElementHint,
	toggleBooleanState,
	addMinimumCharacters,
	addMaximumCharacters,
	addMultiChoiceOption,
	deleteMultichoiceOption,
	toggleWithPhoto,
	duplicateElement,
})(SingleChoice);
