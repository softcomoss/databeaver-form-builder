import React from "react";

const Address = ({ elementDetails, index }) => {
	return (
		<div>
			<div className="width-100-pc d-flx prev-question">
				<span className="index-no">{index + 1}</span>
				<div className="width-100-pc formbuilder-prev-inpts">
					<label htmlFor="text" className="fb-input">
						<span className="label">
							{elementDetails.label} {elementDetails.isMandatory && <span className="required">*</span>}
						</span>
						<div className="mt-2">
							<label>House number</label>
							<input readOnly type="text" />
						</div>
						<div className="mt-2">
							<label>Street address</label>
							<input readOnly type="text" />
						</div>
						<div className="mt-2">
							<label>Nearest landmark</label>
							<input readOnly type="text" />
						</div>
					</label>
				</div>
			</div>
		</div>
	);
};

export default Address;
