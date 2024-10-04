# AI-Powered Document Q&A System

This project implements an AI-powered question-answering system for documents using LangChain and OpenAI's GPT models.

## Features

- PDF document parsing and embedding
- Vector-based document retrieval
- AI-powered question answering using OpenAI's GPT models
- Secure API key management using environment variables

## Prerequisites

- Node.js (v14 or later recommended)
- npm or yarn
- OpenAI API key

## Installation

1. Clone the repository:
   ```
   git clone git@github.com:yourusername/ChatBotNode.js.git
   cd your-repo-name
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add your OpenAI API key:
     ```
     OPENAI_API_KEY=your_api_key_here
     ```
## Usage

This project demonstrates how to build a custom document Q&A system using OpenAI's API endpoints. While similar functionality might be available in ChatGPT, this implementation serves as a learning exercise to understand:

1. How to process and embed documents
2. How to create and query vector stores
3. How to use language models for question-answering tasks
4. How to integrate various components of an AI system

To use the system:

1. Place your PDF documents in the `docs` directory.
2. Run the document processing script:
   ```
   node process-documents.js
   ```
3. Start the Q&A interface:
   ```
   node qa-interface.js
   ```
4. Enter your questions when prompted. The system will retrieve relevant information from the processed documents and generate an answer using the OpenAI model.

Note: This project is primarily for educational purposes and to gain hands-on experience with AI and NLP concepts. It may not be as optimized or feature-rich as commercial solutions.

## Learning Outcomes

By building and using this system, you can gain insights into:

- Document preprocessing and chunking strategies
- Embedding generation and vector store creation
- Retrieval-based question answering techniques
- Prompt engineering for language models
- API integration with OpenAI's services

Feel free to experiment with different components, try various LangChain modules, or extend the functionality to deepen your understanding of these technologies.

## Project Structure

- `middleware/utils.js`: Core functionality for document processing and Q&A
- 'document_qna_bot' will have a pdf document you want to process. I've stored 'How LLMs are Unlocking New Opportunities for Enterprises' from NVIDIA website. Feel free to replace it with any pdf document.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

