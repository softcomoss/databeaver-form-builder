import React from "react";
import { connect } from "react-redux";
import { changeFormName, changeFormDescription } from "../actions/form-action/form.actions";
import "./Layout.css";
import Controls from "../containers/Controls";
import FormDisplay from "../containers/FormDisplay";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ changeFormName, changeFormDescription }) => {
	return (
		<>
			<Navbar />

			<main className="main" id="mainContent">
				<div className="main-wrapper main-section-wrapper no-px">
					<div className="page-header mb-2 main-section-wrapper no-py">
						<div className="form-heading">
							<input
								className="capitalize co-heading form-name my-0 section-header mb-1"
								type="text"
								onChange={(e) => changeFormName(e.target.value)}
								placeholder="Form Name"
							/>
							{/* <input class="form-name" type="text" placeholder="form name"> */}
							<textarea
								className="form-description mt-1"
								rows={1}
								onChange={(e) => {
									changeFormDescription(e.target.value);
								}}
								placeholder="Form description"
								defaultValue={""}
							/>
						</div>
						<div className="page-navigation">
							<a className="btn btn-lightgray mr-1" href="#">
								<svg
									width={36}
									height={35}
									viewBox="0 0 36 35"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M5.83496 17.4999C5.83496 17.4999 10.0802 8.74994 17.5093 8.74994C24.9385 8.74994 29.1837 17.4999 29.1837 17.4999C29.1837 17.4999 24.9385 26.2499 17.5093 26.2499C10.0802 26.2499 5.83496 17.4999 5.83496 17.4999Z"
										stroke="currentColor"
										strokeWidth={2}
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M17.5106 20.7812C19.269 20.7812 20.6945 19.3121 20.6945 17.4999C20.6945 15.6878 19.269 14.2187 17.5106 14.2187C15.7521 14.2187 14.3267 15.6878 14.3267 17.4999C14.3267 19.3121 15.7521 20.7812 17.5106 20.7812Z"
										stroke="currentColor"
										strokeWidth={2}
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
								<span className="microtext">Preview</span>
							</a>
							<a className="btn btn-lightgray mr-1" href="http://localhost:4000/forms/dispatch-form">
								<svg
									width={35}
									height={35}
									viewBox="0 0 35 35"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M28.4375 6.5625L16.4062 18.5938"
										stroke="currentColor"
										strokeWidth={2}
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M28.4375 6.5625L20.7812 28.4375L16.4062 18.5938L6.5625 14.2188L28.4375 6.5625Z"
										stroke="currentColor"
										strokeWidth={2}
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
								<span className="microtext">dispatch</span>
							</a>
							<button className="btn btn-blue">save form</button>
						</div>
					</div>
					<div className="form-builder form-builder-grid">
						{/* Control section */}
						<Controls />

						<FormDisplay />
						<section className="properties card-fadded-shadow-left">
							<a class="my-0 capitalize microtext bg-alt p-1h uk-accordion-title" href="#">
								properties
							</a>
						</section>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
};

const mapStateToProps = (state) => ({
	name: state.name,
});

export default connect(mapStateToProps, { changeFormName, changeFormDescription })(Layout);
