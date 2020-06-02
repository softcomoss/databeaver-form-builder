import { combineReducers } from "redux";
import formReducer from "./form.reducer";
import auth from "./auth.reducer";
import tabActivitiesReducer from "./tab-activity.reducer";
import agents from "./agents.reducer";
import projects from "./project.reducer";
import settingsReducer from "./settings.reducer";
import client from "./client.reducer";
import dashboard from "./dashboard.reducer";

export default combineReducers({
	formReducer,
	auth,
	tabActivitiesReducer,
	agents,
	projects,
	settingsReducer,
	client,
	dashboard,
});
