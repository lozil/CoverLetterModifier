/**
 * Dynamic Text Replacement Tool
 * Main JavaScript functionality
 */

// Initialize jsPDF
const { jsPDF } = window.jspdf;

// DOM Elements
const inputText = document.getElementById('inputText');
const replacementFields = document.getElementById('replacementFields');
const outputText = document.getElementById('outputText');
const replacementsSection = document.getElementById('replacementsSection');
const downloadBtn = document.getElementById('downloadBtn');

// Application State
let placeholders = [];
let replacements = {};

/**
 * Extract placeholders from text using regex
 * @param {string} text - The input text
 * @returns {Array} Array of unique placeholders
 */
function extractPlaceholders(text) {
    const regex = /\{([^}]+)\}/g;
    const found = [];
    let match;

    while ((match = regex.exec(text)) !== null) {
        if (!found.includes(match[1])) {
            found.push(match[1]);
        }
    }

    return found;
}

/**
 * Create input fields for each placeholder
 * @param {Array} placeholders - Array of placeholder names
 */
function createReplacementFields(placeholders) {
    replacementFields.innerHTML = '';

    if (placeholders.length === 0) {
        replacementsSection.style.display = 'none';
        return;
    }

    replacementsSection.style.display = 'block';

    placeholders.forEach(placeholder => {
        const fieldDiv = document.createElement('div');
        fieldDiv.className = 'replacement-field fade-in';

        const label = document.createElement('label');
        label.textContent = `Replace "${placeholder}":`;
        label.setAttribute('for', `field-${placeholder}`);

        const input = document.createElement('input');
        input.type = 'text';
        input.id = `field-${placeholder}`;
        input.placeholder = `Enter replacement for ${placeholder}`;
        input.value = replacements[placeholder] || '';

        input.addEventListener('input', (e) => {
            replacements[placeholder] = e.target.value;
            updateOutput();
        });

        fieldDiv.appendChild(label);
        fieldDiv.appendChild(input);
        replacementFields.appendChild(fieldDiv);
    });
}

/**
 * Get plain text with all replacements applied
 * @returns {string} Plain text with replacements
 */
function getPlainText() {
    let text = inputText.value;

    if (!text.trim()) {
        return '';
    }

    // Replace placeholders with actual values
    placeholders.forEach(placeholder => {
        const replacement = replacements[placeholder] || `{${placeholder}}`;
        const regex = new RegExp(`\\{${placeholder}\\}`, 'g');
        text = text.replace(regex, replacement);
    });

    return text;
}

/**
 * Update the output display
 */
function updateOutput() {
    let text = inputText.value;

    if (!text.trim()) {
        outputText.innerHTML = '<div class="no-text">Enter text with placeholders above to see the result here...</div>';
        downloadBtn.disabled = true;
        return;
    }

    // Replace placeholders with actual values or highlight unfilled ones
    placeholders.forEach(placeholder => {
        const replacement = replacements[placeholder];
        if (replacement) {
            const regex = new RegExp(`\\{${placeholder}\\}`, 'g');
            text = text.replace(regex, `<span class="highlight">${replacement}</span>`);
        } else {
            const regex = new RegExp(`\\{${placeholder}\\}`, 'g');
            text = text.replace(regex, `<span class="placeholder">{${placeholder}}</span>`);
        }
    });

    outputText.innerHTML = text;
    downloadBtn.disabled = false;
}

/**
 * Download the final text as PDF
 */
function downloadPDF() {
    const plainText = getPlainText();

    if (!plainText.trim()) {
        alert('Please enter some text before downloading.');
        return;
    }

    try {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 20;
        const maxWidth = pageWidth - 2 * margin;

        // Set font
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);

        // Split text into lines that fit the page width
        const lines = doc.splitTextToSize(plainText, maxWidth);

        let yPosition = margin;
        const lineHeight = 7;

        lines.forEach((line, index) => {
            // Check if we need a new page
            if (yPosition + lineHeight > pageHeight - margin) {
                doc.addPage();
                yPosition = margin;
            }

            doc.text(line, margin, yPosition);
            yPosition += lineHeight;
        });

        // Generate filename with timestamp
        const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
        const filename = `text-replacement-${timestamp}.pdf`;

        doc.save(filename);

        // Show success message
        showNotification('PDF downloaded successfully!', 'success');

    } catch (error) {
        console.error('Error generating PDF:', error);
        showNotification('Error generating PDF. Please try again.', 'error');
    }
}

/**
 * Show notification to user
 * @param {string} message - The message to show
 * @param {string} type - The type of notification (success, error, info)
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        max-width: 300px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    `;

    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.background = 'linear-gradient(45deg, #48bb78, #38a169)';
            break;
        case 'error':
            notification.style.background = 'linear-gradient(45deg, #f56565, #e53e3e)';
            break;
        default:
            notification.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
    }

    // Add animation keyframes
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

/**
 * Handle input text changes
 */
function handleInputChange() {
    const text = inputText.value;
    const newPlaceholders = extractPlaceholders(text);

    // Check if placeholders have changed
    if (JSON.stringify(placeholders) !== JSON.stringify(newPlaceholders)) {
        placeholders = newPlaceholders;

        // Preserve existing replacements
        const newReplacements = {};
        placeholders.forEach(placeholder => {
            if (replacements[placeholder]) {
                newReplacements[placeholder] = replacements[placeholder];
            }
        });
        replacements = newReplacements;

        createReplacementFields(placeholders);
    }

    updateOutput();
}

/**
 * Initialize the application
 */
function init() {
    // Add event listeners
    inputText.addEventListener('input', handleInputChange);

    // Initial update
    updateOutput();

    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl+S or Cmd+S to download PDF
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            if (!downloadBtn.disabled) {
                downloadPDF();
            }
        }
    });

    // Add focus management for better accessibility
    inputText.addEventListener('focus', () => {
        inputText.parentElement.style.transform = 'scale(1.01)';
    });

    inputText.addEventListener('blur', () => {
        inputText.parentElement.style.transform = 'scale(1)';
    });

    const examplePreview = document.getElementById('examplePreview');
    const toggleExampleBtn = document.getElementById('toggleExampleBtn');

    toggleExampleBtn.addEventListener('click', () => {
        examplePreview.classList.toggle('collapsed');
        toggleExampleBtn.textContent = examplePreview.classList.contains('collapsed') ? 'Show more' : 'Show less';
    });
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}