const modal = document.getElementById("contact_modal");
const main = document.querySelector("main");

//Affiche le formulaire de contact
function displayModal() { // eslint-disable-line no-unused-vars
  modal.style.display = "block";
  modal.setAttribute("aria-hidden", "false");
  main.setAttribute("aria-hidden", "true");
  main.style.opacity = "30%";
}

//Ferme le formulaire de contact
function closeModal() {
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  main.setAttribute("aria-hidden", "false");
  main.style.opacity = "unset";
}

modal.addEventListener("keyup", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});

modal.addEventListener("click", (e) => {
  if (e.target === e.currentTarget) {
    closeModal();
  }
});

function getForm() {
  let firstName = document.getElementById("firstName");
  let lastName = document.getElementById("lastName");
  let email = document.getElementById("email");
  let message = document.getElementById("message");
  let data = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    message: message.value,
  };
  console.log(data);
}

const form = document.getElementById("form");
const btn = document.getElementById("contact_button");
btn.addEventListener("click", function (e) {
  e.preventDefault();
  getForm();
  closeModal();
  form.reset();
});
