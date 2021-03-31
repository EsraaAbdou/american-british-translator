const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
    constructor(text, locale, highlight) {
        this.text = text;
        this.locale = locale;
        this.highlight = highlight;
    }
    get translatedText() {
        return this.getTranslatedText();
    }
    getTranslatedText() {
        const text = this.text.charAt(0).toUpperCase() + this.text.slice(1);
        let translation = text;
        if(this.locale == "american-to-british") {
            translation =  this.translateToBritish(translation);
        } else if (this.locale == "british-to-american"){
            translation = this.translateToAmerican(translation);
        }

        if(translation === text) {
            translation = "Everything looks good to me!";
        }

        return translation;
    }

    translateToBritish(translation) {
        let matchedPropertyArr = [];
        for (const property in americanOnly) {
            if(translation.toLowerCase().includes(property)) {
                const firstIdx = translation.toLowerCase().search(property);
                const charAfterMatch = translation[firstIdx + property.length];
                if(charAfterMatch.toLowerCase() == charAfterMatch.toUpperCase()) matchedPropertyArr.push(property);
            }
        }
        if(matchedPropertyArr.length > 0) translation = this.replaceMatch(americanOnly, translation, matchedPropertyArr);

        matchedPropertyArr = [];
        for (const property in americanToBritishSpelling) {
            if(translation.toLowerCase().includes(property)) {
                const firstIdx = translation.toLowerCase().search(property);
                const charAfterMatch = translation[firstIdx + property.length];
                if(charAfterMatch.toLowerCase() == charAfterMatch.toUpperCase()) matchedPropertyArr.push(property);
            }
        }
        if(matchedPropertyArr.length > 0) translation = this.replaceMatch(americanToBritishSpelling,translation, matchedPropertyArr);

        matchedPropertyArr = [];
        for (const property in americanToBritishTitles) {
            if(translation.toLowerCase().includes(property)) {
                const firstIdx = translation.toLowerCase().search(property);
                const charAfterMatch = translation[firstIdx + property.length];
                if(charAfterMatch.toLowerCase() == charAfterMatch.toUpperCase()) matchedPropertyArr.push(property);
            }
        }
        if(matchedPropertyArr.length > 0)
            translation = this.replaceMatch(americanToBritishTitles, translation, matchedPropertyArr, true);
         
        for (const property in americanToBritishTitles) {
            if(translation.toLowerCase().includes(americanToBritishTitles[property])) {
                const toBeRepalced = americanToBritishTitles[property];
                let replacement = toBeRepalced.charAt(0).toUpperCase() + toBeRepalced.slice(1);
                translation = translation.replace(toBeRepalced, replacement);
            }
        }

        const timeRegex = /(2[0-3]|[01]?[0-9]):([0-5]?[0-9])/g;
        const foundArr = translation.match(timeRegex);
        if(foundArr) {
            foundArr.forEach(match => {
                const foundIdx = translation.search(match);
                const matchLength = match.length;
                const numberRegex = /^\d+$/;
                if(!numberRegex.test(translation[foundIdx-1]) && !numberRegex.test(translation[foundIdx+matchLength])) {
                    let replacement = match.replace(":", ".");
                    replacement = (this.highlight) ? `<span class="highlight">${replacement}</span>`: replacement; 
                    translation = translation.replace(match, replacement);
                }
            });
        }
        
        return translation;
    }

    translateToAmerican(translation) {
        let matchedPropertyArr = [];
        for (const property in britishOnly) {
            if(translation.toLowerCase().includes(property)) {
                const firstIdx = translation.toLowerCase().search(property);
                const charAfterMatch = translation[firstIdx + property.length]
                if(charAfterMatch.toLowerCase() == charAfterMatch.toUpperCase()) matchedPropertyArr.push(property);
            }
        }
        if(matchedPropertyArr.length > 0) translation = this.replaceMatch(britishOnly, translation, matchedPropertyArr);
        
        matchedPropertyArr = [];
        for (const property in americanToBritishSpelling) {
            if(translation.toLowerCase().includes(americanToBritishSpelling[property])) {
                const firstIdx = translation.toLowerCase().search(americanToBritishSpelling[property]);
                const charAfterMatch = translation[firstIdx + americanToBritishSpelling[property].length]
                if(charAfterMatch.toLowerCase() == charAfterMatch.toUpperCase()) matchedPropertyArr.push(property);
            }
        }
        if(matchedPropertyArr.length > 0) 
            translation = this.replaceMatch(americanToBritishSpelling, translation, matchedPropertyArr, false, false);

        matchedPropertyArr = [];
        for (const property in americanToBritishTitles) {
            if(translation.toLowerCase().includes(americanToBritishTitles[property])) {
                const firstIdx = translation.toLowerCase().search(americanToBritishTitles[property]);
                const charAfterMatch = translation[firstIdx + americanToBritishTitles[property].length]
                if(charAfterMatch.toLowerCase() == charAfterMatch.toUpperCase()) matchedPropertyArr.push(property);
            }
        }
        if(matchedPropertyArr.length > 0) 
            translation = this.replaceMatch(americanToBritishTitles, translation, matchedPropertyArr, true, false);

        for (const property in americanToBritishTitles) {
            if(translation.toLowerCase().includes(property)) {
                let replacement = property.charAt(0).toUpperCase() + property.slice(1);
                translation = translation.replace(property, replacement);
            }
        }
        // const timeRegex = /^([01]?[0-9]|2[0-3])\.[0-5][0-9]$/;
        const timeRegex = /(2[0-3]|[01]?[0-9])\.([0-5]?[0-9])/g;
        const foundArr = translation.match(timeRegex);
        if(foundArr) {
            foundArr.forEach(match => {
                const foundIdx = translation.search(match);
                const matchLength = match.length;
                const numberRegex = /^\d+$/;
                if(!numberRegex.test(translation[foundIdx-1]) && !numberRegex.test(translation[foundIdx+matchLength])) {
                    let replacement = match.replace(".", ":");
                    replacement = (this.highlight) ? `<span class="highlight">${replacement}</span>`: replacement; 
                    translation = translation.replace(match, replacement);
                }
            });
        }
        return translation;
    }

    replaceMatch(obj, translation, matchedPropertyArr, titleFlag = false, objectMatchDir = true) {
        const matchedProptiesSorted = matchedPropertyArr.sort((a, b) => b.length - a.length);
        let previousIdx;
        matchedProptiesSorted.forEach(property => {
            const matchedProperty = (objectMatchDir) ? property : obj[property];
            if(translation.toLowerCase().includes(matchedProperty)) {
                const firstIdx = translation.toLowerCase().search(matchedProperty);
                const secondIdx = firstIdx + matchedProperty.length;
                const toBeRepalced = translation.slice(firstIdx, secondIdx);
                let replacement = (objectMatchDir) ? obj[property] : property;
                if(titleFlag) replacement = replacement.charAt(0).toUpperCase() + replacement.slice(1);
                replacement = (this.highlight) ? `<span class="highlight">${replacement}</span>`: replacement; 
                translation = translation.replace(toBeRepalced, replacement);
                previousIdx = firstIdx;
            }
        });
        return translation;
    }
}

module.exports = Translator;