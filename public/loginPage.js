"use strict";

const userForm = new UserForm();

userForm.loginFormCallback = (data) =>
  ApiConnector.login(data, (response) => {
      if (response.succes) {
        location.reload();
      } else if ("error" in response) {
        userForm.setLoginErrorMessage(response.error);
      }
  });

userForm.registerFormCallback = (data) =>
  ApiConnector.register(data, (response) => {
      if (response.succes) {
        location.reload();
      } else if ("error" in response) {
        userForm.setRegisterErrorMessage(response.error);
      }
  });
