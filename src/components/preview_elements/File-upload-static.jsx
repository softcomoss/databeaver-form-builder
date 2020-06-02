import React from "react";

const FileUpload = ({ elementDetails, screenSize, index }) => {
	return (
		<div className="width-100-pc d-flx prev-question">
			<span className="index-no">{index + 1}</span>
			<div className="mb-2-nlc-noc-child formbuilder-prev-inpts">
				<span className="label d-blk">
					{elementDetails.label} {elementDetails.isMandatory && <span className="required">*</span>}
				</span>
				<label htmlFor="uploadfile" className="upload">
					<input disabled type="file" id="uploadfile" />
					<svg>
						<use xlinkHref="/uploads/icons.svg#clip" />
					</svg>
					<span>Upload file(videos, pdf, .csv)</span>
					<span>Not more than 18mb</span>
				</label>
			</div>
		</div>
	);
};

export default FileUpload;
