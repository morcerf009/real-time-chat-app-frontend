document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const messageInput = document.getElementById('message-input');
    const messageList = document.getElementById('message-list');
    const clearChatBtn = document.getElementById('clear-chat');
    const attachBtn = document.getElementById('attach-btn');
    const fileInput = document.getElementById('file-input');

    // Modal Elements
    const confirmModal = document.getElementById('confirm-modal');
    const confirmClearBtn = document.getElementById('confirm-clear');
    const cancelClearBtn = document.getElementById('cancel-clear');

    // Bot responses
    const botResponses = [
        "I'm your Smart Bot! How can I help you today?",
        "That's interesting! Tell me more.",
        "I'm just a simple bot, but I'm here to listen.",
        "Gupshup is a great way to talk!",
        "Have a wonderful day ahead!",
        "I'm thinking about that...",
        "Could you clarify what you mean?",
        "Nice to meet you!"
    ];

    // Load messages from localStorage
    let messages = JSON.parse(localStorage.getItem('smartbot_messages')) || [];

    // Initialize UI
    function init() {
        renderMessages();
        scrollToBottom();
    }

    // Save to localStorage
    function saveMessages() {
        localStorage.setItem('smartbot_messages', JSON.stringify(messages));
    }

    // Render all messages
    function renderMessages() {
        messageList.innerHTML = '';
        messages.forEach(msg => {
            appendMessageToUI(msg);
        });
    }

    // Add message to UI
    function appendMessageToUI(msg) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', msg.type);

        messageDiv.innerHTML = `
            <div class="content">${escapeHTML(msg.text)}</div>
            <span class="timestamp">${msg.time}</span>
        `;

        messageList.appendChild(messageDiv);
        scrollToBottom();
    }

    // Add system message to UI
    function appendSystemMessage(text) {
        const msg = {
            id: Date.now(),
            text: text,
            type: 'system',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', 'system');
        messageDiv.style.alignSelf = 'center';
        messageDiv.style.background = 'rgba(255,255,255,0.05)';
        messageDiv.style.fontSize = '0.75rem';
        messageDiv.style.borderRadius = '20px';
        messageDiv.style.color = 'var(--text-muted)';

        messageDiv.innerHTML = `<span>${text}</span>`;
        messageList.appendChild(messageDiv);
        scrollToBottom();
    }

    // Escape HTML to prevent XSS
    function escapeHTML(str) {
        const p = document.createElement('p');
        p.textContent = str;
        return p.innerHTML;
    }

    // Scroll to bottom
    function scrollToBottom() {
        messageList.scrollTop = messageList.scrollHeight;
    }

    // Handle form submission
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const text = messageInput.value.trim();
        if (!text) return;

        const newMessage = {
            id: Date.now(),
            text: text,
            type: 'sent',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        messages.push(newMessage);
        appendMessageToUI(newMessage);
        saveMessages();

        messageInput.value = '';

        // Bot response simulation
        setTimeout(botResponse, 1000);
    });

    // Bot response logic
    function botResponse() {
        const randomResp = botResponses[Math.floor(Math.random() * botResponses.length)];

        const botMessage = {
            id: Date.now(),
            text: randomResp,
            type: 'received',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        messages.push(botMessage);
        appendMessageToUI(botMessage);
        saveMessages();
    }

    // Clear chat modal logic
    clearChatBtn.addEventListener('click', () => {
        confirmModal.style.display = 'flex';
    });

    cancelClearBtn.addEventListener('click', () => {
        confirmModal.style.display = 'none';
    });

    confirmClearBtn.addEventListener('click', () => {
        messages = [];
        saveMessages();
        renderMessages();
        confirmModal.style.display = 'none';
        appendSystemMessage("Chat history cleared.");
    });

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target === confirmModal) {
            confirmModal.style.display = 'none';
        }
    });

    // File Attachment Simulation
    attachBtn.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            const fileName = e.target.files[0].name;
            appendSystemMessage(`📎 File attached: ${fileName}`);

            // Bot response to file
            setTimeout(() => {
                const botMessage = {
                    id: Date.now(),
                    text: `I received your file correctly: ${fileName}`,
                    type: 'received',
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };
                messages.push(botMessage);
                appendMessageToUI(botMessage);
                saveMessages();
            }, 1000);
        }
    });

    init();
});
