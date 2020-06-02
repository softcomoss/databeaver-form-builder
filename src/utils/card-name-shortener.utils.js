export const nameShortner = (name, length) => {
	let shortenedName = "";
	let splitName = name.split("");
	if (splitName.length > length) {
		shortenedName = splitName.join("");
		return `${splitName.splice(0, length).join("")}...`;
	} else {
		return name;
	}
};
