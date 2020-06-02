import React from "react";

const ImageCapture = ({ elementDetails, index }) => {
	return (
		<div className="width-100-pc d-flx prev-question">
			<span className="index-no">{index + 1}</span>
			<div className="mb-2-nlc-noc-child formbuilder-prev-inpts">
				<span className="label d-blk">
					{elementDetails.label} {elementDetails.isMandatory && <span className="required">*</span>}
				</span>
				<label htmlFor="uploadcam" className="upload">
					<input disabled type="file" id="uploadcam" accept="image/*;capture=camera" />
					<svg>
						<use xlinkHref="/uploads/icons.svg#camera" />
					</svg>
				</label>
			</div>
		</div>
	);
};

export default ImageCapture;
