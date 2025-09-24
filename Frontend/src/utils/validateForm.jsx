export function validateDonation(form) {
  if (!form.item || !form.category || !form.quantity) {
    return "All fields are required";
  }
  if (form.quantity < 1) return "Quantity must be at least 1";
  return "";
}

export function validateSignup(form) {
  if (!form.name || !form.email || !form.password) return "All fields required";
  if (!form.email.includes("@")) return "Invalid email";
  if (form.password.length < 6) return "Password too short";
  return "";
}

