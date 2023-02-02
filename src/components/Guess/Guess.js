import React from 'react';
import { range } from '../../utils';

function Guess({ value }) {
  return (
    <p className='guess'>
      {range(5).map((index) => (
        <span
          className={`cell ${
            value?.result[index].status === 'incorrect'
              ? 'incorrect'
              : value?.result[index].status === 'correct'
              ? 'correct'
              : value?.result[index].status === 'misplaced'
              ? 'misplaced'
              : ''
          }`}
          key={index}
        >
          {value?.guess ? value?.guess[index] : undefined}
        </span>
      ))}
    </p>
  );
}

export default Guess;
