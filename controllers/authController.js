export const loginSuccess = (req, res) => {
	res.status(200).json(`login success ${req.user.email}`);
};

export const loginFailure = (req, res) => {
	res.status(400).json("Cannot process the request, Please try again");
};
