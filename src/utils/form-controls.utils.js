const FORM_ELEMENTS = [
	"short text",
	"long text",
	"email",
	"date",
	"time",
	"address",
	"ratings",
	"phone number",
	"number",
	"multiple choice",
	"image capture",
	"single choice",
	"location",
	"area map",
	"file upload",
	"link",
	"biometric",
	"agreement",
	"default text",
];

export const displayControls = (query) => {
	let copyElements = [];
	if (query.length > 0) {
		copyElements = FORM_ELEMENTS.filter((elem) => elem.includes(query));
		return copyElements;
	} else {
		return FORM_ELEMENTS;
	}
};
