// Import the express module
const express = require("express");
const { getAnswer } = require("./middleware/utils");
const { validateAskQuestion } = require('./middleware/middleware');

// Instantiate an object express
const app = express();

app.use(express.static(__dirname + "/"));

// Using the express object, handle the default '/' route for GET requests
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// Route to get answer to the user questions
app.get("/ask-question", validateAskQuestion, async (req, res) => {

    try {
        const answer = await getAnswer(req.query.question)
        return res.json({ "answer": answer })
    } catch (e) {
        return res.status(400).json({ 'error': e.message })
    }
})

// Use the express object to listen to port 8000 for incoming requests
app.listen(8000, async () => {
    console.log("The App is listening on port 8000!");
});