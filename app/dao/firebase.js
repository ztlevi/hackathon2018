import * as firebase from 'firebase';
import config from '../utils/configUtils';

firebase.initializeApp(config);

const firebaseWriteData = data => {
  console.log('Push data to firebase...');
  
  firebase
    .database()
    .ref('data/')
    .set(data);
};

const firebaseFetchData = () => 
  firebase
    .database()
    .ref('data/')
    .once('value')
    .then(data => {
      if (!data) return;
      return Promise.resolve(data);
    })
    .catch(e => Promise.reject(e));


module.exports = {
  firebaseWriteData,
  firebaseFetchData,
};
