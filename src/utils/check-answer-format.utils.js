import React from "react";

export const CheckAnswerFormat = ({ question }) => {
	if (question.type === "imageCapture") {
		if (Array.isArray(question.answer)) {
			return question.answer.map((ans, i) => (
				<span key={i}>
					<img src={ans} />
				</span>
			));
		} else {
			return <span>{question.answer && <img src={question.answer} alt="image" />}</span>;
		}
	} else if (
		question.type === "shortText" ||
		question.type === "multiLine" ||
		question.type === "phoneNumber" ||
		question.type === "rating" ||
		question.type === "time" ||
		question.type === "date" ||
		question.type === "email" ||
		question.type === "number" ||
		question.type === "singleChoice"
	) {
		return (
			<p>
				<span>{question.answer}</span>{" "}
			</p>
		);
	} else if (question.type === "agreement") {
		return (
			<p>
				<span>{question.answer === true ? "True" : "False"}</span>
			</p>
		);
	} else if (question.type === "links") {
		return (
			<p>
				{" "}
				<a target="_blank" href={question.answer}>
					{question.answer}
				</a>
			</p>
		);
	} else if (question.type === "multiChoice") {
		if (Array.isArray(question.answer)) {
			return (
				<p>
					<ul>
						{" "}
						{question.answer.map((ans, i) => {
							if (typeof ans === "string") {
								return <li key={i}>{ans}</li>;
							} else if (typeof ans === "object") {
								return <li key={i}>{ans.other}</li>;
							}
						})}
					</ul>
				</p>
			);
		} else {
			return null;
		}
	} else if (question.type === "address" && question.answer) {
		if (question.answer.hasOwnProperty("houseNumber")) {
			return (
				<p>
					<span>{question.answer.houseNumber} </span>
					<span>{question.answer.streetAddress} </span>
					<span>{question.answer.nearestLandmark} </span>
				</p>
			);
		} else {
			return null;
		}
	} else if (question.type === "areaMap") {
		return null;
	} else if (question.type === "locationMap" && question.answer) {
		if (question.answer.hasOwnProperty("state")) {
			return (
				<p>
					<span>{question.answer.state} </span>
					<span>{question.answer.city} </span>
					<span>{question.answer.country} </span>
				</p>
			);
		} else {
			return null;
		}
	} else if (question.type === "fileUpload") {
		if (Array.isArray(question.answer)) {
			return question.answer.map((ans, i) => (
				<p key={i}>
					<a target="_blank" href={ans}>
						{ans}{" "}
					</a>
				</p>
			));
		} else {
			return (
				<>
					<span>{question.answer} </span>
				</>
			);
		}
	} else {
		return null;
	}
};

// export default CheckAnswerFormat;
