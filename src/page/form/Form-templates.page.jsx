import React, { Component } from "react";
import FormSectors from "../../containers/forms-module/Form-sector.container";
import { showModal, closeModal } from "../../utils/modal-control.utils";

class FormTemplates extends Component {
	render() {
		return (
			<>
				<main className="main" id="mainContent">
					<div className="main-wrapper cont-w-snav">
						<FormSectors />
						<section className="width-3-4 main-section-wrapper">
							<div className="d-flx-alc-jsb">
								<h2 className="section-header">All templates</h2>
								<button
									onClick={() => {
										showModal("#create-new-form");
									}}
									className="btn btn-pry">
									<span>Create new form</span>
								</button>

								<div id="create-new-form" data-uk-modal>
									<div className="uk-modal-dialog uk-margin-auto-vertical border-radius">
										<button className="uk-modal-close-default" type="button" data-uk-close />
										<h2 className="uk-modal-title">Name your form</h2>
										<div className="uk-modal-body">
											<label htmlFor="form-name" className="form-inputs">
												<input type="text" id="form-name" placeholder=" " />
												<span className="label">
													Form name <span className="co-warning">*</span>
												</span>
											</label>
											<label htmlFor className="inp-select">
												<span className="label">Sector</span>
												<select name id>
													<option value>Select a sector</option>
													<option value>Select a sector</option>
													<option value>Select a sector</option>
												</select>
											</label>
											<label htmlFor className="inp-select">
												<span className="label">What are you creating it for</span>
												<select name id>
													<option value>Select a sector</option>
													<option value>Select a sector</option>
													<option value>Select a sector</option>
												</select>
											</label>
										</div>
										<div className="uk-modal-footer uk-text-left">
											<button className="modal-actn-btn modal-accept-btn" type="button">
												Continue
											</button>
											<button className="uk-modal-close modal-cancel-btn modal-actn-btn" type="button">
												Cancel
											</button>
										</div>
									</div>
								</div>
							</div>
							<ul className="card-list none flex-width-1-3-wg">
								<li className="card-list-item card-deco pos-rel dif-bc">
									<div href="/single-form/" className="card">
										<h3 className="card-title capitalize">customer verification form</h3>
										<p className="bottom-info width-100-pc mb-3">
											For creatives looking to explore the digital space and want to collect data on how
											that can be done
										</p>
									</div>
									<div className="d-flx-alc-jc preview-wrapper">
										<a href="/forms/preview/" className="preview-link link-like-btn">
											preview
										</a>
									</div>
								</li>
								<li className="card-list-item card-deco pos-rel dif-bc">
									<div href="/single-form/" className="card">
										<h3 className="card-title capitalize">osun vital information</h3>
										<p className="bottom-info width-100-pc mb-3">
											For creatives looking to explore the digital space and want to collect data on how
											that can be done
										</p>
									</div>
									<div className="d-flx-alc-jc preview-wrapper">
										<a href="/forms/preview/" className="preview-link link-like-btn">
											preview
										</a>
									</div>
								</li>
								<li className="card-list-item card-deco pos-rel dif-bc">
									<div href="/single-form/" className="card">
										<h3 className="card-title capitalize">lagos food industry</h3>
										<p className="bottom-info width-100-pc mb-3">
											For creatives looking to explore the digital space and want to collect data on how
											that can be done
										</p>
									</div>
									<div className="d-flx-alc-jc preview-wrapper">
										<a href="/forms/preview/" className="preview-link link-like-btn">
											preview
										</a>
									</div>
								</li>
								<li className="card-list-item card-deco pos-rel dif-bc">
									<div href="/single-form/" className="card">
										<h3 className="card-title capitalize">unilever distributors</h3>
										<p className="bottom-info width-100-pc mb-3">
											For creatives looking to explore the digital space and want to collect data on how
											that can be done
										</p>
									</div>
									<div className="d-flx-alc-jc preview-wrapper">
										<a href="/forms/preview/" className="preview-link link-like-btn">
											preview
										</a>
									</div>
								</li>
								<li className="card-list-item card-deco pos-rel dif-bc">
									<div href="/single-form/" className="card">
										<h3 className="card-title capitalize">hiv awareness</h3>
										<p className="bottom-info width-100-pc mb-3">
											For creatives looking to explore the digital space and want to collect data on how
											that can be done
										</p>
									</div>
									<div className="d-flx-alc-jc preview-wrapper">
										<a href="/forms/preview/" className="preview-link link-like-btn">
											preview
										</a>
									</div>
								</li>
								<li className="card-list-item card-deco pos-rel dif-bc">
									<div href="/single-form/" className="card">
										<h3 className="card-title capitalize">birth control awareness</h3>
										<p className="bottom-info width-100-pc mb-3">
											For creatives looking to explore the digital space and want to collect data on how
											that can be done
										</p>
									</div>
									<div className="d-flx-alc-jc preview-wrapper">
										<a href="/forms/preview/" className="preview-link link-like-btn">
											preview
										</a>
									</div>
								</li>
								<li className="card-list-item card-deco pos-rel dif-bc">
									<div href="/single-form/" className="card">
										<h3 className="card-title capitalize">npower impacts</h3>
										<p className="bottom-info width-100-pc mb-3">
											For creatives looking to explore the digital space and want to collect data on how
											that can be done
										</p>
									</div>
									<div className="d-flx-alc-jc preview-wrapper">
										<a href="/forms/preview/" className="preview-link link-like-btn">
											preview
										</a>
									</div>
								</li>
								<li className="card-list-item card-deco pos-rel dif-bc">
									<div href="/single-form/" className="card">
										<h3 className="card-title capitalize">MTN social impact</h3>
										<p className="bottom-info width-100-pc mb-3">
											For creatives looking to explore the digital space and want to collect data on how
											that can be done
										</p>
									</div>
									<div className="d-flx-alc-jc preview-wrapper">
										<a href="/forms/preview/" className="preview-link link-like-btn">
											preview
										</a>
									</div>
								</li>
								<li className="card-list-item card-deco pos-rel dif-bc">
									<div href="/single-form/" className="card">
										<h3 className="card-title capitalize">Nigeria censor 2020</h3>
										<p className="bottom-info width-100-pc mb-3">
											For creatives looking to explore the digital space and want to collect data on how
											that can be done
										</p>
									</div>
									<div className="d-flx-alc-jc preview-wrapper">
										<a href="/forms/preview/" className="preview-link link-like-btn">
											preview
										</a>
									</div>
								</li>
							</ul>
						</section>
					</div>
				</main>
			</>
		);
	}
}

export default FormTemplates;
