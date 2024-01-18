const [form] = document.forms;
const [Name, familyName, email, password, confirmPassword, birth] =
  document.querySelectorAll(".Invalid-message");

const isNameValid = (name) => {
  return (
    name.length > 2 &&
    (/^[A-Za-z0-9 ]*$/g.test(name) || /^[A-ЯЁа-яё0-9 ]+$/g.test(name))
  );
};

const isEmailValid = (email) => {
  return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(
    email
  );
};

const isPasswordValid = (password) => {
  return /^((?=.*[\d])(?=.*[a-z])(?=.*[A-Z])|(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s])|(?=.*[\d])(?=.*[A-Z])(?=.*[^\w\d\s])|(?=.*[\d])(?=.*[a-z])(?=.*[^\w\d\s])).{8}$/gm.test(
    password
  );
};

const isPasswordMatch = (password, confirmPassword) => {
  return !!confirmPassword && password === confirmPassword;
};

const isBirthValid = (date) => {
  return new Date(date) < new Date().getFillYear() - 18 ? true : false;
};

const validation = (
  name,
  familyName,
  email,
  password,
  confirmPassword,
  date
) => {
  return (
    isNameValid(name) &&
    isNameValid(familyName) &&
    isEmailValid(email) &&
    isPasswordValid(password) &&
    isPasswordMatch(password, confirmPassword) &&
    isBirthValid(date)
  );
};

const toggleShowPassword = (checkbox, passInputs) => {
  checkbox.addEventListener("change", (e) => {
    passInputs.forEach((input) => {
      input.setAttribute("type", e.target.checked ? "text" : "password");
    });
  });
};

const getElement = (field, e) => {
  return {
    name(e) {
      e.target.classList.toggle(
        "Invalid-message",
        !isNameValid(e.target.value)
      );

      Name.textContent = isNameValid(e.target.value)
        ? null
        : "Имя должно быть больше двух символов и может содержать только буквы или цифры";
    },
    familyName(e) {
      e.target.classList.toggle(
        "Invalid-message",
        !isNameValid(e.target.value)
      );
      familyName.textContent = isNameValid(e.target.value)
        ? null
        : "Фамилия должна быть больше двух символов и может содержать только буквы или цифры";
    },
    email(e) {
      e.target.classList.toggle(
        "Invalid-message",
        !isEmailValid(e.target.value)
      );
      email.textContent = isEmailValid(e.target.value)
        ? null
        : "Неверный email";
    },
    password(e) {
      e.target.classList.toggle(
        "Invalid-message",
        !isPasswordValid(e.target.value)
      );
      password.textContent = isPasswordValid(e.target.value)
        ? null
        : "Пароль должен содержать как минимум 8 символов, заглавную букву, цифру или специальный символ";

      form.confirmPassword.classList.toggle(
        "Invalid-message",
        !isPasswordMatch(e.target.value, form.confirmPassword.value)
      );
      confirmPassword.textContent = isPasswordMatch(
        e.target.value,
        form.confirmPassword.value
      )
        ? null
        : "Пароль не совпадает";
    },
    confirmPassword(e) {
      e.target.classList.toggle(
        "Invalid-message",
        !isPasswordMatch(form.password.value, e.target.value)
      );
      confirmPassword.textContent = isPasswordMatch(
        form.password.value,
        e.target.value
      )
        ? null
        : "Пароль не совпадает";
    },
    birth(e) {
      e.target.classList.toggle(
        "Invalid-message",
        !isBirthValid(form.birth.value)
      );
      birth.textContent = isBirthValid(form.birth.value)
        ? null
        : "Введите корректную дату рождения";
    },
  }[field](e);
};

const handleInput = (e) => {
  const {
    name: formName,
    familyName,
    email,
    password,
    confirmPassword,
    birth,
    submitBtn,
  } = form;
  const { name } = e.target;

  getElement(name, e);

  submitBtn.disabled = !validation(
    formName.value,
    familyName.value,
    email.value,
    password.value,
    confirmPassword.value,
    birth.value
  );
};

document.addEventListener("DOMContentLoaded", () => {
  toggleShowPassword(form.showPassword, [form.password, form.confirmPassword]);

  form.name.addEventListener("input", handleInput);

  form.familyName.addEventListener("input", handleInput);

  form.email.addEventListener("input", handleInput);

  form.password.addEventListener("input", handleInput);

  form.confirmPassword.addEventListener("input", handleInput);

  form.birth.addEventListener("input", handleInput);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const { name, familyName, email, password, confirmPassword, birth } =
      e.target;
    console.log({
      name: name.value,
      familyName: familyName.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
      dateBirth: birth.value,
    });
  });
});
