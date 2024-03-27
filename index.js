const admin = require('firebase-admin');
const serviceAccount = require('./firebaseServiceAccountKey.json');
//initialize admin SDK using serviceAcountKey
admin.initializeApp({
   credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

function getDialogue(){
//return a promise since we'll imitating an API call
return new Promise(function(resolve, reject) {
resolve({
    "quote":"I'm Batman",
    "author":"Batman"
});
})
}

getDialogue().then(result =>{
   console.log(result);
   const obj = result;
   const quoteData = {
      quote: obj.quote,
      author: obj.author
};
   return db.collection('sampleData').doc('inspiration')
   .set(quoteData).then(() =>
   console.log('new Dialogue written to database'));
});