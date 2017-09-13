// import injectHtml from './lib/module-example';
//
// injectHtml('module-test', 'es6 Module Test');

const mtg = require('mtgsdk');

mtg.card.find(150)
.then(result => {
    console.log(result.card) // "Black Lotus"
});
