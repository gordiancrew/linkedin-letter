import React, { useState } from 'react';
import './input-bar.css';
function InputBar() {
  const [currentValue, setCurrentValue] = useState('');
  const [answerField, setAnswerField] = useState('input url profile linkedin');
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

  async function requestApi() {
    if (isValidHttpUrl(currentValue)) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileURL: currentValue }),
      };
      setAnswerField('Loading...');
      await fetch('http://nameserver.com/endpoint', requestOptions)
        .then((response) => response.json())
        .then((res: { textLetter: string }) => setAnswerField(res.textLetter))
        .catch((error) => console.log('POST!! error', error));

      setAnswerField(
        `In this area we write text letter, programm sent post request in URL: http://nameserver.com/endpoint whith body where argument  profileURL:(our input value: ${currentValue}), we wait response body with generated letter or error`
      );
    } else {
      setAnswerField('no valid  linkedin profileurl');
    }
  }
  return (
    <div className="field">
      <div className="search">
        <form>
          <input
            type="text"
            placeholder="input profile linkedin"
            onChange={(e) => setCurrentValue(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
          />
          <button onClick={buttonHundler} type="button">
            send
          </button>
        </form>
      </div>
      <div className="answerField">
        <p>{answerField}</p>
      </div>
    </div>
  );
}
export default InputBar;
