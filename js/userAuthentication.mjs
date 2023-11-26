const loginForm = document.querySelector(".login__overlay");
const loginFormCOpen = document.querySelector(".link-user-img");
const loginFormClose = document.querySelector(".login__close");
const userInfo = document.querySelector(".user__info");
loginFormCOpen.onclick = function () {
  const registrationManager = new RegistrationManager();
  const isLoggedIn = registrationManager.isUserLoggedIn();
  if (isLoggedIn) {
    getUserInfo();
    userInfo.classList.toggle("show");
  } else {
    loginForm.style.display = "flex";
  }
};
loginFormClose.onclick = function () {
  loginForm.style.display = "none";
};

const toRegister = document.querySelector(".login__toregister");
const registerForm = document.querySelector(".register__overlay");
toRegister.onclick = function () {
  registerForm.style.display = "flex";
  loginForm.style.display = "none";
};
const registerFormClose = document.querySelector(".register__close");
registerFormClose.onclick = function () {
  registerForm.style.display = "none";
};
const loginButtonOpen = document.querySelector(".register__bottom__login");
loginButtonOpen.onclick = function () {
  loginForm.style.display = "flex";
  registerForm.style.display = "none";
};

function validateForm() {
  const inputs = {
    firstName: document.querySelector(".register__username"),
    lastName: document.querySelector(".register__lastname"),
    dateBirthday: document.querySelector(".register__datebirthday"),
    email: document.querySelector(".register__email"),
    phone: document.querySelector(".register__phone"),
    password: document.querySelector(".register__password"),
    repeatPassword: document.querySelector(".register__repeat-password"),
  };

  const errors = {
    firstName: document.querySelector(".register__username__error"),
    lastName: document.querySelector(".register__lastname__error"),
    dateBirthday: document.querySelector(".register__datebirthday__error"),
    email: document.querySelector(".register__email__error"),
    phone: document.querySelector(".register__phone__error"),
    password: document.querySelector(".register__password__error"),
    repeatPassword: document.querySelector(".register__repeat-password__error"),
  };

  const errorMessage = document.querySelector(".error__message__out");

  const errorMessages = {
    required: "Це поле не може бути порожнім",
    invalidName: "Некоректно введене ім'я",
    invalidDate: "Некоректно введена дата",
    invalidEmail: "Некоректно введена адреса електронної пошти",
    invalidPhone: "Некоректно введений номер телефону",
    invalidPassword: "Довжинна пароля не менше 8 символів",
    passwordMismatch: "Паролі повинні співпадати",
  };

  validateField(
    inputs.firstName,
    errors.firstName,
    errorMessages.required,
    errorMessages.invalidName,
    isValidName
  );
  validateField(
    inputs.lastName,
    errors.lastName,
    errorMessages.required,
    errorMessages.invalidName,
    isValidName
  );
  validateField(
    inputs.dateBirthday,
    errors.dateBirthday,
    errorMessages.required,
    errorMessages.invalidDate,
    IsValidBirthYear
  );
  validateField(
    inputs.email,
    errors.email,
    errorMessages.required,
    errorMessages.invalidEmail,
    isValidEmail
  );
  validateField(
    inputs.phone,
    errors.phone,
    errorMessages.required,
    errorMessages.invalidPhone,
    isValidPhoneNumber
  );
  validateField(
    inputs.password,
    errors.password,
    errorMessages.required,
    errorMessages.invalidPassword,
    isValidPassword
  );
  validateField(
    inputs.repeatPassword,
    errors.repeatPassword,
    errorMessages.required,
    errorMessages.passwordMismatch,
    (value) => passwordsMatch(value, inputs.password.value)
  );
  const isChecked = validateCheckBox();
  const isEmailInUsed = isEmailAlreadyUsed(inputs.email, errors.email);
  const isPhoneInUsed = isPhoneAlreadyUsed(inputs.phone, errors.phone);

  if (!hasErrors(errors) && isChecked && !isEmailInUsed && !isPhoneInUsed) {
    saveRegistrationData();
    return true;
  }
}

function validateField(
  input,
  errorElement,
  requiredMessage,
  invalidMessage,
  validationFunction
) {
  const value = input.value.trim();
  errorElement.textContent = "";
  input.style.borderColor = "#009246";
  if (value === "") {
    errorElement.textContent = requiredMessage;
    input.style.borderColor = "#d22730";
  } else if (validationFunction && !validationFunction(value)) {
    errorElement.textContent = invalidMessage;
    input.style.borderColor = "#d22730";
  }
}
function validateCheckBox() {
  const checkbox = document.querySelector(".register__rulesofuse__checkbox");
  const checkboxError = document.querySelector(".register__checkbox__error");

  if (!checkbox.checked) {
    checkboxError.textContent = "Ви повинні підтвердити правила";
  } else {
    checkboxError.textContent = "";
    return true;
  }
}
function hasErrors(errors) {
  return Object.values(errors).some((error) => error.textContent !== "");
}

