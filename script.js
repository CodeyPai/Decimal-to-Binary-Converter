const numberInput = document.getElementById("number-input"); // Input field for user to enter a number
const convertBtn = document.getElementById("convert-btn"); // Button to trigger the conversion
const result = document.getElementById("result"); // Displays the result or animation status
const animationContainer = document.getElementById("animation-container"); // Container for call stack animation

const animationData = [ // Data to drive the call stack animation
    {
        inputVal: 5,
        addElDelay: 1000, // Delay before adding animation frame
        msg: "decimalToBinary(5) returns '10' + 1 (5 % 2). Then it pops off the stack.",
        showMsgDelay: 15000, // Delay before showing the explanation message
        removeElDelay: 20000 // Delay before removing the animation frame
    },
    {
        inputVal: 2,
        addElDelay: 1500,
        msg: "decimalToBinary(2) returns '1' + 0 (2 % 2) and gives that value to the stack below. Then it pops off the stack.",
        showMsgDelay: 10000,
        removeElDelay: 15000
    },
    {   
        inputVal: 1,
        addElDelay: 2000,
        msg: "decimalToBinary(1) returns '1' (base case) and gives that value to the stack below. Then it pops off the stack.",
        showMsgDelay: 5000,
        removeElDelay: 10000
    },
];

const decimalToBinary = (input) => { // Recursive function to convert decimal to binary
    if (input === 0 || input === 1) {
        return String(input); // Base case: return input as a string
    } else {
        return decimalToBinary(Math.floor(input / 2)) + (input % 2); // Recursive case: combine binary strings
    }
};

const showAnimation = () => { // Triggers and manages the call stack animation
    result.innerText = "Call Stack Animation";

    animationData.forEach((obj) => { // Loop through animation steps
        setTimeout(() => {
            animationContainer.innerHTML += `
            <p id="${obj.inputVal}" class="animation-frame">decimalToBinary(${obj.inputVal})</p>
            ` // Add animation frame
        }, obj.addElDelay);

        setTimeout(() => {
            document.getElementById(obj.inputVal).textContent = obj.msg; // Update frame with message
        }, obj.showMsgDelay);

        setTimeout(() => {
            document.getElementById(obj.inputVal).remove(); // Remove frame after delay
        }, obj.removeElDelay);
    });
    
    setTimeout(() => {result.textContent = decimalToBinary(5)}, 20000) // Display final result
};

const checkUserInput = () => { // Validates user input and initiates conversion
    const inputValue = numberInput.value.trim();
    const parsedValue = parseInt(inputValue, 10);
    if (!inputValue || isNaN(parsedValue) || parsedValue < 0) { // Check for valid input
        alert("Please enter a valid non-negative integer.");
        return;
    };

    if (parsedValue === 5) { // Trigger animation only for the input value 5
        showAnimation();
        return;
    }

    result.textContent = decimalToBinary(parsedValue); // Display binary conversion for other inputs
    numberInput.value = ""; // Clear input field
}

// Event listeners for button click and Enter key
convertBtn.addEventListener("click", checkUserInput);
numberInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        checkUserInput(); // Handle Enter key press
    };
});
