const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const bootLogs = [
    "Saving credentials...",
    "Requesting Assets please wait!",
    "Loading assets...",
    "Setting things up",
    "Finished. Welcome!"
];

const inputField = document.getElementById('terminal-input');
const loginLine = document.getElementById('login-line');
const terminalText = document.getElementById('terminal-text');
const terminalScreen = document.getElementById('terminal-screen');
const mainContent = document.getElementById('main-content');

// Gumawa tayo ng tracker kung nasa anong step na tayo
let currentStep = 1;
const promptText = document.getElementById('prompt-text');

// Makikinig ang JS kapag may pinindot sa keyboard
inputField.addEventListener('keypress', async function (event) {

    if (event.key === 'Enter') {
        // Kunin natin yung mismong tinype ng user
        let typedValue = inputField.value;

        if (currentStep === 1) {
            // --- STEP 1: MAGNOLIA ALIAS ---
            let typedLog = document.createElement('p');
            typedLog.textContent = promptText.textContent + typedValue;
            terminalText.appendChild(typedLog);

            inputField.value = ""; // I-clear ang box
            promptText.textContent = "Number: "; // Palitan ang text para sa Step 2
            currentStep = 2; // Lipat sa Step 2

        } else if (currentStep === 2) {
            // --- STEP 2: NUMBER ---
            let typedLog = document.createElement('p');
            typedLog.textContent = promptText.textContent + typedValue;
            terminalText.appendChild(typedLog);

            inputField.value = "";
            promptText.textContent = "Username: "; // Palitan para sa Step 3
            currentStep = 3;

        } else if (currentStep === 3) {
            // --- STEP 3: USERNAME ---
            let typedLog = document.createElement('p');
            typedLog.textContent = promptText.textContent + typedValue;
            terminalText.appendChild(typedLog);

            inputField.value = "";
            promptText.textContent = "Password: "; // Palitan para sa Step 4
            inputField.type = "password"; // GAWING HIDDEN (tuldok-tuldok) ANG INPUT
            currentStep = 4;

        } else if (currentStep === 4) {
            // --- STEP 4: PASSWORD & BOOT SEQUENCE ---

            loginLine.style.display = 'none';

            let typedLog = document.createElement('p');
            typedLog.textContent = promptText.textContent + "*********";
            terminalText.appendChild(typedLog);

            // Simulan na ang boot sequence
            for (let i = 0; i < bootLogs.length; i++) {
                let p = document.createElement('p');
                p.style.margin = "2px 0";
                p.textContent = bootLogs[i];
                terminalText.appendChild(p);

                let randomDelay = Math.floor(Math.random() * 800) + 300;
                await sleep(randomDelay);
            }

            await sleep(1000);

            // Trigger Fade Out
            terminalScreen.classList.add('fade-out');
            await sleep(1000);

            terminalScreen.style.display = 'none';
            mainContent.style.display = 'block';
            await sleep(50);

            // Trigger Fade In
            mainContent.classList.add('fade-in');
        }
    }
});

terminalScreen.addEventListener('click', () => {
    inputField.focus();
});

const options = document.querySelectorAll(".option");
let currentIndex = 0;

// Manual click activation
options.forEach((option, index) => {
    option.addEventListener("click", () => {
        setActive(index);
    });
});

// Function to activate selected slide
function setActive(index) {
    options.forEach(o => o.classList.remove("active"));
    options[index].classList.add("active");
    currentIndex = index;
}

// Auto slide every 3 seconds
setInterval(() => {
    currentIndex = (currentIndex + 1) % options.length;
    setActive(currentIndex);
}, 3000);


// ==========================================
// DUAL-IDENTITY THEME TOGGLE (GLOBAL)
// ==========================================
const globalThemeToggle = document.getElementById('global-theme-toggle');

if (globalThemeToggle) {
    globalThemeToggle.addEventListener('click', () => {
        // Toggle the attribute on the HTML root tag
        if (document.documentElement.getAttribute('data-theme') === 'cyber') {
            document.documentElement.removeAttribute('data-theme');
            globalThemeToggle.textContent = '⚙️ System Override';
        } else {
            document.documentElement.setAttribute('data-theme', 'cyber');
            globalThemeToggle.textContent = '⏪ Return to Studio';
        }
    });
}

// ==========================================
// CONTACT FORM INTERACTION & LOGIC
// ==========================================

const contactForm = document.getElementById('contact-form');
const sendBtn = document.getElementById('send-btn');
const successMessage = document.getElementById('success-message');
const dynamicReply = document.getElementById('dynamic-reply');
const resetBtn = document.getElementById('reset-btn');

if (sendBtn) {
    // Requirement 1: Button Interaction (Listening for the Click)
    sendBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Stops the page from refreshing when clicking send

        const nameInput = document.getElementById('name').value.trim();
        const emailInput = document.getElementById('email').value.trim();
        const messageInput = document.getElementById('message').value.trim();

        // Requirement 2: Form Validation
        // Check if fields are empty
        if (!nameInput || !emailInput || !messageInput) {
            alert("System Error: Please fill in all fields before sending.");
            return;
        }

        // Check for basic valid email format using RegEx
        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (!emailInput.match(emailPattern)) {
            alert("System Error: Please enter a valid email address.");
            return;
        }

        // Requirement 3: Alert / Confirmation Message
        const confirmSend = confirm(`Ready to send this transmission, ${nameInput}?`);

        if (confirmSend) {
            // Requirement 4: Show or hide content (Hide form, Show success message)
            contactForm.classList.add('hidden');
            successMessage.classList.remove('hidden');

            // Requirement 5: Dynamic text injection based on user input
            dynamicReply.innerHTML = `Thanks for reaching out, <strong>${nameInput}</strong>! Your message from <em>${emailInput}</em> has been securely logged. I'll get back to you shortly.`;
        }
    });
}

// Extra: Reset button to bring the form back
if (resetBtn) {
    resetBtn.addEventListener('click', () => {
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('message').value = '';

        successMessage.classList.add('hidden');
        contactForm.classList.remove('hidden');
    });
}