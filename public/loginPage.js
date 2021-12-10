"use strict";

let data;
const userForm = new UserForm();

userForm.loginFormCallback = (data) =>
  ApiConnector.login(data, (response) => {
    setTimeout(function () {
      if (response.succes === true) {
        setTimeout(() => window.location.reload());
      } else if ("error" in response) {
        userForm.setLoginErrorMessage(response.error);
      }
    }, 50);
  });

userForm.registerFormCallback = (data) =>
  ApiConnector.register(data, (response) => {
    setTimeout(function () {
      if (response.succes === true) {
        setTimeout(() => window.location.reload());
      } else if ("error" in response) {
        userForm.setRegisterErrorMessage(response.error);
      }
    }, 50);
  });
