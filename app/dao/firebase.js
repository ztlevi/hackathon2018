import * as firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyD7n7J0IIbjZ7Ug8oUstWXNvdwRB6ivSzg',
  authDomain: 'hackathon2018-2d039.firebaseapp.com',
  databaseURL: 'https://hackathon2018-2d039.firebaseio.com',
  projectId: 'hackathon2018-2d039',
  storageBucket: 'hackathon2018-2d039.appspot.com',
  messagingSenderId: '462392782061',
};
firebase.initializeApp(config);

function firebaseWriteData(data) {
  console.log('Push data to firebase...');

  firebase
    .database()
    .ref('data/')
    .set(data);
}

function firebaseFetchData() {
  return firebase
    .database()
    .ref('data/')
    .once('value')
    .then(data => {
      if (!data) return;
      return Promise.resolve(data);
    })
    .catch(e => Promise.reject(e));
}

module.exports = {
  firebaseWriteData,
  firebaseFetchData,
};
