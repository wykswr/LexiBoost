const generateFlashCards = require('../utils/llm').generateFlashCards;

const generate = async (req, res, next) => {
    const ai = req.query.ai;
    if (ai) {
        try {
            req.body.flashCards = await generateFlashCards(req.body.description);
        } catch (err) {
            console.log(err);
            return res.status(400).send('Failed to generate flashcards');
        }
    }
    next();
};

module.exports = generate;
