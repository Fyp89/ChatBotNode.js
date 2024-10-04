// Middleware function to apply validations on ask-questions endpoint
const validateAskQuestion = (req, res, next) => {

    const question = req.query.question;

    // Check if question has at least one character
    if (!question || question.length < 1)
        return res.status(400).json({ 'error': 'Please enter a valid question.' });

    // Call the next function in the request-response cycle
    next();
}

module.exports = {
    validateAskQuestion
}