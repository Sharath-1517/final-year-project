const throwError = async (message, status_code) => {
	const error = new Error(message);
	error.status = status_code;
	throw error;
};

module.exports = throwError;
