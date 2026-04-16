// DOM Elements
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const attachBtn = document.getElementById('attach-btn');
const fileInput = document.getElementById('file-input');
const messagesArea = document.getElementById('messages-area');
const filePreview = document.getElementById('file-preview');
const newChatBtn = document.getElementById('new-chat-btn');

// Storage
let uploadedFiles = [];
const sampleResponses = [
  "That's an interesting question! I'd love to help you with that.",
  "I can assist you with this. What specific information do you need?",
  "Great topic! Here are some thoughts on this...",
  "I understand. Let me provide you with some insights.",
  "That's a great point. Here's what I think about it..."
];

// Textarea auto-resize
messageInput.addEventListener('input', function() {
  this.style.height = 'auto';
  this.style.height = Math.min(this.scrollHeight, 200) + 'px';
});

// Send message
sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

function sendMessage() {
  const text = messageInput.value.trim();
  
  if (!text && uploadedFiles.length === 0) return;

  // Add user message
  addMessage(text, 'user');
  messageInput.value = '';
  messageInput.style.height = 'auto';
  uploadedFiles = [];
  filePreview.innerHTML = '';

  // Simulate assistant response
  setTimeout(() => {
    const response = sampleResponses[Math.floor(Math.random() * sampleResponses.length)];
    addMessage(response, 'assistant');
  }, 800);

  // Update send button
  updateSendButton();
}

function addMessage(content, sender) {
  const messagesContainer = document.querySelector('.messages-container');
  
  // Hide welcome section if it exists
  const welcomeSection = document.querySelector('.welcome-section');
  if (welcomeSection) {
    welcomeSection.remove();
  }

  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender}`;
  
  const contentDiv = document.createElement('div');
  contentDiv.className = 'message-content';
  contentDiv.textContent = content;
  
  messageDiv.appendChild(contentDiv);
  messagesContainer.appendChild(messageDiv);
  
  // Scroll to bottom
  messagesArea.scrollTop = messagesArea.scrollHeight;
}

// File upload
attachBtn.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', handleFileUpload);

function handleFileUpload(e) {
  const files = e.target.files;
  
  for (let file of files) {
    uploadedFiles.push(file);
    displayFilePreview(file);
  }
  
  // Reset file input
  fileInput.value = '';
}

function displayFilePreview(file) {
  const fileItem = document.createElement('div');
  fileItem.className = 'file-item';
  
  const fileIcon = getFileIcon(file.type);
  const fileName = file.name.length > 20 ? file.name.substring(0, 20) + '...' : file.name;
  
  fileItem.innerHTML = `
    ${fileIcon}
    <span>${fileName}</span>
    <button type="button" data-file-name="${file.name}">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>
  `;
  
  const removeBtn = fileItem.querySelector('button');
  removeBtn.addEventListener('click', () => {
    uploadedFiles = uploadedFiles.filter(f => f.name !== file.name);
    fileItem.remove();
  });
  
  filePreview.appendChild(fileItem);
  updateSendButton();
}

function getFileIcon(fileType) {
  if (fileType.startsWith('image/')) {
    return '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="1" stroke="currentColor" stroke-width="1"/><circle cx="5.5" cy="5.5" r="1.5" fill="currentColor"/><path d="M2 11L5 8L14 14" stroke="currentColor" stroke-width="1"/></svg>';
  } else if (fileType.startsWith('video/')) {
    return '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="10" rx="1" stroke="currentColor" stroke-width="1"/><path d="M6.5 7L11 10V6L6.5 9Z" fill="currentColor"/></svg>';
  } else if (fileType.startsWith('audio/')) {
    return '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1V15M5 3C3 5 3 11 5 13M11 3C13 5 13 11 11 13" stroke="currentColor" stroke-width="1.5"/></svg>';
  } else {
    return '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 2V14H14V5L10 2H2Z" stroke="currentColor" stroke-width="1"/><path d="M10 2V5H14" stroke="currentColor" stroke-width="1"/></svg>';
  }
}

function updateSendButton() {
  sendBtn.disabled = !messageInput.value.trim() && uploadedFiles.length === 0;
}

// New chat
newChatBtn.addEventListener('click', () => {
  const messagesContainer = document.querySelector('.messages-container');
  messagesContainer.innerHTML = `
    <div class="welcome-section">
      <h2>Welcome to Chat Assistant</h2>
      <p>Start a conversation by typing below or uploading files</p>
      
      <div class="suggested-prompts">
        <div class="prompt-card">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 2V18M2 10H18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <span>Help me write</span>
        </div>
        <div class="prompt-card">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 2C5.58 2 2 5.58 2 10S5.58 18 10 18S18 14.42 18 10" stroke="currentColor" stroke-width="2"/>
          </svg>
          <span>Analyze image</span>
        </div>
        <div class="prompt-card">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 6H16M4 10H16M4 14H12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <span>Code help</span>
        </div>
        <div class="prompt-card">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 2C5.58 2 2 5.58 2 10S5.58 18 10 18S18 14.42 18 10S14.42 2 10 2Z" stroke="currentColor" stroke-width="2"/>
          </svg>
          <span>Creative ideas</span>
        </div>
      </div>
    </div>
  `;
  messagesArea.scrollTop = 0;
  uploadedFiles = [];
  filePreview.innerHTML = '';
  messageInput.value = '';
  updateSendButton();
});

// Add click handlers for suggested prompts
document.addEventListener('click', (e) => {
  if (e.target.closest('.prompt-card')) {
    const promptText = e.target.closest('.prompt-card').querySelector('span').textContent;
    messageInput.value = promptText;
    messageInput.style.height = 'auto';
    messageInput.focus();
    updateSendButton();
  }
});

// Initialize send button state
updateSendButton();
