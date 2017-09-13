const mtg = require('mtgsdk');
const fs = require('fs');

// loops through all cards and stringify's each object then appends to all-cards.json

const getAllCards = function getAllCards() {
  mtg.card.all()
    .on('data', (card) => {
      const cardObj = {
        name: card.name,
        img: card.imageUrl || null,
      };
      const cardObjJSON = JSON.stringify(cardObj);
      fs.appendFileSync('../data/all-cards.json', cardObjJSON, (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
};

getAllCards();

// WRITE EVERYTHING INTO ONE FUNCTION USING CALLBACKS SO THE DATA NEVER LEAVES THE FUNCTION
