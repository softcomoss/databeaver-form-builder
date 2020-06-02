import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import ShortText from "./elements_placeholders/Short-text-placeholder";
import LongText from "./elements_placeholders/Long-text";
import Email from "./elements_placeholders/Email-placeholder";
import Date from "./elements_placeholders/Date-placeholder";
import Rating from "./elements_placeholders/Rating-placeholder";
import PhoneNumber from "./elements_placeholders/Phone-number-placeholder";
import Numbers from "./elements_placeholders/Numbers-placeholder";
import ImageChoice from "./elements_placeholders/Image-choice-placeholder";
import SingleChoice from "./elements_placeholders/Single-choice-placeholder";
import Location from "./elements_placeholders/Location-placeholder";
import FileUpload from "./elements_placeholders/File-upload-placeholder";
import Agreement from "./elements_placeholders/Agreement-placeholder";
import Links from "./elements_placeholders/Links-placeholder";
import {
	addNewPage,
	deletePage,
	setActivePage,
	addSection,
	setActiveSection,
	deleteSection,
} from "../../redux/actions/form-action/form.actions";

import MultipleChoice from "./elements_placeholders/Multiple-choice-placeholder";
import Biometric from "./elements_placeholders/Biometric-placeholder";
import AreaMap from "./elements_placeholders/AreaMap-placeholder";
import DefaultText from "./elements_placeholders/Default-text-placeholder";
import MultiChoiceWithPhoto from "./elements_placeholders/Multi-choice-photo-placeholder";
import Time from "./elements_placeholders/Time-placeholder";
import Address from "./elements_placeholders/Address-placeholder";
import { reOderCurrentView } from "../../redux/actions/form-action/formControlActions";

