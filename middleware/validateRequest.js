const validateRequest = ({
	check_from,
	mustKeys = [],
	validKeys = [],
	validEnums = [],
}) => {
	return (req, res, next) => {
		try {
			// Handle missing fields when using multer
			if (req.files) {
				// If req.files is an object (single file or multiple files under different fields)
				if (Array.isArray(req.files)) {
					// If it's an array, assume all the files belong to the same field (or handle accordingly)
					req.body.docs = req.files.map((file) => file.key);
				} else {
					// If it's an object (different fields for different files)
					Object.keys(req.files).forEach((field) => {
						if (!req.body[field]) {
							req.body[field] = req.files[field].map((file) => file.key);
						}
					});
				}
			}

			if (req.file) {
				const fieldName = req.file.fieldname;
				if (!req.body[fieldName]) {
					req.body[fieldName] = req.file.key;
				}
			}

			const keys =
				check_from === "body" ? Object.keys(req.body) : Object.keys(req.query);

			// Skip the check for "Keys are required" if keys are empty, validKeys and mustKeys are allowed to be empty
			if (
				keys.length === 0 &&
				mustKeys.length === 0 &&
				validKeys.length === 0
			) {
				return next(); // No keys are required if both mustKeys and validKeys are empty
			}

			if (!Array.isArray(validKeys))
				throw new Error("Valid keys must be an array");
			if (!Array.isArray(mustKeys))
				throw new Error("Must keys must be an array");

			// Ensure no unexpected keys are present
			if (keys.length > validKeys.length + mustKeys.length) {
				throw new Error("Unexpected key in body");
			}

			keys.forEach((key) => {
				if (!validKeys.includes(key) && !mustKeys.includes(key)) {
					throw new Error(`Unexpected key: ${key} in body`);
				}
			});

			// Validate mustKeys
			mustKeys.forEach((key) => {
				if (key === "docs") {
					if (!req.files || req.files.length === 0) {
						throw new Error(`Missing field: ${key}`);
					}
				} else if (!keys.includes(key)) {
					throw new Error(`Missing field: ${key}`);
				}

				if (
					key !== "docs" &&
					!req[check_from][key] &&
					req[check_from][key] !== 0 &&
					req[check_from][key] !== false
				) {
					throw new Error(`Field ${key.toUpperCase()} cannot be empty`);
				}
			});

			// Handle pagination
			const hasPageAndCount =
				validKeys.includes("page") && validKeys.includes("count");

			if (hasPageAndCount) {
				const page = req.query.page
					? parseInt(req.query.page)
					: req.body.page
					? parseInt(req.body.page)
					: 1;
				const count = req.query.count
					? parseInt(req.query.count)
					: req.body.count
					? parseInt(req.body.count)
					: 10;
				const offset = (page - 1) * count;

				req.query.page = parseInt(page);
				req.query.currentPage = page;
				req.query.limit = parseInt(count);
				req.query.offset = parseInt(offset);
			}

			// Validate enum values
			for (const validEnum of validEnums) {
				const { field, enum: validEnumValues } = validEnum;

				if (req[check_from][field]) {
					req[check_from][field].forEach((v) => {
						if (!validEnumValues.includes(v)) {
							throw new Error(`Invalid ${field} value`);
						}
					});
				}
			}

			next();
		} catch (error) {
			console.log(error);
			res.status(400).send({
				code: 400,
				msg: error.message,
				status: "failed",
			});
		}
	};
};

module.exports = { validateRequest };
