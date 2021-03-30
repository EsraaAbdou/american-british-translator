const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
    constructor(text, locale) {
        this.text = text;
        this.locale = locale;
    }
    get translatedText() {
        return this.getTranslatedText();
    }
    getTranslatedText() {
        let translation = this.text.charAt(0).toUpperCase() + this.text.slice(1);
        if(this.locale == "american-to-british") {

            let matchedPropertyArr = [];
            for (const property in americanOnly) {
                if(translation.toLowerCase().includes(property)) matchedPropertyArr.push(property);
            }
            replaceMatch(americanOnly);
   
            matchedPropertyArr = [];
            for (const property in americanToBritishSpelling) {
                if(translation.toLowerCase().includes(property)) matchedPropertyArr.push(property);
            }
            replaceMatch(americanToBritishSpelling);

            matchedPropertyArr = [];
            for (const property in americanToBritishTitles) {
                if(translation.toLowerCase().includes(property) || translation.toLowerCase().includes(americanToBritishTitles[property]))
                    matchedPropertyArr.push(property);
            }
            replaceMatch(americanToBritishTitles, true);

            const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
            const timeStrings = translation.split(" ").filter(d => timeRegex.test(d) == true);
            const newTimeStrings = timeStrings.map(element => element.replace(":", "."));
            timeStrings.forEach((element, idx) => {
                translation = translation.replace(element, `<span class="highlight">${newTimeStrings[idx]}</span>`);
            });

            return translation;

            function replaceMatch(obj, titleFlag = false) {
                if(matchedPropertyArr.length > 0) {
                    const property = matchedPropertyArr.sort((a, b) => b.length - a.length)[0];
                    const firstIdx = translation.toLowerCase().search(property);
                    const secondIdx = firstIdx + property.length;
                    const toBeRepalced = translation.slice(firstIdx, secondIdx);
                    let replacement = obj[property];
                    if(titleFlag) replacement = replacement.charAt(0).toUpperCase() + replacement.slice(1);
                    translation = translation.replace(toBeRepalced, `<span class="highlight">${replacement}</span>`);
                }
            }
        } else if (this.locale == "british-to-american"){
            translationArr = textArr.map(word => {
                const lowerCasedWord = word.toLowerCase();
                const timeRegex = /^([01]?[0-9]|2[0-3])\.[0-5][0-9]$/;
                if(timeRegex.test(word)) {
                    const returning = word.replace('.', ':');
                    return `<span class="highlight">${returning}</span>`
                }
                if(britishOnly[lowerCasedWord]) {
                    const returning = britishOnly[lowerCasedWord];
                    return `<span class="highlight">${returning}</span>`
                }
                if(americanToBritishTitles[lowerCasedWord]) {
                    const returning = lowerCasedWord.charAt(0).toUpperCase() + lowerCasedWord.slice(1);
                    return `<span class="highlight">${returning}</span>`
                }
                for (const property in americanToBritishTitles) {
                    if(americanToBritishTitles[property] == lowerCasedWord) {
                        const returning = property.charAt(0).toUpperCase() + property.slice(1);
                        return `<span class="highlight">${returning}</span>`
                    }
                }
                for (const property in americanToBritishSpelling) {
                    if(americanToBritishSpelling[property] == lowerCasedWord) {
                        const returning = property;
                        return `<span class="highlight">${returning}</span>`
                    }
                }
                return word;
            });
        }
        return translation;
    }
}

module.exports = Translator;