const FormElementDisplay = (props) => {
	const [latestView, setLatestView] = useState([]);
	const [currentIndex, setCurrentIndex] = useState([]);
	const {
		addNewPage,
		formdata,
		deletePage,
		activePage,
		setActivePage,
		addSection,
		activeSection,
		setActiveSection,
		deleteSection,
		reOderCurrentView,
		currentView,
	} = props;

	useEffect(() => {
		// setLatestView(currentView);
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

	// a little function to help us with reordering the result
	/**
	 *
	 * @param {*} list current list to be re-ordered
	 * @param {*} startIndex Initial index of the element being dragged
	 * @param {*} endIndex final index of the element being dragged
	 */
	const reorder = (list, startIndex, endIndex) => {
		const result = Array.from(list);
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);

		return result;
	};

	/**
		 *@description some basic styles to make the items look a bit nicer
		 userSelect: "none",
		 padding: grid * 2,
		 margin: `0 0 ${grid}px 0`,
		 change background colour if dragging
		 */
	const getItemStyle = (isDragging, draggableStyle) => ({
		background: isDragging ? "#daeffa" : "",
		// styles we need to apply on draggables
		...draggableStyle,
	});

	const getListStyle = (isDraggingOver) => ({
		// background: isDraggingOver ? "lightblue" : "",
	});
	const onDragEnd = (result) => {
		let items = [...currentView];
		// dropped outside the list
		if (!result.destination) {
			return;
		}

		console.log("check params", items, result.source.index, result.destination.index);

		const newItems = reorder(items, result.source.index, result.destination.index);

		// setLatestView(newItems);
		// remove undefined elements
		let newItemsCopy = [...newItems];
		let newOrder = newItemsCopy.filter((field) => field !== undefined);
		reOderCurrentView(activePage, newOrder);
	};

	return (
		<>
			<li id="form-element-dispaly" className="selected-form-fields-wrapper uk-active">
				<DragDropContext onDragEnd={(result) => onDragEnd(result)}>
					<Droppable droppableId="droppable">
						{(provided, snapshot) => (
							<div
								{...provided.droppableProps}
								ref={provided.innerRef}
								style={getListStyle(snapshot.isDraggingOver)}>
								{currentView.map((element, index) => (
									<Draggable key={element.unique_id} draggableId={element.unique_id} index={index}>
										{(provided, snapshot) => (
											<div
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
												style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
												{element.type === "shortText" && (
													<ShortText
														elementDetails={element}
														index={index}
														serialNumber={currentIndex.indexOf(element.unique_id)}
													/>
												)}
												{element.type === "address" && (
													<Address
														elementDetails={element}
														index={index}
														serialNumber={currentIndex.indexOf(element.unique_id)}
													/>
												)}
												{element.type === "multiLine" && (
													<LongText
														elementDetails={element}
														index={index}
														serialNumber={currentIndex.indexOf(element.unique_id)}
													/>
												)}
												{element.type === "email" && (
													<Email
														elementDetails={element}
														index={index}
														serialNumber={currentIndex.indexOf(element.unique_id)}
													/>
												)}
												{element.type === "time" && (
													<Time
														elementDetails={element}
														index={index}
														serialNumber={currentIndex.indexOf(element.unique_id)}
													/>
												)}
												{element.type === "date" && (
													<Date
														elementDetails={element}
														index={index}
														serialNumber={currentIndex.indexOf(element.unique_id)}
													/>
												)}
												{element.type === "rating" && (
													<Rating
														elementDetails={element}
														index={index}
														serialNumber={currentIndex.indexOf(element.unique_id)}
													/>
												)}
												{element.type === "phoneNumber" && (
													<PhoneNumber
														elementDetails={element}
														index={index}
														serialNumber={currentIndex.indexOf(element.unique_id)}
													/>
												)}
												{element.type === "number" && (
													<Numbers
														elementDetails={element}
														index={index}
														serialNumber={currentIndex.indexOf(element.unique_id)}
													/>
												)}
												{element.type === "multiChoice" && (
													<MultipleChoice
														elementDetails={element}
														index={index}
														serialNumber={currentIndex.indexOf(element.unique_id)}
													/>
												)}
												{element.type === "imageCapture" && (
													<ImageChoice
														elementDetails={element}
														index={index}
														serialNumber={currentIndex.indexOf(element.unique_id)}
													/>
												)}
												{element.type === "singleChoice" && (
													<SingleChoice
														elementDetails={element}
														index={index}
														serialNumber={currentIndex.indexOf(element.unique_id)}
													/>
												)}
												{element.type === "locationMap" && (
													<Location
														elementDetails={element}
														index={index}
														serialNumber={currentIndex.indexOf(element.unique_id)}
													/>
												)}
												{element.type === "fileUpload" && (
													<FileUpload
														elementDetails={element}
														index={index}
														serialNumber={currentIndex.indexOf(element.unique_id)}
													/>
												)}
												{element.type === "agreement" && (
													<Agreement
														elementDetails={element}
														index={index}
														serialNumber={currentIndex.indexOf(element.unique_id)}
													/>
												)}
												{element.type === "links" && (
													<Links
														elementDetails={element}
														index={index}
														serialNumber={currentIndex.indexOf(element.unique_id)}
													/>
												)}
												{element.type === "biometric" && (
													<Biometric
														elementDetails={element}
														index={index}
														serialNumber={currentIndex.indexOf(element.unique_id)}
													/>
												)}
												{element.type === "areaMap" && (
													<AreaMap
														elementDetails={element}
														index={index}
														serialNumber={currentIndex.indexOf(element.unique_id)}
													/>
												)}
												{element.type === "defaultText" && (
													<DefaultText
														elementDetails={element}
														index={index}
														serialNumber={currentIndex.indexOf(element.unique_id)}
													/>
												)}
											</div>
										)}
									</Draggable>
								))}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>
			</li>
		</>
	);
};

const mapStateToProps = (state) => ({
	elements: state.formReducer,
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
	reOderCurrentView,
})(FormElementDisplay);
