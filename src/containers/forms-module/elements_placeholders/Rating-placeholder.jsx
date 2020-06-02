import React, { useState } from "react";
import { connect } from "react-redux";
import uid from "uid";
import { deleteElement, setActiveElement } from "../../../redux/actions/form-action/form.actions";
import { addRatingElement } from "../../../redux/actions/form-action/formControlActions";
import { showModal, closeModal } from "../../../utils/modal-control.utils";
import ChangeElementType from "../Change-element-type.container";
import {
	editElementLabel,
	addElementHint,
	toggleBooleanState,
	addMaximumCharacters,
	addMinimumCharacters,
	addMaximumRating,
	editRatingLabel,
	duplicateElement,
} from "../../../redux/actions/form-action/formPropertyActions";
import { nameShortner } from "../../../utils/card-name-shortener.utils";

var ratings = [];

const Rating = (props) => {
	const [settingsDisplay, toggleSettings] = useState(false);
	const {
		elementDetails,
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
		addMaximumRating,
		addRatingElement,
		editRatingLabel,
		duplicateElement,
		serialNumber,
	} = props;

	let elementLabel = "";
	let elementHint = "";
	let elementIsMandatory = false;
	let elementEnabled = true;
	let maxRating = 0;

	formData.map((page, i) => {
		if (page.label === activePage) {
			page.elements.map((element, i) => {
				if (element.unique_id === activeElement) {
					elementLabel = element.label;
					elementHint = element.hint;
					elementIsMandatory = element.isMandatory;
					elementEnabled = element.enabled;
					maxRating = element.ratings !== undefined ? element.ratings.length : 0;
					ratings = element.ratings;
				}
			});
		}
	});

	const onCloseModal = () => {
		closeModal(`#change-type-${elementDetails.unique_id}`);
	};

	const showRatingsLabel = () => {
		if (elementDetails.ratings !== undefined && elementDetails.ratings.length > 0) {
			return elementDetails.ratings.map((rating, i) => (
				<div className="input-wrapper m-2">
					<label htmlFor="max-char-num" className="form-inputs">
						<input
							onChange={(e) => {
								editRatingLabel(e.target.value, i);
							}}
							value={rating.label}
							type="text"
							id={`max-char-num${i}`}
							placeholder=" "
						/>
						<span className="label d-flx-alc">{`rating ${i}`}</span>
					</label>
				</div>
			));
		}
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
								<use xlinkHref="/uploads/icons.svg#ratings" />
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
												elementType={"rating"}
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
						<div className="flex-width-1-2 px-2">
							<div className="input-wrapper">
								<label htmlFor="placeholder-text" className="form-inputs">
									<input
										onChange={(e) => {
											addElementHint(e.target.value);
										}}
										value={elementDetails.hint}
										type="text"
										id="placeholder-text"
										placeholder=" "
									/>
									<span className="label d-flx-alc">Placeholder text</span>
								</label>
							</div>

							<div className="input-wrapper">
								<label htmlFor="max-char-num" className="form-inputs">
									<input
										onChange={(e) => {
											if (e.target.value <= 10) {
												addMaximumRating(e.target.value);
											}
										}}
										type="number"
										id="max-char-num"
										placeholder=" "
										value={maxRating > 0 ? maxRating : ""}
									/>
									<span className="label d-flx-alc">Maximum Range</span>
								</label>
							</div>
						</div>
						<div style={{ padding: "2rem" }}>{showRatingsLabel()}</div>

						<div className="flex-width-1-2 py-3 px-2">
							<div className="d-flx-alc-jsb ">
								<label className="input-check">
									<input
										className="uk-checkbox"
										type="checkbox"
										onClick={(e) => {
											toggleBooleanState(e.target.checked, "isMandatory", elementDetails.unique_id);
										}}
										checked={elementDetails.isMandatory}
									/>
									<span>Required</span>
									<svg
										uk-tooltip="title: check to make the question compulsory; delay: 100; pos: bottom-center"
										title
										aria-expanded="false">
										<use xlinkHref="/uploads/icons.svg#tooltip" />
									</svg>
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
					</div>
				</div>

				<div className="preview-container">
					<span className="index-no">{serialNumber + 1}</span>
					<div className="mb-2-nlc-noc-child formbuilder-prev-inpts overf-scroll">
						<span
							className="label uk-text-truncate"
							data-uk-tooltip={`title: ${elementDetails.label}; pos: bottom-left`}>
							{elementDetails.isMandatory && <span className="required">*</span>}
							{nameShortner(elementDetails.label, 30)}.{" "}
						</span>
						<div className="ratings">
							{maxRating > 0 ? (
								elementDetails.ratings.map((rating, i) => {
									return (
										<div key={i} style={{ padding: "1rem" }}>
											<input
												disabled
												className
												type="radio"
												name={`question${i + 1}`}
												id={`opt${i + 1}`}
											/>
											<label htmlFor={`opt${i + 1}`}>{rating.label}</label>
										</div>
									);
								})
							) : (
								<>
									<div>
										<input className type="radio" name={`question`} id={`opt1`} />
										<label htmlFor={`opt1`}>{""}</label>
									</div>
									<div>
										<input className type="radio" name={`question`} id={`opt2`} />
										<label htmlFor={`opt2`}>{""}</label>
									</div>
									<div>
										<input className type="radio" name={`question`} id={`opt3`} />
										<label htmlFor={`opt3`}>{""}</label>
									</div>
									<div>
										<input className type="radio" name={`question`} id={`opt4`} />
										<label htmlFor={`opt4`}>{""}</label>
									</div>
								</>
							)}
						</div>
					</div>
				</div>
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
	addRatingElement,
	setActiveElement,
	editElementLabel,
	addElementHint,
	toggleBooleanState,
	addMinimumCharacters,
	addMaximumCharacters,
	addMaximumRating,
	editRatingLabel,
	duplicateElement,
})(Rating);
