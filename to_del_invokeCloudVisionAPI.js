const admin = require('firebase-admin');
// Imports the Google Cloud client libraries
const vision = require('@google-cloud/vision');

const serviceAccount1 = require('./firebaseServiceAccountKey.json');
const serviceAccount2 = require('./cloudVisionAPIServiceAccountKey.json')
//initialize admin SDK using serviceAcountKey
admin.initializeApp({
   credential: admin.credential.cert(serviceAccount2)
});

/*
const db = admin.firestore();

const nsfwDoc = db.collection('textAndImageContent')
   .doc('WEcYf37nVwY6lDLLvQf9').get()
   .then((docRef) => { console.log(docRef.data()) });
*/

// Creates a client
const client = new vision.ImageAnnotatorClient();

// Performs safe search property detection on the remote file
const resultDet = client.safeSearchDetection(
  './images/gratisography-cyber-kitty-1170x780.jpg'
).then((docRef) => { 

   console.log('docRef: ${docRef}')
   const detections = resultDet.safeSearchAnnotation;
   console.log('Adult: ${docRef.adult}');
   console.log('Spoof: ${docRef.spoof}');
   console.log('Medical: ${docRef.medical}');
   console.log('Violence: ${docRef.violence}')});
