require('dotenv').config();
const openai_api_key = process.env.OPENAI_API_KEY;

// Import the required modules
const { RetrievalQAChain } = require('langchain/chains');
const { ChatOpenAI } = require('@langchain/openai');
const { OpenAIEmbeddings } = require("@langchain/openai");
const { MemoryVectorStore } = require("langchain/vectorstores/memory");
const { RecursiveCharacterTextSplitter } = require('langchain/text_splitter');
const { PDFLoader } = require("@langchain/community/document_loaders/fs/pdf")

// Function to load the PDF document using langchain document loaders
const loadDocument = async () => {
    // Load the PDF document using PDFLoader
    const loader = new PDFLoader("./document_qna_bot/data.pdf");
    const docs = await loader.load();
    return docs
}

// Function to split the text using RecursiveCharacterTextSplitter 
const splitDocs = async () => {

    // Load the PDF document as Langchain's document objects
    const docs = await loadDocument();

    // Create an instance of RecursiveCharacterTextSplitter with a chunkSize of 10
    const textSplitter = new RecursiveCharacterTextSplitter();

    // Call the splitDocuments() method to split the text into smaller chunks
    const listOfSplitDocs = await textSplitter.splitDocuments(docs);

    return listOfSplitDocs;
}

// Function to get the vector store
const getVectorStore = async (documentSplits) => {

	// Create an instance of OpenAIEmbeddings
	const embeddings = new OpenAIEmbeddings({ openAIApiKey: openai_api_key });

	// Generate a memory vector store from the documents loaded from PDF
	const vectorStore = await MemoryVectorStore.fromDocuments(documentSplits, embeddings);
	return vectorStore;
}

const getAnswer = async (question) => {

	const documentSplits = await splitDocs();
	const vectorStore = await getVectorStore(documentSplits);

	// Create an instance of ChatOpenAI and specify the model and API key
	const model = new ChatOpenAI({
		modelName: 'gpt-3.5-turbo',
		openAIApiKey: openai_api_key
	})

	// Create the QA chain using the model and vector embeddings
	const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());

	// Call the LLM using the query/input question
	const response = await chain.call({ query: question });

	return response.text;
}

module.exports = {
	getAnswer
}