import * as fb from './firebase';

require('es6-promise').polyfill();
require('isomorphic-fetch');

//
function fetchAPI() {
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
      .then(data => {
        resolve(data);
      })
      .catch(e => {
        reject(e);
      });
  });
}

// TODO: add path to fetch data
function fetchData() {
  return new Promise((resolve, reject) => {
    fb
      .firebaseFetchData()
      .then(data => {
        // fetch data via API if data not exist in firebase
        if (!data.val()) {
          console.log('Fetch data via API');

          fetchAPI()
            .then(res => {
              // push data to firebase when data fetched via API
              fb.firebaseWriteData(JSON.stringify(res));
              resolve(res);
            })
            .catch(e => {
              reject(e);
            });
        } else {
          console.log('Fetched data via firebase');

          resolve(data.val());
        }
      })
      .catch(e => {
        reject(e);
      });
  });
}

module.exports = { fetchData };
