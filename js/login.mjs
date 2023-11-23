const loginForm = document.querySelector(".login__overlay");
const loginFormCOpen = document.querySelector(".link-user-img");
const loginFormClose = document.querySelector(".login__close");
loginFormCOpen.onclick = function () {
  loginForm.style.display = "flex";
};
loginFormClose.onclick = function () {
  loginForm.style.display = "none";
};

const toRegister = document.querySelector(".login__toregister");
const registerForm = document.querySelector(".register__overlay");
toRegister.onclick = function () {
  registerForm.style.display = "flex";
};
const registerFormClose = document.querySelector(".register__close");
registerFormClose.onclick = function () {
  registerForm.style.display = "none";
};
const password = document.querySelector(".register__password");
const repeatPassword = document.querySelector(".register__repeat-password");

function checkMatchingPasswords() {
  const password = document.querySelector(".register__password").value;
  const repeatPassword = document.querySelector(
    ".register__repeat-password"
  ).value;
  return password === repeatPassword;
}
function checkEmail() {
  const inputEmail = document.querySelector(".register__email").value;
  const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailPattern.test(inputEmail);
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
    // Get the current timestamp
    const timestamp = new Date().getTime();

    // Generate a random number between 1 and 1000 (adjust the range as needed)
    const randomNumber = Math.floor(Math.random() * 1000) + 1;

    // Combine timestamp and random number to create a unique ID
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

    // Return the user ID of the newly added user
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
    this.saveUserId(null); // Set login status to false
    // Perform any other necessary actions for logging out
  }
  authenticateUser(phone, password) {
    const userData = this.getSavedUserData();

    console.log("Entered phone and password:", phone, password);
    console.log("Stored user data:", userData);

    if (Array.isArray(userData) && userData.length > 0) {
      // Find the user with matching phone and password
      const matchingUser = userData.find(
        (user) => user.phone === phone && user.password === password
      );

      if (matchingUser) {
        this.setLoginStatus(true); // Set login status to true
        this.saveUserId(matchingUser.id);
        return matchingUser.id; // Return the user ID
      }
    }

    console.log("Authentication failed");
    return null; // Authentication failed
  }
  getCurrentUserId() {
    const loggedIn = this.isUserLoggedIn();
    console.log("Is user logged in:", loggedIn);

    if (loggedIn) {
      const userId = localStorage.getItem(this.userIdKey);
      console.log("User ID from localStorage:", userId);
      return userId;
    }

    return null;
  }
  saveCartItem(cartItem) {
    const userId = cartItem.userId;
    const key = `cartData_${userId}`;
    console.log("Saving cart data for key:", key);

    // Retrieve existing cart data
    const cartData = this.getSavedCartData(userId) || [];

    // Check if the product is already in the cart
    const existingCartItemIndex = cartData.findIndex(
      (item) => item.productId === cartItem.productId
    );

    if (existingCartItemIndex !== -1) {
      // Update existing item
      cartData[existingCartItemIndex].quantity = cartItem.quantity;
    } else {
      // Add new item to the cart
      cartData.push(cartItem);
    }

    // Save the updated data back to local storage
    localStorage.setItem(key, JSON.stringify(cartData));
  }

  getSavedCartData(userId) {
    const key = `cartData_${userId}`;
    console.log("Attempting to retrieve cart data for key:", key);

    const savedData = localStorage.getItem(key);

    if (savedData) {
      return JSON.parse(savedData);
    }

    return null;
  }

  loadCartDataFromLocalStorage() {
    // Retrieve existing data from local storage
    const existingData = localStorage.getItem(this.cartLocalStorageKey);

    // Parse existing data if it exists, or initialize an empty array
    return existingData ? JSON.parse(existingData) : [];
  }

  saveUserId(userId) {
    localStorage.setItem(this.userIdKey, userId);
  }

  // Додайте метод для отримання ідентифікатора поточного користувача
  clearUserId() {
    localStorage.removeItem("userId");
  }
  generateUserId() {
    // Get the current timestamp
    const timestamp = new Date().getTime();

    // Generate a random number between 1 and 1000 (adjust the range as needed)
    const randomNumber = Math.floor(Math.random() * 1000) + 1;

    // Combine timestamp and random number to create a unique ID
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

    // Create a new user ID (you can use, for example, the current timestamp)
    const userId = Date.now().toString();
    // Other necessary actions during registration

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
  // Create a new user instance without an ID
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

  // Other necessary actions during registration
}

