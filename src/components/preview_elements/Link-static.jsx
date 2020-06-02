import React from "react";

const Link = ({ elementDetails, index }) => {
	return (
		<div className="width-100-pc d-flx prev-question">
			<span className="index-no">{index + 1}</span>
			<div className="width-100-pc formbuilder-prev-inpts">
				<label htmlFor="text" className="fb-input">
					<span className="label">
						{elementDetails.label} {elementDetails.isMandatory && <span className="required">*</span>}
					</span>
					<input disabled type="text" id="text" placeholder="http://" />
				</label>
			</div>
		</div>
	);
};

export default Link;
