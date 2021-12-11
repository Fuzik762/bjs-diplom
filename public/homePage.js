logoutButton = new LogoutButton();
ratesBoard = new RatesBoard();
moneyManager = new MoneyManager();
favoritesWidget = new FavoritesWidget();


logoutButton.action = () =>
  ApiConnector.logout((response) => {
      if (response.success) {
        location.reload();
      }
  });

ApiConnector.current((response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
    }
});

const getRatesBoard = () => {
  ApiConnector.getStocks((response) => {
      if (response.success) {
        ratesBoard.clearTable();
        ratesBoard.fillTable(response.data);
      }
  });
};

getRatesBoard();

setInterval(getRatesBoard, 60000);

moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, (response) => {
      if (response.success) {
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(
          response.success,
          `Пополнение на ${data.amount} ${data.currency} успешно!`
        );
      } else if ("error" in response) {
        moneyManager.setMessage(response.success, response.error);
      }
  });
};

moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, (response) => {
      if (response.success) {
        console.log(response.data);
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(
          response.success,
          `Конвертация ${data.fromAmount} ${data.fromCurrency} в ${data.targetCurrency} успешно!`
        );
      } else if ("error" in response) {
        moneyManager.setMessage(response.success, response.error);
      }
  });
};

moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, (response) => {
      if (response.success) {
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(response.success, `Успешно переведено ${data.amount} ${data.currency} пользователю с id ${data.to}!`);
      } else if ("error" in response) {
        moneyManager.setMessage(response.success, response.error);
      }
  });
};

ApiConnector.getFavorites((response) => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
    }
});

favoritesWidget.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, (response) => {
      if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
        favoritesWidget.setMessage(
          response.success,
          `Пользователь ${data.name} с id ${data.id} добавлен в избранное!`
        );
      } else if ("error" in response) {
        favoritesWidget.setMessage(response.success, response.error);
      }
  });
};

favoritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, (response) => {
        if (response.success) {
          favoritesWidget.clearTable();
          favoritesWidget.fillTable(response.data);
          moneyManager.updateUsersList(response.data);
          favoritesWidget.setMessage(
            response.success,
            `Пользователь с id ${data} удалён из избранного!`
          );
        } else if ("error" in response) {
          favoritesWidget.setMessage(response.success, response.error);
        }
    });
  };




