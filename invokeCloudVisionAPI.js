const admin = require('firebase-admin');
// Imports the Google Cloud client libraries
const vision = require('@google-cloud/vision');

const serviceAccount = require('./firebaseServiceAccountKey.json');
const serviceAccount2 = require('./cloudVisionAPIServiceAccountKey.json');
const { DocumentSnapshot } = require('@google-cloud/firestore');
//initialize admin SDK using serviceAcountKey
admin.initializeApp({
   credential: admin.credential.cert(serviceAccount2)
});

const db = admin.firestore();

const images = [];

db.collection('textAndImageContent').get()
   .then(snapshot => {
      snapshot.forEach(doc => { 
         console.log('image is:', doc.data().imageInput);
         images.push(doc.data().imageInput);
   })
   main();
}).catch(error => {
   console.log(error);
});



function asyncImageTask(image) {
   // Creates a client
   const client = new vision.ImageAnnotatorClient();
   const resultDet = client.safeSearchDetection(image);
   return resultDet;
}

async function main() {
   images.forEach(async (item, index) => {
      const docRef = await asyncImageTask(item).catch(error => console.error(error));
      console.log(index," : ", item);
      //console.log('docRef:', docRef)
      console.log('Adult:', docRef[0].safeSearchAnnotation.adult);
      console.log('Spoof:', docRef[0].safeSearchAnnotation.spoof);
      console.log('Medical:', docRef[0].safeSearchAnnotation.medical);
      console.log('Violence:', docRef[0].safeSearchAnnotation.violence);
    });
}
