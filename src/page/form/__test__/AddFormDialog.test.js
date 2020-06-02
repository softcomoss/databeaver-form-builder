import React from "react";
import axiosMock from "axios";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import store from "../../../redux/store/Store";
import AddFormDialog from "../AddFormDialog";

jest.mock("axios");

beforeEach(() => {
	jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(cleanup);

test("Page should load the dialog modal component", () => {
	render(
		<Provider store={store}>
			{/* <Router>
				<Login />
			</Router> */}
			<AddFormDialog />
		</Provider>
	);
});
