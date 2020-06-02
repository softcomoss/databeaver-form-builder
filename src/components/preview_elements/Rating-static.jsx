import React from "react";

const Rating = ({ elementDetails, index }) => {
	const { ratings } = elementDetails;

	const renderRatings = () => {
		return ratings.map((rating, i) => (
			<span key={i}>
				<input disabled className type="radio" name="question5" id={`opt${i}`} />
				<label className="mx-1" htmlFor={`opt${i}`}>
					{rating.label}
				</label>
			</span>
		));
	};
	return (
		<div className="width-100-pc d-flx prev-question">
			<span className="index-no">{index + 1}</span>
			<div className="mb-2-nlc-noc-child formbuilder-prev-inpts">
				<span className="label d-blk">
					{elementDetails.label} {elementDetails.isMandatory && <span className="required">*</span>}
				</span>
				{ratings.length > 0 && <div className="ratings">{renderRatings()}</div>}
				{!ratings.length > 1 && (
					<div className="ratings">
						<div>
							<input className disabled type="radio" name={`question`} id={`opt1`} />
							<label htmlFor={`opt1`}>{""}</label>
						</div>
						<div>
							<input className disabled type="radio" name={`question`} id={`opt2`} />
							<label htmlFor={`opt2`}>{""}</label>
						</div>
						<div>
							<input className disabled type="radio" name={`question`} id={`opt3`} />
							<label htmlFor={`opt3`}>{""}</label>
						</div>
						<div>
							<input className disabled type="radio" name={`question`} id={`opt4`} />
							<label htmlFor={`opt4`}>{""}</label>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Rating;
