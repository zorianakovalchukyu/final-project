function checkName(name) {
  let regExp = /^[A-Za-z]+$/;
  let result = regExp.test(name);
  return result;
}

function validateForm() {
  const userName = document.querySelector(".input__name").value;
  checkName(userName);
  if (checkName(userName)) {
    console.log("Name is correct");
  } else {
    let userNameError = document.querySelector(".input__name__error");
    userNameError.textContent = "Use only letters A-Z a-z";
  }

  const phoneInput = document.querySelector(".input__phone");
  checkPhone(phoneInput);
  if (checkPhone(phoneInput)) {
    console.log("Phone is correct");
  } else {
    console.log("Phone is incorrect");
  }
  const emailInput = document.querySelector(".input__number");
  checkEmail(emailInput);
  if (checkEmail(emailInput)) {
    console.log("Email is correct");
  } else {
    console.log("Email is incorrect");
  }
}

const searchButton = document.querySelector(".search__button");
searchButton.addEventListener("click", () => {
  validateForm();
});
function checkPhone(phone) {
  let phoneRegEx =
    /((\+38)?\(?\d{3}\)?[\s\.-]?(\d{7}|\d{3}[\s\.-]\d{2}[\s\.-]\d{2}|\d{3}-\d{4}))/;
  let result = phoneRegEx.test(phone);
  return result;
}
function checkEmail(email) {
  let emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  let result = emailRegEx.test(email);
  return result;
}

const apiEndpoint = 'https://nominatim.openstreetmap.org/search';
const format = 'json';


async function fetchStreetSuggestions(query) {
  try {
    const response = await fetch(`${apiEndpoint}?format=${format}&q=${query}`);
    const data = await response.json();

    if (data && data.length > 0) {
      
      const streets = data.map(item => item.display_name);
      return streets;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching street suggestions:', error);
    return [];
  }
}


function handleInput(event) {
  const inputElement = event.target;
  const inputValue = inputElement.value.trim();

 
  if (inputValue !== '') {
    fetchStreetSuggestions(inputValue)
      .then(suggestions => {
 
        updateSuggestions(suggestions);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  } else {

    clearSuggestions();
  }
}


function updateSuggestions(suggestions) {
  const suggestionsContainer = document.getElementById('suggestions-container');

  suggestionsContainer.innerHTML = '';


  suggestions.forEach(suggestion => {
    const suggestionElement = document.createElement('div');
    suggestionElement.textContent = suggestion;
    suggestionsContainer.appendChild(suggestionElement);

    
    suggestionElement.addEventListener('click', () => {
    
      document.getElementById('street-input').value = suggestion;
 
      clearSuggestions();
    });
  });

  suggestionsContainer.style.display = 'block';
}


function clearSuggestions() {
  const suggestionsContainer = document.getElementById('suggestions-container');
  suggestionsContainer.innerHTML = '';
  suggestionsContainer.style.display = 'none';
}



