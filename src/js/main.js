// import injectHtml from './lib/module-example';
//
// injectHtml('module-test', 'es6 Module Test');

const mtg = require('mtgsdk')

// mtg.card.find(3)
// .then(result => {
//     console.log(result.card.name) // "Black Lotus"
// });
//
// mtg.set.find('AER')
// .then(result => {
//     console.log(result.set.name) // "Aether Revolt"
// });
// mtg.card.find(3).then
//   ((result => {
//     console.log(result.card) // prints whole object
//   }));

// BELOW prints every card's imageUrl
// mtg.card.all()
// .on('data', function (card) {
//   if (card.hasOwnProperty("imageUrl")) {
//     console.log(card.imageUrl)
//   }
// });

// BELOW searches for card name but takes a really long time to loop through all cards
// mtg.card.all()
// .on('data', function (card){
//   if (card.name == "Tarmogoyf"){
//     console.log(card);
//   }
//   });

// ****** Suggestion, Maybe search through all the cards and only return the first result that contains an image.
// ****** Search in multiple directions for quicker results.
let func = 0;
console.time(func);
mtg.card.all()
  .on('data', function(card){
  if (card.name == "test"){
    console.log(card.name);
  }
});
console.timeEnd(func);
//*** new sets "not found" query api again
