const isString = async (myVar) => {
	if (typeof myVar === "string" || myVar instanceof String) {
		return true;
	} else {
		return false;
	}
};

module.exports = isString;
