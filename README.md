# Voice to Text using AssemblyAI and React

Voice to Text is a web application that utilizes AssemblyAI, a powerful automatic transcription service, to convert audio recordings into text. This project is built using React and allows users to record audio, submit it for transcription, and view the transcribed text.

## Introduction

Voice to Text is a React-based application that leverages the AssemblyAI API to transcribe audio recordings. The application offers a user-friendly interface to record audio, submit it for transcription, and view the resulting text. This project is an excellent example of how to integrate the AssemblyAI API with React.

## Features

- Record audio using your device's microphone.
- Submit recorded audio for transcription.
- View the transcribed text in real-time.
- Responsive and user-friendly interface.

## Getting Started

Follow these steps to set up and run the Voice to Text application:

1. Clone the repository:

   ```bash
   git clone https://github.com/sourav919/voice-to-text.git
   ```

2. Navigate to the project directory:
   ```bash
    cd voice-to-text
    ```
3. Install the dependencies:
    ```bash
     npm install
     ```
4. Set up your AssemblyAI API Key:
    - Obtain an API Key from AssemblyAI.
    - Create a file named `.env.local` in the project root.
    - Add your API Key to the `.env.local` file:

    
   ```bash 
    REACT_APP_ASSEMBLYAI_API_KEY=YOUR_API_KEY_HERE
   ```

5. Start the development server:
   ```bash
    npm start
   ```

The application will be accessible at http://localhost:3000.

## Usage
- Open the Voice to Text application in your web browser.
- Click the "Record" button to start recording audio.
- Click the "Stop" button to stop the recording.
- Click the "Submit for Transcription" button to send the audio to AssemblyAI for transcription.
- You will see the transcribed text displayed in the application once the transcription is complete.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

