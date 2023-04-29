import React from 'react';
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './generator-text.css';
function GeneratorText() {
  const { transcript } = useSpeechRecognition();
  function startVoice() {
    SpeechRecognition.startListening();
  }
  function stopVoice() {
    SpeechRecognition.stopListening();
  }
  function voice() {
    const text = transcript;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = window.speechSynthesis.getVoices()[1];
    window.speechSynthesis.speak(utterance);
  }

  return (
    <div className="generator-text-wrapper">
      <div className="generator-text">
        <p>{transcript ? transcript : 'Start listening for transcript'}</p>
        <div className="start-stop-wrapper">
          <button onClick={startVoice}>Start listening</button>

          <button onClick={stopVoice}>Stop listening</button>
        </div>
        <div>
          <button onClick={voice}>Voice</button>
        </div>
      </div>
    </div>
  );
}
export default GeneratorText;
