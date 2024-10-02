// Importing the express and fs modules
const express = require("express");
const fs = require("fs");
const {globalMiddlewareFunction, localMiddlewareFunction} = require("./middleware.js");
const {fetchPosts} = require("./utils.js");
const {OpenAI} = require("openai");

open_ai_api_key = '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'
const openai = new OpenAI({apiKey : open_ai_api_key});

const classify = async(user_input) => {
    // Use chat completions from OpenAI and pass the prompt and input
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", // LLM Model to use
        messages: [
            {
                "role": "system",
                "content": `You will be provided with a piece of text.
                            Your task is to classify it to one of the three categories:
                            1. Sports
                            2. Entertainment
                            3. Unknown
                            If you do not know the category, respond as Unknown always instead of randomly answering .`
            },
            {
                "role": "user",
                "content": user_input
            }
        ]
    });

    console.log(`Input: ${user_input}\nCategory: ${response.choices[0].message.content}\n`)
}

// Used the immediately invoked function expression
(async () => {
    const user_input_entertainment = "I loved the Avengers movie so much!!"
    const user_input_sports = "Football is one of the popular games played in the world."
    const user_input_unknown = "I am working so hard."
    await classify(user_input_entertainment)
    await classify(user_input_sports)
    await classify(user_input_unknown)
})();

const analyze_sentiment = async (user_input) => {

    // Use chat completions from OpenAI and pass the prompt and input
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                "role": "system",
                "content": `You will be provided with a piece of text.
                            Your task is to classify its sentiment as Positive, Neutral, or Negative.
                            The output should only contain the type of sentiment.`
            },
            {
                "role": "user",
                "content": user_input
            }
        ]
    });

    console.log(`Input: ${user_input}\nSentiment: ${response.choices[0].message.content}\n`)
}

// Used the immediately invoked function expression
(async () => {
    const positive_text = "Just finished the best pizza ever! So satisfied! "
    const negative_text = "This traffic is insane! How much longer will it take?"
    const neutral_text = "I am going to the market"
    await analyze_sentiment(positive_text)
    await analyze_sentiment(negative_text)
    await analyze_sentiment(neutral_text)
})();

// Instantiating an object express
const app = express();

app.use(globalMiddlewareFunction);

app.get('/api-test', localMiddlewareFunction, (req, res) => {
    return res.json({'Local middleware message': req.localMessage,
        'Global middleware message': req.globalMessage})
})

app.get('/get-summary', (req, res) =>
{
    return res.json({'hello': 'workd'});
})

app.get('/fetch-posts', async (req, res) => {
    try {
      const posts = await fetchPosts();
      console.log(posts)
      return res.json(posts);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

// Using the express object, handle the '/user/:userId' route for GET requests
app.get("/user/:userId", (req, res) => {
    try {
        // Accessing the path parameter
        const userId = req.params.userId;

        // Reading the dummy data from the JSON file
        const dummyData = fs.readFileSync("dummy_data.json");

        // Converting the Buffer to JSON object
        const data = JSON.parse(dummyData);

        // Filtering the data and return the user details
        let response = null
        if (userId > 1 && userId <= 20)
            response = data["data"].filter(user => user.userId == userId);
        else
            res.send({ "error": "userId not found" })

        // Sending the response consisting of the given user details
        res.send(response);
    } catch (e) {
        res.send({ "error": e })
    }
})

// Using the express object, handle the default '/' route for GET requests
app.get("/", (req, res) => {
    const response = `<h1> Go the <a href='https://ed-6033685594898432.educative.run/user/4'>/user</a> route.</h1>`;
    res.send(response);
})

// Using the express object to listen to port 8000 for incoming requests
app.listen(8000, () => {
    console.log("The App is listening on port 8000!");
});