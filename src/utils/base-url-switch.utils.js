let baseURL;
let agentURL;
let appURL;

if (window.location.href.includes("localhost")) {
	//  baseURL = "http://3.213.245.72:8082/v3";
	baseURL = "https://api-databeaverv3-admin-staging.bluegreensoft.com/v3";
	agentURL = "https://api-databeaverv3-agent-staging.bluegreensoft.com/v3";
	appURL = "https://databeaverv3staging.bluegreensoft.com/";
}

if (window.location.href.includes("bluegreensoft")) {
	baseURL = "https://api-databeaverv3-admin-staging.bluegreensoft.com/v3";
	agentURL = "https://api-databeaverv3-agent-staging.bluegreensoft.com/v3";
	appURL = "https://databeaverv3staging.bluegreensoft.com/";
}

if (window.location.href.includes("heroku")) {
	baseURL = "https://api-databeaverv3-admin-staging.bluegreensoft.com/v3";
}

if (window.location.href.includes("app.databeaver.co")) {
	baseURL = " https://api3.admin.databeaver.co/v3";
	agentURL = "https://api3.agent.databeaver.co/v3";
	appURL = "https://app.databeaver.co/";
}

export { baseURL, agentURL, appURL };
