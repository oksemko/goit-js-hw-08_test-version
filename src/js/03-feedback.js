import throttle from 'lodash.throttle';

const KEY = 'feedback-form-state';
const formData = {};

const form = document.querySelector('.feedback-form');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));

updateForm();

function updateForm() {
  const saveData = localStorage.getItem(KEY);
  if (saveData) {
    const { email, message } = JSON.parse(saveData);
    form.email.value = email;
    form.message.value = message;
    formData.email = email;
    formData.message = message;
  }
}

function onFormInput(event) {
  formData.email = form.elements.email.value;
  formData.messsage = form.elements.message.value;
  localStorage.setItem(KEY, JSON.stringify(formData));
}

function onFormSubmit(event) {
  event.preventDefault();

  const formDatatoSend = newFormData(event.currentTarget);
  formDataToSend.forEach((name, value) => {
    formData[name] = value;
  });

  event.currentTarget.reset();
  localStorage.removeItem(KEY);

  console.log(formData);
}
