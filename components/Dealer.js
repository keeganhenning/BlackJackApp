import { dealCard, calculateScore } from './Card';

export const dealer = {
  hand: [],
  score: 0,
};

export const handleStand = () => {
  while (dealer.score < 17) {
    dealer.hand.push(dealCard());
    dealer.score = calculateScore(dealer.hand);
  }
};