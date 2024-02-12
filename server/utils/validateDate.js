
function validateDate(enteredDate) {
  // Get the current date
  const currentDate = new Date();
  // Get the entered date from the state
  const inputDate = new Date(enteredDate);

  if (inputDate < currentDate) return false;
  else return true;
}

module.exports = validateDate