function isValidPassword(password) {
  return password.length >= 8;
}

function isValidEmail(emailInput) {
  const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailPattern.test(emailInput);
}
function isEmailAlreadyUsed(email, emailError) {
  const registrationManager = new RegistrationManager();
  const users = registrationManager.getSavedUserData();

  const currentUser = users.find((user) => user.email === email.value);
  if (currentUser) {
    emailError.textContent = "Ця пошта вже використовується!";
    email.style.borderColor = "#d22730";
    return true;
  }

  return false;
}
function isPhoneAlreadyUsed(phone, phoneError) {
  const registrationManager = new RegistrationManager();
  const users = registrationManager.getSavedUserData();

  const currentUser = users.find((user) => user.phone === phone.value);
  if (currentUser) {
    phoneError.textContent = "Цей номер вже використовується!";
    phone.style.borderColor = "#d22730";
    return true;
  }

  return false;
}
function isValidPhoneNumber(phoneInput) {
  const phonePattern =
    /((\+38)?\(?\d{3}\)?[\s\.-]?(\d{7}|\d{3}[\s\.-]\d{2}[\s\.-]\d{2}|\d{3}-\d{4}))/;
  return phonePattern.test(phoneInput);
}
function IsValidBirthYear(birthDateInput) {
  const [year, month, day] = birthDateInput.split("-");
  const currentYear = new Date().getFullYear();
  const birthYear = parseInt(year, 10);
  return !isNaN(birthYear) && birthYear >= 1900 && birthYear <= currentYear;
}

function isValidName(name) {
  const nameRegex = /^[А-Я][а-я]+$/;
  const isValidLength = name.length >= 2 && name.length <= 50;
  return nameRegex.test(name) && isValidLength;
}
function passwordsMatch(password, repeatPassword) {
  return password === repeatPassword;
}

class User {
  constructor(id, firstName, lastName, birthDate, email, phone, password) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDate = birthDate;
    this.email = email;
    this.phone = phone;
    this.password = password;
  }
}
class RegistrationManager {
  constructor() {
    this.localStorageKey = "userData";
    this.cartStorageKey = "cartData";
    this.loginStatusKey = "isLoggedIn";
    this.userIdKey = "userId";
  }
  generateUserId() {
    const timestamp = new Date().getTime();
    const randomNumber = Math.floor(Math.random() * 1000) + 1;
    const userId = `${timestamp}${randomNumber}`;
    return userId;
  }
  saveUserData(user) {
    const existingUserData = this.getSavedUserData() || [];
    const userDataArray = Array.isArray(existingUserData)
      ? existingUserData
      : [];
    userDataArray.push(user);
    localStorage.setItem(this.localStorageKey, JSON.stringify(userDataArray));
    return user.id;
  }
  getSavedUserData() {
    const savedData = localStorage.getItem(this.localStorageKey);
    if (savedData) {
      return JSON.parse(savedData);
    }
    return null;
  }
  isUserRegistered() {
    return this.getSavedUserData() !== null;
  }
  setLoginStatus(isLoggedIn) {
    localStorage.setItem(this.loginStatusKey, isLoggedIn.toString());
  }
  isUserLoggedIn() {
    const loggedIn = localStorage.getItem(this.loginStatusKey);
    return loggedIn === "true";
  }
  logout() {
    this.setLoginStatus(false);
    this.saveUserId(null);
  }
  authenticateUser(phone, password) {
    const userData = this.getSavedUserData();

    if (Array.isArray(userData) && userData.length > 0) {
      const matchingUser = userData.find(
        (user) => user.phone === phone && user.password === password
      );

      if (matchingUser) {
        this.setLoginStatus(true);
        this.saveUserId(matchingUser.id);
        return matchingUser.id;
      }
    }

    return null;
  }
  getCurrentUserId() {
    const loggedIn = this.isUserLoggedIn();
    if (loggedIn) {
      const userId = localStorage.getItem(this.userIdKey);
      return userId;
    }
    return null;
  }
  saveCartItem(cartItem) {
    const userId = cartItem.userId;
    const key = `cartData_${userId}`;

    const cartData = this.getSavedCartData(userId) || [];

    const existingCartItemIndex = cartData.findIndex(
      (item) => item.productId === cartItem.productId
    );

    if (existingCartItemIndex !== -1) {
      cartData[existingCartItemIndex].quantity = cartItem.quantity;
    } else {
      cartData.push(cartItem);
    }

    localStorage.setItem(key, JSON.stringify(cartData));
  }

