import React from 'react';

import { checkGuess } from '../../game-helpers';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';
import { sample } from '../../utils';
import { WORDS } from '../../data';
import GuessInput from '../GuessInput/GuessInput';
import GuessResults from '../GuessResults/GuessResults';
import Lostbanner from '../LostBanner/LostBanner';
import WonBanner from '../WonBanner/WonBanner';

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [guesses, setGuesses] = React.useState([]);
  const [status, setStatus] = React.useState('playing');

  function handleSubmitGuess(tentativeGuess) {
    //non modifico l'array esistente, ne creo uno nuovo
    //con lo spread operator per i precedenti + il nuovo valore

    /* il mio approccio precedente era:
    
    const newArray = [...vecchioArray];
    newArray.push(nuovoValore);
    setGuesses(newArray)
    
    lo spread operator è più semplice e più leggibile
    */
    let guessValidation = checkGuess(tentativeGuess, answer);
    let nextGuessArray = [
      ...guesses,
      { guess: tentativeGuess, result: guessValidation },
    ];

    setGuesses([
      ...guesses,
      { guess: tentativeGuess, result: guessValidation },
    ]);

    if (guessValidation.every((item) => item.status === 'correct')) {
      setStatus('won');
    } else if (nextGuessArray.length >= NUM_OF_GUESSES_ALLOWED) {
      setStatus('lost');
    }
  }
  console.log(guesses);

  return (
    <>
      <GuessResults guesses={guesses} />
      {status === 'lost' && <Lostbanner answer={answer} />}
      {status === 'won' && <WonBanner numOfGuesses={guesses.length} />}
      <GuessInput handleSubmitGuess={handleSubmitGuess} status={status} />
    </>
  );
}

export default Game;
