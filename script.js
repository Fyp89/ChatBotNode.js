// Access all the buttons and the p tag from HTML
const questionInput = document.getElementById('question')
const getAnswerBtn = document.getElementById('get-answer')
const copyTextBtn = document.getElementById('copy-text')
const textContentArea = document.getElementById('text-content')
const copyMsgPTag = document.getElementById('copy-message')

// A function to disable all the buttons so that button click will have no effect
const disableAllBtn = (...buttons) => {
	buttons.forEach((button) => (button.disabled = true))
}

// A function to enable all the buttons so that button click will have effect
const enableAllBtn = (...buttons) => {
	buttons.forEach((button) => (button.disabled = false))
}

// A function to set the visiblily of HTML DOM elements
const setVisibility = (visibility, ...HTMLDomElements) => {
	HTMLDomElements.forEach(
		(HTMLDomElement) => (HTMLDomElement.style.visibility = visibility)
	)
}

// Callback function to handle the Get answer button click
const getAnswerBtnClickEventHandler = (e) => {

	// Disable all the buttons
	disableAllBtn(getAnswerBtn, copyTextBtn)

	// Hide the copy button and paragraph tag
	setVisibility('hidden', copyTextBtn, copyMsgPTag)

	// Get the text from the input element
	const question = questionInput.value

	// Call the API to get the answer
	fetch(`${window.location.href}ask-question?question=${question}`)
		.then((response) => {
			if (response.status != 200) {
				response.json().then((data) => {
					textContentArea.innerHTML = `${data.error}`
					textContentArea.style.color = 'red'
				})
			} else {
				response.json().then((data) => {
					textContentArea.innerHTML = `${data.answer}`
					textContentArea.style.color = 'black'
				})
				setVisibility('visible', copyTextBtn)
			}

			// Enable all the buttons for next API call
			enableAllBtn(getAnswerBtn, copyTextBtn)
		})
		.catch((err) => console.log(err))
}

// Callback function to handle the copy text button click
const copyTextBtnClickEventHandler = () => {

	// Copy the contents of text area to clipboard
	navigator.clipboard.writeText(textContentArea.value)

	// Display the paragraph tag
	setVisibility('visible', copyMsgPTag)
}

// Attach the callback function on the click event listener
// for each buttons with their respective functions
getAnswerBtn.addEventListener('click', getAnswerBtnClickEventHandler)
copyTextBtn.addEventListener('click', copyTextBtnClickEventHandler)