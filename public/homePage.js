logoutButton = new LogoutButton();
ratesBoard = new RatesBoard();
moneyManager = new MoneyManager();
favoritesWidget = new FavoritesWidget();
let timeout;
timeout = 100;

logoutButton.action = () =>
  ApiConnector.logout((response) => {
    setTimeout(() => {
      if (response.success === true) {
        setTimeout(() => window.location.reload());
      }
    }, timeout);
  });

ApiConnector.current((response) => {
  setTimeout(() => {
    if (response.success === true) {
      ProfileWidget.showProfile(response.data);
    }
  }, timeout);
});

getRatesBoard = () => {
  ApiConnector.getStocks((response) => {
    setTimeout(() => {
      if (response.success === true) {
        ratesBoard.clearTable();
        ratesBoard.fillTable(response.data);
      }
    }, timeout);
  });
};
getRatesBoard();

moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, (response) => {
    setTimeout(() => {
      if (response.success === true) {
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(
          response.success,
          `Пополнение на ${data.amount} ${data.currency} успешно!`
        );
      } else if ("error" in response) {
        moneyManager.setMessage(response.success, response.error);
      }
    }, timeout);
  });
};

moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, (response) => {
    setTimeout(() => {
      if (response.success === true) {
        console.log(response.data);
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(
          response.success,
          `Конвертация ${data.fromAmount} ${data.fromCurrency} в ${data.targetCurrency} успешно!`
        );
      } else if ("error" in response) {
        moneyManager.setMessage(response.success, response.error);
      }
    }, timeout);
  });
};

moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, (response) => {
    setTimeout(() => {
      if (response === true) {
        console.log(response.data);
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(response.success, `Успешно переведено ${data.amount} ${data.currency} пользователю с id ${data.to}!`);
      }
    }, timeout);
  });
};

ApiConnector.getFavorites((response) => {
  setTimeout(() => {
    if (response === true) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
    }
  }, timeout);
});

favoritesWidget.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, (response) => {
    setTimeout(() => {
      if (response.success === true) {
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
    }, timeout);
  });
};

favoritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, (response) => {
      setTimeout(() => {
        if (response.success === true) {
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
      }, timeout);
    });
  };



setInterval(() => {
  getRatesBoard();
}, 60000);
