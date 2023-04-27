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
  function chengeValue(val: string) {
    setRadioValue(val);
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

      setAnswerField(`we post********  DESTINATION_URL:${currentValue} ********
       COMPANY_INFO: ${companyValue}******** TYPE_COMPANY: ${radioValue}`);
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
                  letter from company
                </label>
              </div>
            </div>
          </fieldset>

          <input
            className="search-input"
            type="text"
            placeholder={
              radioValue === 'company-linkedin'
                ? 'input company profile linkedin '
                : 'input company name'
            }
            onChange={(e) => setCompanyValue(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
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
