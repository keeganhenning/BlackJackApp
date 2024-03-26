import { dealCard, calculateScore } from './Card';
import { determineWinner } from './Game';

export const player = {
  hand: [],
  score: 0,
};

export const handleHit = () => {
    const newHand = [...player.hand, dealCard()];
    player.score = calculateScore(newHand);
    if (player.score > 21) {
        determineWinner();
    }
    else if (player.score === 21) {
        determineWinner();
    }
    return newHand;
};


export const handleDouble = () => {
  player.hand.push(dealCard());
  player.score = calculateScore(player.hand);
bet *= 2;
};

export const handleSplit = () => {
const newHand = [player.hand.pop()];
player.score = calculateScore(player.hand);
return [player, { hand: newHand, score: calculateScore(newHand) }];
};