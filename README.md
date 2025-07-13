# Dynamic Text Replacement Tool [Cover Letter Modifier] A Vibe Coding Experiment

A powerful web application that allows users to create dynamic text templates with placeholder replacements and export functionality to PDF. 

## Features

- **Dynamic Placeholder Detection**: Automatically detects placeholders in curly braces `{placeholder}`
- **Real-time Field Generation**: Creates input fields for each unique placeholder
- **Live Preview**: Shows the final text with replacements in real-time
- **PDF Export**: One-click PDF generation with proper formatting
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Accessibility**: Built with ARIA labels and keyboard navigation support
- **Modern UI**: Clean, professional interface with smooth animations

## How to Use

1. **Enter Text**: Type or paste your text with placeholders in curly braces
   - Example: `Hello {name}, welcome to {place}!`

2. **Fill Placeholders**: Input fields will automatically appear for each placeholder
   - Enter the replacement text for each placeholder

3. **Preview**: See the final text with all replacements applied in real-time

4. **Export**: Click "Download as PDF" to generate and download a PDF file

## Installation & Deployment

### Quick Deployment

1. **Download/Clone** the project files
2. **Upload** the entire folder to your web server
3. **Access** via your domain (e.g., `https://yourdomain.com/text-replacement-tool/`)

### File Structure

```
text-replacement-tool/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Stylesheet
├── js/
│   └── script.js       # JavaScript functionality
├── assets/
│   └── favicon.ico     # Website icon
├── README.md           # This file
└── .htaccess          # Apache configuration (optional)
```

### Server Requirements

- **Web Server**: Apache, Nginx, or any static file server
- **HTTPS**: Recommended for production
- **No Backend**: Pure client-side application

### Supported Browsers

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Technical Details

### Dependencies

- **jsPDF**: For PDF generation (loaded via CDN)
- **Pure HTML/CSS/JS**: No frameworks required

### Features

- **Responsive Design**: Mobile-first approach
- **Accessibility**: WCAG 2.1 AA compliant
- **Performance**: Lightweight and fast loading
- **SEO**: Proper meta tags and semantic HTML

### Customization

#### Styling
Edit `css/style.css` to customize:
- Colors and gradients
- Typography
- Layout and spacing
- Animations

#### Functionality
Edit `js/script.js` to modify:
- Placeholder detection regex
- PDF formatting options
- Additional features

## Examples

### Basic Usage
```
Input: "Dear {customer_name}, your order #{order_id} is ready!"
Fields: customer_name, order_id
Output: "Dear John Doe, your order #12345 is ready!"
```

### Advanced Templates
```
Input: "Invoice for {client_name}
Date: {date}
Amount: ${amount}
Due: {due_date}

Thank you for your business!"
```

## Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome  | 60+     | ✅ Full |
| Firefox | 55+     | ✅ Full |
| Safari  | 12+     | ✅ Full |
| Edge    | 79+     | ✅ Full |

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For issues or questions:
- Create an issue in the repository
- Check the documentation
- Review the code comments

## Changelog

### v1.0.0 (2025-07-12)
- Initial release
- Dynamic placeholder detection
- PDF export functionality
- Responsive design
- Accessibility features

---

**Built from boredom with ❤️ for productivity and efficiency**
