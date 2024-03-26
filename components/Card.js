import { deck, shuffleDeck } from './Deck';
import { determineWinner } from './Game';

let shuffledDeck = shuffleDeck([...deck]);

export const dealCard = () => {
  if (shuffledDeck.length === 0) {
    shuffledDeck = shuffleDeck([...deck]);
  }
  return shuffledDeck.pop();
};

export const calculateScore = (hand) => {
  let score = 0;
  let aceCount = 0;

  for (let card of hand) {
    let value = card.slice(0, -1);
    if (value === 'A') {
      aceCount += 1;
      score += 11;
    } else if (['K', 'Q', 'J'].includes(value)) {
      score += 10;
    } else {
      score += parseInt(value);
    }
  }

  while (score > 21 && aceCount > 0) {
    score -= 10;
    aceCount -= 1;
  }
  return score;
};