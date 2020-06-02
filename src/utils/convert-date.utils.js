/**
 *
 * @param {*} date Date to be converted to iso
 */
export const convertToISO = (date) => {
	let targetDate = date;
	let dateReversed = targetDate.split("-").reverse().join("-");
	let isoDate = new Date(dateReversed).toISOString();
	return isoDate;
};