function initializeForm() {
  const registrationManager = new RegistrationManager();
  const savedUserData = registrationManager.getSavedUserData();

  if (savedUserData) {
    document.querySelector(".register__username").value =
      savedUserData.firstName;
    document.querySelector(".register__lastname").value =
      savedUserData.lastName;
    document.querySelector(".register__datebirthday").value =
      savedUserData.birthDate;
    document.querySelector(".register__email").value = savedUserData.email;
    document.querySelector(".register__phone").value = savedUserData.phone;
    document.querySelector(".register__password").value =
      savedUserData.password;
  }
}
function attemptLogin() {
  console.log("Attempting to login...");
  const phoneInput = document.querySelector(".login__number");
  const passwordInput = document.querySelector(".login__password");
  const errorMessage = document.querySelector(".login__error-message");

  // Check if phone number and password are not empty
  const phone = phoneInput.value.trim();
  const password = passwordInput.value.trim();

  if (!phone || !password) {
    // Display an error message or take appropriate action for empty fields
    errorMessage.textContent = "Please enter both phone number and password.";
    return false;
  }

  // Clear any previous error messages
  errorMessage.textContent = "";

  // Attempt to authenticate user
  const registrationManager = new RegistrationManager();
  const userId = registrationManager.authenticateUser(phone, password);

  if (userId) {
    // Authentication successful
    console.log("Congratulations! Login successful");
    console.log("Current User ID:", userId);

    // Clear the password field for security and user experience
    passwordInput.value = "";

    // Provide feedback to the user (redirect, display welcome message, etc.)
    // Example: window.location.href = "/welcome";
  } else {
    // Authentication failed
    errorMessage.textContent =
      "Invalid phone number or password. Please try again.";
    console.log("Login failed");
  }
}

export { RegistrationManager, attemptLogin };

document
  .querySelector(".register__button")
  .addEventListener("click", saveRegistrationData);
const loginButton = document.querySelector(".login__button");
const logoutButton = document.querySelector(".logout__button");
const errorMessage = document.querySelector(".login__error-message");

loginButton.addEventListener("click", () => {
  console.log("Login button clicked;");
  if (attemptLogin()) {
    console.log("Login successful");
  } else {
    console.log("Login failed");
  }
});
logoutButton.addEventListener("click", () => {
  const registrationManager = new RegistrationManager();
  registrationManager.logout();
});
document.addEventListener("DOMContentLoaded", function () {
  const registrationManager = new RegistrationManager();
  const userId = registrationManager.getCurrentUserId();

  if (userId) {
    // Отримайте дані кошика для поточного користувача
    const cartData = getCartDataForUser(userId);

    // Перевірте, чи є дані в localStorage, та відобразіть продукти, якщо вони є
    /* if (cartData && cartData.length > 0) {
      displayProductsInCart(cartData);
    }*/
  }

  // Інші функції та події можуть йти тут
});

function getCartDataForUser(userId) {
  const savedData = localStorage.getItem(`cartData_${userId}`);

  if (savedData) {
    return JSON.parse(savedData);
  }

  return null;
}

function saveCartDataForUser(userId, cartData) {
  localStorage.setItem(`cartData_${userId}`, JSON.stringify(cartData));
}

function clearCartDataForUser(userId) {
  localStorage.removeItem(`cartData_${userId}`);
}

/*function displayProductsInCart(cartData) {
  const basketOutput = document.querySelector(".basket__products");

  // Очистити контейнер перед відображенням нових продуктів
  basketOutput.innerHTML = "";

  // Відобразити кожен продукт в кошику
  cartData.forEach((cartItem) => {
    const cartProductElement = createCartProduct(
      cartItem.id,
      cartItem.quantity
    );
    if (cartProductElement) {
      basketOutput.appendChild(cartProductElement);
    }
  });
}
*/
