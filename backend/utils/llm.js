const AI21 = require('langchain/llms/ai21').AI21;
const {
    StructuredOutputParser,
    CommaSeparatedListOutputParser,
    OutputFixingParser,
} = require('langchain/output_parsers');
const PromptTemplate = require('langchain/prompts').PromptTemplate;
require('dotenv').config();

const seriousModel = new AI21(
    {
        temperature: 0,
        ai21ApiKey: process.env.AI21_API_KEY,
    },
);

const funModel = new AI21(
    {
        temperature: 0.5,
        ai21ApiKey: process.env.AI21_API_KEY,
    },
);

const cardParser = StructuredOutputParser.fromNamesAndDescriptions(
    {
        definition: 'Definition of the vocabulary',
        example: 'Use-case of the vocabulary',
    },
);


const cardPrompt = new PromptTemplate(
    {
        template: 'Explain the vocabulary "{vocabulary}".\n{format_instructions}',
        inputVariables: ['vocabulary'],
        partialVariables: {format_instructions: cardParser.getFormatInstructions()},
    },
);

/**
 * Get a flashcard of a vocabulary
 * @param vocab
 * @returns {Promise<{examples: (string)[], spelling, definition: (string|[(string|*|ActiveX.IXMLDOMNode)]|ActiveX.IXMLDOMNode|*)[]}>}
 */
async function getCard(vocab) {
    const input = await cardPrompt.format({vocabulary: vocab});
    const answer = await funModel.call(input);
    const content = await cardParser.parse(answer);
    return {
        spelling: vocab,
        definition: [content.definition],
        examples: [content.example],
    };
}

const vocabParser = new CommaSeparatedListOutputParser();

const fixVocabParser = OutputFixingParser.fromLLM(funModel, vocabParser);

const vocabPrompt = new PromptTemplate(
    {
        template: 'List 10 vocabularies about: "{descriptions}".\n{format_instructions}',
        inputVariables: ['descriptions'],
        partialVariables: {format_instructions: fixVocabParser.getFormatInstructions()},
    },
);

/**
 * Get a list of vocabularies
 * @param descriptions
 * @returns {Promise<*>}
 */
async function getVocab(descriptions) {
    const input = await vocabPrompt.format({descriptions: descriptions});
    const answer = await seriousModel.call(input);
    return await fixVocabParser.parse(answer);
}


/**
 * Generate flashcards from a description
 * @param description
 * @returns {Promise<[{}]>}
 */
async function generateFlashCards(description) {
  let vocabs = await getVocab(description);
  if (vocabs.length <= 1) {
      throw new Error('Bad vocabulary parse');
  }
  if (vocabs.length > 10) {
      vocabs = vocabs.slice(0, 10);
  }

  const cardPromises = vocabs.map(async (vocab) => {
    try {
      return await getCard(vocab);
    } catch (e) {
      console.log(e);
    }
  });

  const cards = await Promise.all(cardPromises);
  return cards.filter(Boolean);
}


module.exports = {
    generateFlashCards: generateFlashCards,
};
