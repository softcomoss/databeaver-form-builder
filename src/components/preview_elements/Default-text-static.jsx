import React from "react";

const DefaultText = ({ elementDetails, index }) => {
	return (
		<div className="width-100-pc d-flx prev-question">
			<span className="index-no"></span>
			<div className="width-100-pc formbuilder-prev-inpts">
				<label htmlFor="text" className="fb-input">
					<span className="label">
						{elementDetails.label} {elementDetails.isMandatory && <span className="required">*</span>}
					</span>
				</label>
			</div>
		</div>
	);
};

export default DefaultText;
