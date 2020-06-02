export const logDescription = (flag, admin) => {
	switch (flag) {
		case "CREATE_ADMIN":
			return "created a new admin";
			break;
		case "ADMIN_LOGIN":
			return "signed in successfully";
			break;
		case "CREATE_AGENT":
			return "created a new agent";
			break;
		case "CREATE_FORM":
			return "created a new form";
			break;
		case "UPDATE_FORM":
			return "updated a form";
			break;
		case "CREATE_PROJECT":
			return "created a new project";
			break;
		case "CREATE_DISPATCH":
			return "created a new dispatch";
			break;
		case "DELETE_DISPATCH":
			return "deleted a dispatch";
			break;
		case "PUSH_DISPATCH":
			return "pushed a new dispatch";
			break;
		case "ACCEPTED_ENTRY":
			return "accepted a new entry";
			break;
		case "REJECTED_ENTRY":
			return "rejected an entry";
			break;
		default:
			break;
	}
};
