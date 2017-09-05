const Handlebars = require('handlebars');

module.exports = {
  ifModulus() {
    return Handlebars.registerHelper('ifModulus', (index, mod, block) => {
      const condition = parseInt(index, 10) % parseInt(mod, 10) === 0;
      return condition ? block.fn(this.ifModulus) : false;
    });
  },
  trimSlashes() {
    return Handlebars.registerHelper('trimSlashes', (context) => {
      const string = context.slice(1, -1);
      return new Handlebars.SafeString(string);
    });
  },
  ifConditional() {
    return Handlebars.registerHelper('ifConditional', (...condition) => {
      const block = condition.pop();
      const context = condition.shift();
      for (let i = 0; i < condition.length; i += 1) {
        if (context === condition[i]) {
          return block.fn(this);
        }
      }
    });
  },
};
