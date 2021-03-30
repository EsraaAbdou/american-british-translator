const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');

suite('Unit Tests', () => {
    test('Translate Mangoes are my favorite fruit to British English', function () {
        const translator = new Translator("Mangoes are my favorite fruit", "american-to-british");
        assert.strictEqual(translator.translatedText, 'Mangoes are my <span class="highlight">favourite</span> fruit')
    });

    test('Translate I ate yogurt for breakfast to British English', function () {
        const translator = new Translator("I ate yogurt for breakfast.", "american-to-british");
        assert.strictEqual(translator.translatedText, 'I ate <span class="highlight">yoghurt</span> for breakfast.')
    });

    test("Translate We had a party at my friend's condo to British English", function () {
        const translator = new Translator("We had a party at my friend's condo.", "american-to-british");
        assert.strictEqual(translator.translatedText, 'We had a party at my friend\'s <span class="highlight">flat</span>.')
    });

    test('Translate Can you toss this in the trashcan for me? British English', function () {
        const translator = new Translator("Can you toss this in the trashcan for me?", "american-to-british");
        assert.strictEqual(translator.translatedText, 'Can you toss this in the <span class="highlight">bin</span> for me?')
    });

    test('Translate The parking lot was full to British English', function () {
        const translator = new Translator("The parking lot was full.", "american-to-british");
        assert.strictEqual(translator.translatedText, 'The <span class="highlight">car park</span> was full.')
    });

    test('Translate Like a high tech Rube Goldberg machine to British English', function () {
        const translator = new Translator("Like a high tech Rube Goldberg machine.", "american-to-british");
        assert.strictEqual(translator.translatedText, 'Like a high tech <span class="highlight">Heath Robinson device</span>.')
    });

    test('Translate To play hooky means to skip class or work to British English', function () {
        const translator = new Translator("To play hooky means to skip class or work.", "american-to-british");
        assert.strictEqual(translator.translatedText, 'To <span class="highlight">bunk off</span> means to skip class or work.')
    });

    test('Translate No Mr. Bond, I expect you to die to British English', function () {
        const translator = new Translator("No Mr. Bond, I expect you to die.", "american-to-british");
        assert.strictEqual(translator.translatedText, 'No <span class="highlight">Mr</span> Bond, I expect you to die.')
    });

    test('Translate Dr. Grosh will see you now to British English', function () {
        const translator = new Translator("Dr. Grosh will see you now.", "american-to-british");
        assert.strictEqual(translator.translatedText, '<span class="highlight">Dr</span> Grosh will see you now.')
    });

    test('Translate Lunch is at 12:15 today to British English', function () {
        const translator = new Translator("Lunch is at 12:15 today.", "american-to-british");
        assert.strictEqual(translator.translatedText, 'Lunch is at <span class="highlight">12.15</span> today.')
    });

    // test('Translate  to American English', function () {
    //     const translator = new Translator("", "british-to-american");
    //     assert.strictEqual(translator.translatedText, "")
    // });



});
