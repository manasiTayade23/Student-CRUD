function validateUserInput(req, res, next) {
  const { first_name, last_name, dob, email, password } = req.body;

  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({
      success: false,
      message:
        "Please provide all mandatory fields: first_name, last_name, email, password",
      data: [],
    });
  }
  //checking if email provided is in correct format or no
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address",
      data: [],
    });
  }
  // Validate date of birth if provided
  // if (dob) {
  //   const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
  //   if (!dobRegex.test(dob)) {
  //     return res.status(400).json({
  //       success: false,
  //       message: "Date of birth should be in yyyy-mm-dd format",
  //       data: [],
  //     });
  //   }
  // }
  // If all required fields are present, continue
  next();
}

module.exports = validateUserInput;
