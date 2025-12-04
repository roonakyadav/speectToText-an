# 🎙️ SpeechFX - Premium Dark Mode Speech-to-Text App

A stunning, modern web app that converts your voice to text with beautiful dark UI, inspired by Linear, YouTube Studio, and Vercel. Features real-time transcription, note saving, and localStorage persistence.

![SpeechFX Preview](./assets/preview.png)

## ✨ Features

- **🎨 Modern Dark UI** - Sleek aesthetic with teal gradient accents inspired by top SaaS apps
- **🎤 Real-Time Speech Recognition** - No voice echo, accurate transcription using Web Speech API
- **📝 Smart Note Saving** - Save notes as clean pill tags with delete functionality
- **💾 LocalStorage Persistence** - Your notes survive page refreshes (not tab closes)
- **🎵 Audio Feedback** - Optional start/stop beeps using Web Audio API
- **📱 Responsive Design** - Works perfectly on desktop and mobile
- **♿ Accessibility** - Keyboard navigation and screen reader friendly
- **🚀 Progressive Enhancement** - Works even if JavaScript fails

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **APIs Used:** Web Speech API, Web Audio API, localStorage
- **Frameworks:** None (vanilla JavaScript for max compatibility)
- **Styling:** Modern CSS with custom properties, flexbox, grid

## 🚀 Quick Start

1. **Clone this repository:**
   ```bash
   git clone https://github.com/roonakyadav/speectToText-an.git
   cd speectToText-an
   ```

2. **Open the app:**
   ```bash
   # Option 1: Direct file open (simple)
   open index.html

   # Option 2: Use a local server (recommended for full features)
   python -m http.server 8000  # or use any preferred server
   ```

3. **Use the app:**
   - Click "Start Listening" and grant microphone permission
   - Speak clearly - text appears in real-time
   - Click "Stop Listening" to end transcription
   - Click "Save Note" to persist your notes
   - Notes appear as removable pill tags
   - Refresh page - notes stay visible!

## 📸 Screenshots

### Main Interface
The clean, professional layout with Gradient title effect and organized sections.

### In Action
Real-time speech transcription showing the dark UI responsiveness and modern gradients.

### Note Management
Saved notes displayed as elegant pill tags with easy delete functionality.

## 🎯 How It Works

```javascript
// Speech Recognition Setup
const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;

// Real-time transcription
recognition.onresult = (event) => {
  let transcript = '';
  for (let i = 0; i < event.results.length; i++) {
    transcript += event.results[i][0].transcript;
  }
  displayTranscript(transcript);
};

// localStorage persistence
const saveNotesToStorage = (notes) => {
  localStorage.setItem('speechfx-notes', JSON.stringify(notes));
};
```

**No frameworks, no dependencies** - Pure vanilla JavaScript for maximum compatibility and minimal bundle size!

## 🤝 Contributing

We welcome contributions! Follow this workflow:

1. **Fork the repository** and clone locally
2. **Create a feature branch:** `git checkout -b feature/amazing-enhancement`
3. **Make your changes** and test thoroughly
4. **Commit with clear messages:** `git commit -m "Add amazing speech enhancement"`
5. **Push to your fork** and **create a Pull Request**

### Development Guidelines:

- ✨ **Modern JS**: Use ES6+ features (arrow functions, const/let, async/await)
- 🎨 **Clean Code**: Follow readable naming conventions and comment key logic
- 📱 **Mobile First**: Test on multiple screen sizes
- 🚀 **Performance**: Optimize for smooth 60fps animations
- 🧪 **Test**: Manual testing across Chrome, Firefox, Safari, Edge

### Area Ideas for Contribution:
- 🌈 **Theming Options**: Light mode, color themes, custom gradients
- 🌍 **Multilingual Support**: Add language selection dropdown
- 📊 **Analytics Dashboard**: Visualize speech patterns, word counts
- 🎨 **Custom Fonts**: Allow users to upload preferred typefaces
- 🔊 **Advanced Audio**: Voice filters, pitch detection, noise reduction
- 💾 **Sync Options**: Cloud backup, export as PDF/TXT/JSON
- ⌨️ **Keyboard Shortcuts**: Hotkeys for common actions
- 🤖 **AI Integration**: Auto-correct, sentiment analysis, topic detection
- 📝 **Rich Notes**: Add images, formatting, categorization to saved notes
- 🌐 **PWA Support**: Install as app, offline functionality

See our [Issues Tab](https://github.com/roonakyadav/speectToText-an/issues) for detailed enhancement ideas with bounties! 🎉

## 📋 Roadmap

- [ ] Voice commands for hands-free operation
- [ ] Translation mode for multiple languages
- [ ] Team collaboration features
- [ ] Advanced analytics and insights
- [ ] Plugin system for custom features
- [ ] Mobile native app versions (Flutter/React Native)

## 🐛 Bug Reports & Feature Requests

Found a bug? Want a new feature? [Open an issue](https://github.com/roonakyadav/speectToText-an/issues/new) and we'll respond quickly!

Please include:
- Browser/OS details
- Steps to reproduce
- Expected vs actual behavior
- Screenshots/videos if applicable

## 📄 License

MIT License - Feel free to use this in your projects, modify, and distribute!

## 🙏 Acknowledgments

- Inspired by Linear, YouTube Studio, and Vercel Team dashboards
- Uses the open-source Web Speech API specification
- Built with ❤️ using modern web standards

---

**Star ⭐ this repo if you found it useful!** Want to get notified of updates? Stay tuned!

*Made with passion by [@roonakyadav](https://github.com/roonakyadav)*