  getSavedCartData(userId) {
    const key = `cartData_${userId}`;
    const savedData = localStorage.getItem(key);
    if (savedData) {
      return JSON.parse(savedData);
    }
    return null;
  }

  loadCartDataFromLocalStorage() {
    const existingData = localStorage.getItem(this.cartLocalStorageKey);
    return existingData ? JSON.parse(existingData) : [];
  }

  saveUserId(userId) {
    localStorage.setItem(this.userIdKey, userId);
  }

  clearUserId() {
    localStorage.removeItem("userId");
  }
  generateUserId() {
    const timestamp = new Date().getTime();
    const randomNumber = Math.floor(Math.random() * 1000) + 1;
    const userId = `${timestamp}${randomNumber}`;
    return userId;
  }
  registerUser(firstName, lastName, birthDate, email, phone, password) {
    const user = new User(
      firstName,
      lastName,
      birthDate,
      email,
      phone,
      password
    );
    this.saveUserData(user);

    const userId = Date.now().toString();

    return userId;
  }
}
export default RegistrationManager;

function saveRegistrationData() {
  const firstName = document.querySelector(".register__username").value;
  const lastName = document.querySelector(".register__lastname").value;
  const birthDate = document.querySelector(".register__datebirthday").value;
  const email = document.querySelector(".register__email").value;
  const phone = document.querySelector(".register__phone").value;
  const password = document.querySelector(".register__password").value;
  const registrationManager = new RegistrationManager();
  const userId = registrationManager.generateUserId();
  registrationManager.saveUserId(userId);

  const user = new User(
    userId,
    firstName,
    lastName,
    birthDate,
    email,
    phone,
    password
  );

  registrationManager.saveUserData(user);
}

function attemptLogin() {
  const phoneInput = document.querySelector(".login__number");
  const passwordInput = document.querySelector(".login__password");
  const errorMessage = document.querySelector(".login__error-message");

  const phone = phoneInput.value.trim();
  const password = passwordInput.value.trim();

  if (!phone || !password) {
    errorMessage.textContent = "Не залишайте поля вводу порожніми.";
    return false;
  }

  errorMessage.textContent = "";

  const registrationManager = new RegistrationManager();
  const userId = registrationManager.authenticateUser(phone, password);

  if (userId) {
    passwordInput.value = "";
    return true;
  } else {
    errorMessage.textContent =
      "Некоректно введено номер телефону або пароль. Спробуйте ще раз.";
  }
}

export { RegistrationManager, attemptLogin };
const registerSuccess = document.querySelector(".register__success__overlay");
const registerSuccessClose = document.querySelector(".register__succes__close");
document
  .querySelector(".register__button")
  .addEventListener("click", function (event) {
    const registrationManager = new RegistrationManager();
    event.preventDefault();
    if (validateForm()) {
      registerSuccess.style.display = "flex";
      registerForm.style.display = "none";
      registrationManager.setLoginStatus(true);
    }
  });
function getUserInfo() {
  const registrationManager = new RegistrationManager();
  const userId = registrationManager.getCurrentUserId();
  const users = registrationManager.getSavedUserData();

  const currentUser = users.find((user) => user.id === userId);
  let firstName;
  let lastName;
  if (currentUser) {
    firstName = currentUser.firstName;
    lastName = currentUser.lastName;
  }
  const firstNameOutput = document.querySelector(".user__info__firstname");
  const lastNameOutput = document.querySelector(".user__info__lastname");
  firstNameOutput.textContent = firstName;
  lastNameOutput.textContent = lastName;
}

const loginButton = document.querySelector(".login__button");
const logoutButton = document.querySelector(".user__logout__img");
const loginSuccess = document.querySelector(".login__success__overlay");
const loginSuccessClose = document.querySelector(".login__succes__close");
loginButton.addEventListener("click", () => {
  if (attemptLogin()) {
    loginSuccess.style.display = "flex";
    loginForm.style.display = "none";
  }
});
loginSuccessClose.addEventListener("click", () => {
  window.location.reload();
  loginSuccess.style.display = "none";
});
registerSuccessClose.addEventListener("click", () => {
  registerSuccess.style.display = "none";
});
logoutButton.addEventListener("click", () => {
  const registrationManager = new RegistrationManager();
  userInfo.style.display = "none";
  registrationManager.logout();
  window.location.reload();
});
