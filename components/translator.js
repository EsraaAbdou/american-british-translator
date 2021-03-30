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
        const textArr = this.text.split(" ");
        textArr[0] = textArr[0].charAt(0).toUpperCase() + textArr[0].slice(1);
        let translationArr = [];
        if(this.locale == "american-to-british") {
            translationArr = textArr.map(word => {
                const lowerCasedWord = word.toLowerCase();
                const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
                if(timeRegex.test(word)) {
                    const returning = word.replace(':', '.');
                    return `<span class="highlight">${returning}</span>`
                }
                if(americanOnly[lowerCasedWord]) {
                    const returning =  americanOnly[lowerCasedWord];
                    return `<span class="highlight">${returning}</span>`
                }
                else if(americanToBritishSpelling[lowerCasedWord]) {
                    const returning = americanToBritishSpelling[lowerCasedWord];
                    return `<span class="highlight">${returning}</span>`
                }
                else if(americanToBritishTitles[lowerCasedWord]) {
                    const title =  americanToBritishTitles[lowerCasedWord];
                    const returning = title.charAt(0).toUpperCase() + title.slice(1);
                    return `<span class="highlight">${returning}</span>`
                }
                
                for (const property in americanToBritishTitles) {
                    if(americanToBritishTitles[property] == lowerCasedWord) {
                        const returning = lowerCasedWord.charAt(0).toUpperCase() + lowerCasedWord.slice(1);
                        return `<span class="highlight">${returning}</span>`
                    }
                }
                return word;
            });
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
        return translationArr.join(" ");
    }
}

module.exports = Translator;