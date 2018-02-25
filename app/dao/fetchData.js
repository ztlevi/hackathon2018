require('es6-promise').polyfill();
require('isomorphic-fetch');

function fetchData() {
  return new Promise((resolve, reject) => {
    fetch(
      'https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=BTC&mar' +
        'ket=CNY&apikey=92FYESS7FEE4K2I1'
    )
      .then(response => {
        if (response.status >= 400) {
          throw new Error('Bad response from server');
        }
        return response.json();
      })
      .then(stories => {
        console.log(stories);
        return stories;
      })
      .catch(e => {
        reject(e);
      });
  });
}

module.exports = {
  fetchData,
};
