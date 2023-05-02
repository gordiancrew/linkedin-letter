import React, { useState } from 'react';
import './input-bar.css';
function InputBar() {
  const [radioValue, setRadioValue] = useState('company-linkedin');
  const [currentValue, setCurrentValue] = useState('');
  const [companyValue, setCompanyValue] = useState('');
  const [answerField, setAnswerField] = useState('input desident and your company');
  function buttonHundler() {
    requestApi();
  }
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      requestApi();
      e.preventDefault();
    }
  }
  function handleKeyDownTextarea(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter') {
      requestApi();
      e.preventDefault();
    }
  }
  function chengeValue(val: string) {
    setRadioValue(val);
  }
  // function isValidHttpUrl(str: string) {
  //   const pattern = new RegExp(
  //     '^(https?:\\/\\/)?' + // protocol
  //       '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
  //       '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
  //       '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
  //       '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
  //       '(\\#[-a-z\\d_]*)?$', // fragment locator
  //     'i'
  //   );
  //   return pattern.test(str);
  // }

  async function requestApi() {
    if (true) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ link: currentValue, company: companyValue }),
      };
      setAnswerField('Loading...');
      await fetch('http://188.225.46.66/hello', requestOptions)
        .then((response) => response.json())
        .then((res: { output_text: string }) => setAnswerField(res.output_text))
        .catch((error) => console.log('POST!! error', error));
    } else {
      setAnswerField('no valid destination  linkedin profile url');
    }
  }
  return (
    <div className="field">
      <div className="search">
        <form className="form-field">
          <fieldset className="radio-fieldset">
            <div className="radio-field-wrapper">
              <div className="radio-field">
                <label>
                  <input
                    type="radio"
                    name="radio"
                    checked={radioValue === 'company-linkedin' ? true : false}
                    onChange={() => chengeValue('company-linkedin')}
                  />
                  letter from profile linkedin
                </label>
                <label>
                  <input
                    type="radio"
                    name="radio"
                    checked={radioValue === 'company-name' ? true : false}
                    onChange={() => chengeValue('company-name')}
                  />
                  letter from description company
                </label>
              </div>
            </div>
          </fieldset>

          <textarea
            className="search-area"
            style={radioValue === 'company-name' ? { height: '300px' } : {}}
            placeholder={
              radioValue === 'company-linkedin'
                ? 'input company profile linkedin '
                : 'input description about company'
            }
            onChange={(e) => setCompanyValue(e.target.value)}
            onKeyDown={(e) => handleKeyDownTextarea(e)}
          />
          <input
            className="search-input"
            type="text"
            placeholder="input destination profile linkedin"
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
