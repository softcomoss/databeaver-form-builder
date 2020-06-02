import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ShortText from "../../components/preview_elements/Short-text-static";
import Multichoice from "../../components/preview_elements/Multi-choice-static";
import Rating from "../../components/preview_elements/Rating-static";
import FileUpload from "../../components/preview_elements/File-upload-static";
import SinglechoicePreview from "../../components/preview_elements/Single-choice-static";
import {
	addNewPage,
	deletePage,
	setActivePage,
	addSection,
	setActiveSection,
	deleteSection,
} from "../../redux/actions/form-action/form.actions";
import LongTextPreview from "../../components/preview_elements/Long-text-static";
import ImageCapture from "../../components/preview_elements/Image-capture-static";
import LocationMap from "../../components/preview_elements/Location-map-static";
import Agreement from "../../components/preview_elements/Agreement-static";
import Link from "../../components/preview_elements/Link-static";
import Biometric from "../../components/preview_elements/Biometric-static";
import DefaultText from "../../components/preview_elements/Default-text-static";
import Date from "../../components/preview_elements/Date-static";
import Time from "../../components/preview_elements/Time-static";
import Address from "../../components/preview_elements/Address-static";

const PreviewForm = (props) => {
	const { formdata, currentView, name } = props;
	const [view, setView] = useState("desktop");
	const [currentIndex, setCurrentIndex] = useState([]);

	useEffect(() => {
		let copyCurrentIndex = [];
		let allPages = [];
		formdata.map((page) => allPages.push(page.elements));
		let flatAllPages = allPages.flat();
		flatAllPages.map((elem) => {
			if (elem.type !== "defaultText") {
				copyCurrentIndex.push(elem.unique_id);
			}
		});
		setCurrentIndex(copyCurrentIndex);
	}, [currentView]);

	const renderPreview = () => {
		if (currentView.length > 0) {
			return currentView.map((element, i) => {
				if (element && element.type === "shortText") {
					return <ShortText elementDetails={element} index={currentIndex.indexOf(element.unique_id)} />;
				}
				if (element && element.type === "address") {
					return <Address elementDetails={element} index={currentIndex.indexOf(element.unique_id)} />;
				}
				if (element && element.type === "biometric") {
					return <Biometric elementDetails={element} index={currentIndex.indexOf(element.unique_id)} />;
				}
				if (element && element.type === "multiLine") {
					return (
						<LongTextPreview elementDetails={element} index={currentIndex.indexOf(element.unique_id)} />
					);
				}
				if (element && element.type === "imageCapture") {
					return (
						<ImageCapture elementDetails={element} index={currentIndex.indexOf(element.unique_id)} />
					);
				}
				if (element && element.type === "email") {
					return <ShortText elementDetails={element} index={currentIndex.indexOf(element.unique_id)} />;
				}
				if (element && element.type === "dateAndTime") {
					return <ShortText elementDetails={element} index={currentIndex.indexOf(element.unique_id)} />;
				}
				if (element && element.type === "date") {
					return <Date elementDetails={element} index={currentIndex.indexOf(element.unique_id)} />;
				}
				if (element && element.type === "time") {
					return <Time elementDetails={element} index={currentIndex.indexOf(element.unique_id)} />;
				}
				if (element && element.type === "rating") {
					return <Rating elementDetails={element} index={currentIndex.indexOf(element.unique_id)} />;
				}
				if (element && element.type === "phoneNumber") {
					return <ShortText elementDetails={element} index={currentIndex.indexOf(element.unique_id)} />;
				}
				if (element && element.type === "number") {
					return <ShortText elementDetails={element} index={currentIndex.indexOf(element.unique_id)} />;
				}
				if (element && element.type === "multiChoice") {
					return (
						<Multichoice elementDetails={element} index={currentIndex.indexOf(element.unique_id)} />
					);
				}

				if (element && element.type === "defaultText") {
					return (
						<DefaultText elementDetails={element} index={currentIndex.indexOf(element.unique_id)} />
					);
				}
				if (element && element.type === "singleChoice") {
					return (
						<SinglechoicePreview
							elementDetails={element}
							index={currentIndex.indexOf(element.unique_id)}
						/>
					);
				}
				if (element && element.type === "locationMap") {
					return (
						<LocationMap elementDetails={element} index={currentIndex.indexOf(element.unique_id)} />
					);
				}
				if (element && element.type === "areaMap") {
					return (
						<LocationMap elementDetails={element} index={currentIndex.indexOf(element.unique_id)} />
					);
				}
				if (element && element.type === "fileUpload") {
					return <FileUpload elementDetails={element} index={currentIndex.indexOf(element.unique_id)} />;
				}
				if (element && element.type === "links") {
					return <Link elementDetails={element} index={currentIndex.indexOf(element.unique_id)} />;
				}
				if (element && element.type === "agreement") {
					return <Agreement elementDetails={element} index={currentIndex.indexOf(element.unique_id)} />;
				}
			});
		} else {
			return null;
		}
	};

	return (
		<>
			<>
				<header style={{ zIndex: "-20" }} className="header">
					<div className="mx-auto maxwidth-tb gheader-wrapper gmain-wrapper uk-open">
						<h1>{name}</h1>
						<div className="header-pwrap"></div>
					</div>
				</header>
				<div className="main-bg not-padded maxwidth-xxl mx-auto">
					<div
						style={view === "mobile" ? { overflow: "hidden" } : { overflow: "auto" }}
						className="main-wrapper is-prev">
						<div className="uk-modal-body">
							<ul className="uk-subnav uk-subnav-pill prev-tab-nav" uk-switcher>
								<li aria-expanded="true" className={view === "mobile" ? "uk-active" : ""}>
									<a onClick={() => setView("mobile")}>
										<svg>
											<use xlinkHref="/uploads/icons.svg#mobile" />
										</svg>
									</a>
								</li>
								<li aria-expanded="false" className={view === "tablet" ? "uk-active" : ""}>
									<a onClick={() => setView("tablet")}>
										<svg>
											<use xlinkHref="/uploads/icons.svg#tab" />
										</svg>
									</a>
								</li>
								<li aria-expanded="false">
									<a onClick={() => setView("desktop")}>
										<svg className={view === "desktop" ? "uk-active" : ""}>
											<use xlinkHref="/uploads/icons.svg#laptop" />
										</svg>
									</a>
								</li>
							</ul>

							<ul className="uk-switcher uk-margin ">
								{view === "desktop" && (
									<li className="mx-auto maxwidth-tb mb-8 uk-active">
										<div className="mt-2 prev-input">
											<>{renderPreview()}</>
										</div>
									</li>
								)}
								{view === "tablet" && (
									<li className="mx-auto maxwidth-tb mb-8 uk-active">
										<div className="mt-2 prev-input">
											<>{renderPreview()}</>
										</div>
									</li>
								)}
							</ul>
							{view === "mobile" && (
								<div className="center-phone" style={{ marginTop: "7rem" }}>
									<div class="marvel-device iphone8 silver">
										<div class="top-bar"></div>
										<div class="sleep"></div>
										<div class="volume"></div>
										<div class="camera"></div>
										<div class="sensor"></div>
										<div class="speaker"></div>
										<div style={{ overflow: "auto" }} class="screen">
											{" "}
											<ul>
												<li className="mx-auto maxwidth-tb mb-8 uk-active">
													<div className="mt-2 prev-input">
														<>{renderPreview()}</>
													</div>
												</li>
											</ul>
										</div>
										<div class="home"></div>
										<div class="bottom-bar"></div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</>
		</>
	);
};

const mapStateToProps = (state) => ({
	name: state.formReducer.name,
	formdata: state.formReducer.formdata,
	activePage: state.formReducer.activePage,
	activeSection: state.formReducer.activeSection,
	currentView: state.formReducer.currentView,
});

export default connect(mapStateToProps, {
	addNewPage,
	deletePage,
	setActivePage,
	addSection,
	setActiveSection,
	deleteSection,
})(PreviewForm);
