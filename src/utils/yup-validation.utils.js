import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
	email: Yup.string().email("Invalid email").required("Required"),
	password: Yup.string().required("No Password provided"),
});

export const SignupSchema = Yup.object().shape({
	firstName: Yup.string().required("First name is required"),
	lastName: Yup.string().required("Last name is required."),
	email: Yup.string().required("Email is required."),
	password: Yup.string()
		.required("Password is required")
		.min(6, "Password must be at least 6 characters"),
	organizationName: Yup.string().required("Organization name is required"),
});

export const minMaxValidation = Yup.object().shape({
	max: Yup.number(),
	min: Yup.number().lessThan(Yup.ref("max"), "min should be less than max"),
});
