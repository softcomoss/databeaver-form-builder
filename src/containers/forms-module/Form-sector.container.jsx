import React, { useState } from "react";

const FormSectors = () => {
	const [activeSector, switchSector] = useState("all");
	return (
		<>
			<div data-uk-accordion className="hide-mediumup px-3 py-3">
				<div>
					<a className="uk-accordion-title side-title" href="#">
						sectors
					</a>
					<div className="uk-accordion-content">
						<ul className="none">
							<li>
								<a
									href="/forms/"
									onClick={() => {
										switchSector("all");
									}}
									className={activeSector === "all" ? "sd-nav-item is-active" : "sd-nav-item"}>
									<span>all</span>
									<svg>
										<use xlinkHref="/uploads/icons.svg#right-drop" />
									</svg>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			{/* secon aside nav */}
			<aside className="width-1-4 bg-platinum main-section-wrapper show-mediumup">
				<h2 className="side-title">
					<span className="sr">list of</span>
					sectors
				</h2>
				<ul className="none">
					<li>
						<a
							onClick={() => {
								switchSector("all");
							}}
							className={activeSector === "all" ? "sd-nav-item is-active" : "sd-nav-item"}>
							<span>all</span>
							<svg>
								<use xlinkHref="/uploads/icons.svg#right-drop" />
							</svg>
						</a>
					</li>
					{/* <li>
						<a
							onClick={() => {
								switchSector("education");
							}}
							className={activeSector === "education" ? "sd-nav-item is-active" : "sd-nav-item"}>
							<span>education</span>
							<svg>
								<use xlinkHref="/uploads/icons.svg#right-drop" />
							</svg>
						</a>
					</li>
					<li>
						<a
							onClick={() => {
								switchSector("community");
							}}
							className={activeSector === "community" ? "sd-nav-item is-active" : "sd-nav-item"}>
							<span>community</span>
							<svg>
								<use xlinkHref="/uploads/icons.svg#right-drop" />
							</svg>
						</a>
					</li>
					<li>
						<a
							onClick={() => {
								switchSector("benchmarkable");
							}}
							className={activeSector === "benchmarkable" ? "sd-nav-item is-active" : "sd-nav-item"}>
							<span>benchmarkable</span>
							<svg>
								<use xlinkHref="/uploads/icons.svg#right-drop" />
							</svg>
						</a>
					</li>
					<li>
						<a
							onClick={() => {
								switchSector("demographics");
							}}
							className={activeSector === "demographics" ? "sd-nav-item is-active" : "sd-nav-item"}>
							<span>demographics</span>
							<svg>
								<use xlinkHref="/uploads/icons.svg#right-drop" />
							</svg>
						</a>
					</li>
					<li>
						<a
							onClick={() => {
								switchSector("healthcare");
							}}
							className={activeSector === "healthcare" ? "sd-nav-item is-active" : "sd-nav-item"}>
							<span>healthcare</span>
							<svg>
								<use xlinkHref="/uploads/icons.svg#right-drop" />
							</svg>
						</a>
					</li> */}
				</ul>
			</aside>
		</>
	);
};

export default FormSectors;
