export const numbersOnly = value => {
	let compare = /^[0-9]{1,15}$/g;
	if (value.match(compare)) {
		return true;
	} else {
		return false;
	}
};
