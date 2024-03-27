const admin = require('firebase-admin');
const serviceAccount = require('./firebaseServiceAccountKey.json');
const serviceAccount2 = require('./cloudVisionAPIServiceAccountKey.json')

//initialize admin SDK using serviceAcountKey
admin.initializeApp({
   credential: admin.credential.cert(serviceAccount2)
});
const db = admin.firestore();

const nsfwDoc = db.collection('textAndImageContent')
   .doc('WEcYf37nVwY6lDLLvQf9').get()
   .then((docRef) => { console.log(docRef.data()) });
