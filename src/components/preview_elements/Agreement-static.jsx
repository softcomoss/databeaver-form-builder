import React from "react";

const Agreement = ({ elementDetails, index }) => {
	return (
		<div className="width-100-pc d-flx prev-question">
			<span className="index-no">{index + 1}</span>
			<div className="mb-2-nlc-noc-child formbuilder-prev-inpts">
				<span style={{ marginBottom: "0rem" }} className="label d-blk">
					{elementDetails.label} {elementDetails.isMandatory && <span className="required">*</span>}
				</span>
				<input checked disabled className="uk-checkbox" type="checkbox" disabled />
			</div>
		</div>
	);
};

export default Agreement;
