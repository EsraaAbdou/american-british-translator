'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const text = req.body.text;
      const locale = req.body.locale;
      if(!req.body.hasOwnProperty('text') || !req.body.hasOwnProperty('locale')) {
        res.send({"error": "Required field(s) missing"});
      } else if(locale !== "american-to-british" && locale !== "british-to-american") {
        res.send({"error": "Invalid value for locale field"});
      } else if(text) {
        const translator = new Translator(text, locale, true);
        res.send({
          "text": text,
          "translation": translator.translatedText
        });
      } else {
        res.send({"error": "No text to translate"});
      }
    });
};
