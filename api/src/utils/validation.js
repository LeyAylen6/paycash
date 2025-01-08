const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

const isValidPeople = (data) => {
    const { name, lastname, gender, birthdate, email, phone, maritalStatus } = data;

    return name && lastname && gender && birthdate && email && isValidEmail(email) && phone && maritalStatus
};

module.exports = {
    isValidPeople
}
