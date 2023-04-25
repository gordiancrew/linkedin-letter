import React, { useState } from 'react';
import './input-bar.css';
function InputBar() {
  const [currentValue, setCurrentValue] = useState('');
  const [answerField, setAnswerField] = useState('input http linkedin');
  function buttonHundler() {
    requestApi();
  }
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      requestApi();
      e.preventDefault();
    }
  }
  function isValidHttpUrl(str: string) {
    const pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', // fragment locator
      'i'
    );
    return pattern.test(str);
  }

  function requestApi() {
    if (isValidHttpUrl(currentValue)) {
      alert('request');
    } else {
      setAnswerField('no valid url');
    }
  }
  return (
    <div className="field">
      <div className="search">
        <form>
          <input
            type="text"
            placeholder="input"
            onChange={(e) => setCurrentValue(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
          />
          <button onClick={buttonHundler} type="button">
            send
          </button>
        </form>
      </div>
      <div className="answerField">{answerField}</div>
    </div>
  );
}
export default InputBar;
