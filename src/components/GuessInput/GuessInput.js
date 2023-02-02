import React from 'react';

function GuessInput({ handleSubmitGuess, status }) {
  const [tentativeGuess, setTentativeGuess] = React.useState('');

  function handleSubmit(event) {
    //prevent the default behavior of the form (which is to refresh the page)
    event.preventDefault();

    //minLength and maxLength are not supported by all browsers,
    //if you select the text and paste a longer word, it will still submit
    //so we'll check the length manually to be safe

    //minlenght doesn't work if you transform the input to uppercase
    //before setting it to the state because the length is calculated on the original value
    // (lowercase) and not on the transformed value (uppercase)
    //so we have to check the length manually and not using minLength or
    //use a regex to check if the input is a 5 letter word
    if (tentativeGuess.length !== 5) {
      alert('Please enter a 5 letter word');
      return;
    }
    handleSubmitGuess(tentativeGuess);
    setTentativeGuess('');
  }

  return (
    <>
      <form className='guess-input-wrapper' onSubmit={handleSubmit}>
        <label htmlFor='guess-input'>Enter guess:</label>
        <input
          required
          disabled={status !== 'playing'}
          minLength={5}
          maxLength={5}
          id='guess-input'
          type='text'
          value={tentativeGuess}
          onChange={(event) => {
            const upperCaseInput = event.target.value.toUpperCase();
            setTentativeGuess(upperCaseInput);
          }}
        />
      </form>
    </>
  );
}

export default GuessInput;
