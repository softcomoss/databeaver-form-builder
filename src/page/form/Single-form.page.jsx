import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getSingleForm } from "../../redux/actions/form-action/form.actions";
import PageLoader from "../../components/loaders/Page-loader.component";
import ShortText from "../../components/preview_elements/Short-text-static";
import LongTextPreview from "../../components/preview_elements/Long-text-static";
import Rating from "../../components/preview_elements/Rating-static";
import Multichoice from "../../components/preview_elements/Multi-choice-static";
import SinglechoicePreview from "../../components/preview_elements/Single-choice-static";
import FileUpload from "../../components/preview_elements/File-upload-static";
import Date from "../../components/preview_elements/Date-static";
import Address from "../../components/preview_elements/Address-static";
import Time from "../../components/preview_elements/Time-static";

const SingleForm = (props) => {
	const { loading, preview, details, getSingleForm, selectedForm, currentForm } = props;
	const [currentIndex, setCurrentIndex] = useState([]);

	useEffect(() => {
		getSingleForm(selectedForm._id);
	}, [selectedForm]);

	useEffect(() => {
		let copyCurrentIndex = [];
		let allPages = [];
		if (preview.formData) {
			preview.formData.map((page) => allPages.push(page.elements));
			let flatAllPages = allPages.flat();
			flatAllPages.map((elem) => {
				if (elem.type !== "defaultText") {
					copyCurrentIndex.push(elem.unique_id);
				}
			});
			setCurrentIndex(copyCurrentIndex);
		}
	}, [preview]);

	const renderElements = () => {
		if (preview.formData.length > 0) {
			return preview.formData.map((page, i) => (
				<span key={i}>
					<h3 className="mt-2">{`Page ${i + 1}`}</h3>
					<hr />
					{page.elements.length > 0 ? (
						page.elements.map((element, i) => {
							if (element.type === "shortText") {
								return (
									<ShortText elementDetails={element} index={currentIndex.indexOf(element.unique_id)} />
								);
							}
							if (element.type === "multiLine") {
								return (
									<LongTextPreview
										elementDetails={element}
										index={currentIndex.indexOf(element.unique_id)}
									/>
								);
							}
							if (element.type === "time") {
								return <Time elementDetails={element} index={currentIndex.indexOf(element.unique_id)} />;
							}
							if (element.type === "address") {
								return (
									<Address elementDetails={element} index={currentIndex.indexOf(element.unique_id)} />
								);
							}
							if (element.type === "date") {
								return <Date elementDetails={element} index={currentIndex.indexOf(element.unique_id)} />;
							}
							if (element.type === "email") {
								return (
									<ShortText elementDetails={element} index={currentIndex.indexOf(element.unique_id)} />
								);
							}
							if (element.type === "dateAndTime") {
								return (
									<ShortText elementDetails={element} index={currentIndex.indexOf(element.unique_id)} />
								);
							}
							if (element.type === "rating") {
								return (
									<Rating elementDetails={element} index={currentIndex.indexOf(element.unique_id)} />
								);
							}
							if (element.type === "phoneNumber") {
								return (
									<ShortText elementDetails={element} index={currentIndex.indexOf(element.unique_id)} />
								);
							}
							if (element.type === "numbers") {
								return (
									<ShortText elementDetails={element} index={currentIndex.indexOf(element.unique_id)} />
								);
							}
							if (element.type === "multiChoice") {
								return (
									<Multichoice
										elementDetails={element}
										index={currentIndex.indexOf(element.unique_id)}
									/>
								);
							}

							if (element.type === "singleChoice") {
								return (
									<SinglechoicePreview
										elementDetails={element}
										index={currentIndex.indexOf(element.unique_id)}
									/>
								);
							}
							if (element.type === "locationMap") {
								return (
									<ShortText elementDetails={element} index={currentIndex.indexOf(element.unique_id)} />
								);
							}
							if (element.type === "fileUpload") {
								return (
									<FileUpload elementDetails={element} index={currentIndex.indexOf(element.unique_id)} />
								);
							}
						})
					) : (
						<h3>No Element on this page</h3>
					)}
				</span>
			));
		} else {
			return <h3>No Element on this page</h3>;
		}
	};

	return (
		<>
			<>
				<header style={{ zIndex: "-20" }} className="header">
					<button
						className="uk-modal-close-full uk-close-large uk-close uk-icon"
						type="button"
						data-uk-close
						style={{ backgroundColor: "#0881c2", margin: "1rem", color: "#ffffff" }}></button>
					<div className="mx-auto maxwidth-tb gheader-wrapper gmain-wrapper">
						<h1>{preview.name}</h1>
						<div className="header-pwrap"></div>
					</div>
				</header>
				<main className="main" id="mainContent">
					<div className="main-bg not-padded maxwidth-xxl mx-auto">
						<svg className="full-graph">
							<use xlinkHref="/uploads/icons.svg#bg-bkgd" />
						</svg>
						<svg className="qua-graph">
							<use xlinkHref="/uploads/icons.svg#bg-bleft" />
						</svg>
						<svg className="angle">
							<use xlinkHref="/uploads/icons.svg#bg-bright" />
						</svg>
						<section className="input-lists mx-auto maxwidth-tb main-wrapper is-prev">
							<form className="mt-2 prev-input p-2">
								{loading === false && preview.formData !== undefined && <>{renderElements()}</>}
							</form>
						</section>
					</div>
				</main>
			</>

			{loading === true && <PageLoader />}
		</>
	);
};

const mapStateToProps = (state) => ({
	currentForm: state.formReducer.currentForm,
	loading: state.formReducer.loadingPreview,
	preview: state.formReducer.formPreview,
});

export default connect(mapStateToProps, { getSingleForm })(SingleForm);
