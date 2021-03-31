const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');

suite('Unit Tests', () => {
    suite('Translate to British English Tests', () => {
        test('Translate Mangoes are my favorite fruit to British English', function () {
            const translator = new Translator("Mangoes are my favorite fruit", "american-to-british", false);
            assert.strictEqual(translator.translatedText, 'Mangoes are my favourite fruit')
        });

        test('Translate I ate yogurt for breakfast to British English', function () {
            const translator = new Translator("I ate yogurt for breakfast.", "american-to-british", false);
            assert.strictEqual(translator.translatedText, 'I ate yoghurt for breakfast.')
        });

        test("Translate We had a party at my friend's condo to British English", function () {
            const translator = new Translator("We had a party at my friend's condo.", "american-to-british", false);
            assert.strictEqual(translator.translatedText, 'We had a party at my friend\'s flat.')
        });

        test('Translate Can you toss this in the trashcan for me? British English', function () {
            const translator = new Translator("Can you toss this in the trashcan for me?", "american-to-british", false);
            assert.strictEqual(translator.translatedText, 'Can you toss this in the bin for me?')
        });

        test('Translate The parking lot was full to British English', function () {
            const translator = new Translator("The parking lot was full.", "american-to-british", false);
            assert.strictEqual(translator.translatedText, 'The car park was full.')
        });

        test('Translate Like a high tech Rube Goldberg machine to British English', function () {
            const translator = new Translator("Like a high tech Rube Goldberg machine.", "american-to-british", false);
            assert.strictEqual(translator.translatedText, 'Like a high tech Heath Robinson device.')
        });

        test('Translate To play hooky means to skip class or work to British English', function () {
            const translator = new Translator("To play hooky means to skip class or work.", "american-to-british", false);
            assert.strictEqual(translator.translatedText, 'To bunk off means to skip class or work.')
        });

        test('Translate No Mr. Bond, I expect you to die to British English', function () {
            const translator = new Translator("No Mr. Bond, I expect you to die.", "american-to-british", false);
            assert.strictEqual(translator.translatedText, 'No Mr Bond, I expect you to die.')
        });

        test('Translate Dr. Grosh will see you now to British English', function () {
            const translator = new Translator("Dr. Grosh will see you now.", "american-to-british", false);
            assert.strictEqual(translator.translatedText, 'Dr Grosh will see you now.')
        });

        test('Translate Lunch is at 12:15 today to British English', function () {
            const translator = new Translator("Lunch is at 12:15 today.", "american-to-british", false);
            assert.strictEqual(translator.translatedText, 'Lunch is at 12.15 today.')
        });
    });

    suite('Translate to American English Tests', () => {
        test('Translate We watched the footie match for a while to American English', function () {
            const translator = new Translator("We watched the footie match for a while.", "british-to-american", false);
            assert.strictEqual(translator.translatedText, 'We watched the soccer match for a while.')
        });

        test('Translate Paracetamol takes up to an hour to work to American English', function () {
            const translator = new Translator("Paracetamol takes up to an hour to work.", "british-to-american", false);
            assert.strictEqual(translator.translatedText, 'Tylenol takes up to an hour to work.')
        });

        test('Translate First, caramelise the onions to American English', function () {
            const translator = new Translator("First, caramelise the onions.", "british-to-american", false);
            assert.strictEqual(translator.translatedText, 'First, caramelize the onions.')
        });

        test('Translate I spent the bank holiday at the funfair to American English', function () {
            const translator = new Translator("I spent the bank holiday at the funfair.", "british-to-american", false);
            assert.strictEqual(translator.translatedText, 'I spent the public holiday at the carnival.')
        });

        test('Translate I had a bicky then went to the chippy to American English', function () {
            const translator = new Translator("I had a bicky then went to the chippy.", "british-to-american", false);
            assert.strictEqual(translator.translatedText, 'I had a cookie then went to the fish-and-chip shop.')
        });

        test('Translate I\'ve just got bits and bobs in my bum bag to American English', function () {
            const translator = new Translator("I've just got bits and bobs in my bum bag.", "british-to-american", false);
            assert.strictEqual(translator.translatedText, 'I\'ve just got odds and ends in my fanny pack.')
        });

        test('Translate The car boot sale at Boxted Airfield was called off to American English', function () {
            const translator = new Translator("The car boot sale at Boxted Airfield was called off.", "british-to-american", false);
            assert.strictEqual(translator.translatedText, 'The swap meet at Boxted Airfield was called off.')
        });

        test('Translate Have you met Mrs Kalyani? to American English', function () {
            const translator = new Translator("Have you met Mrs Kalyani?", "british-to-american", false);
            assert.strictEqual(translator.translatedText, 'Have you met Mrs. Kalyani?')
        });

        test('Translate Prof Joyner of King\'s College, London to American English', function () {
            const translator = new Translator("Prof Joyner of King's College, London.", "british-to-american", false);
            assert.strictEqual(translator.translatedText, 'Prof. Joyner of King\'s College, London.')
        });

        test('Translate Tea time is usually around 4 or 4.30 to American English', function () {
            const translator = new Translator("Tea time is usually around 4 or 4.30.", "british-to-american", false);
            assert.strictEqual(translator.translatedText, 'Tea time is usually around 4 or 4:30.')
        });
    });

    suite('Highlight translation Tests', () => {
        test('Highlight translation in Mangoes are my favorite fruit to British English', function () {
            const translator = new Translator("Mangoes are my favorite fruit.", "american-to-british", true);
            assert.strictEqual(translator.translatedText, 'Mangoes are my <span class="highlight">favourite</span> fruit.')
        });

        test('Highlight translation in I ate yogurt for breakfast to British English', function () {
            const translator = new Translator("I ate yogurt for breakfast.", "american-to-british", true);
            assert.strictEqual(translator.translatedText, 'I ate <span class="highlight">yoghurt</span> for breakfast.')
        });

        test('Highlight translation in We watched the footie match for a while to American English', function () {
            const translator = new Translator("We watched the footie match for a while.", "british-to-american", true);
            assert.strictEqual(translator.translatedText, 'We watched the <span class="highlight">soccer</span> match for a while.')
        });

        test('Highlight translation in Paracetamol takes up to an hour to work to American English', function () {
            const translator = new Translator("Paracetamol takes up to an hour to work.", "british-to-american", true);
            assert.strictEqual(translator.translatedText, '<span class="highlight">Tylenol</span> takes up to an hour to work.')
        });
    });
});
