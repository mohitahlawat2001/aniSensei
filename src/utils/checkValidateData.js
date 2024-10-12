export const checkValidateData = (name, email, password) => {
    if (name && name.length < 3) {
        return "Name must contain at least 3 characters";
    }
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

    if (!isEmailValid) {
        return "Please enter a valid email";
    }
    if (!isPasswordValid) {
        return "Password must contain at least 8 characters, including UPPER/lowercase and numbers";
    }
    return null;
}
