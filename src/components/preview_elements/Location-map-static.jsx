import React from "react";

const LocationMap = ({ elementDetails, index }) => {
	return (
		<div style={{ marginBottom: "7rem" }} className="width-100-pc d-flx prev-question">
			<span className="index-no">{index + 1}</span>
			<div className="mb-2-nlc-noc-child formbuilder-prev-inpts">
				<span className="label d-blk">
					{elementDetails.label} {elementDetails.isMandatory && <span className="required">*</span>}
				</span>
				<label htmlFor="uploadcam">
					<img style={{ marginTop: "3rem" }} className="bg-rect" src="/uploads/ent-map.svg" alt="" />
				</label>
			</div>
		</div>
	);
};

export default LocationMap;
