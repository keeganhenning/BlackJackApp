
import { deck, shuffleDeck } from './Deck';


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
    let value = card.slice(0, 1);
    if (['A'].includes(value)) {
      aceCount += 1;
      score += 11;
    } else if (['K', 'Q', 'J', '1'].includes(value)) {
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

export const game = {
  gameOver: false,
  betAmount: 0,
};


export const determineWinner = () => {
  // Implement the logic to determine the winner
if (player.score > 21) {
    // Player busts, dealer wins
    return "Dealer";
} else if (dealer.score > 21) {
    // Dealer busts, player wins
    return "Player";
} else if (player.score === dealer.score) {
    // It's a tie
    return "Tie";
} else if (player.score > dealer.score) {
    // Player wins
    return "Player";
} else {
    // Dealer wins
    return "Dealer";
}

};


export const bet = (amount) => {
    game.betAmount = amount;
};

export const bank = {
    balance: 1000,
    addToBalance: (amount) => {
        bank.balance += amount;
    },
    subtractFromBalance: (amount) => {
        bank.balance -= amount;
    },
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

export const handleStand = () => {
  while (dealer.score < 17) {
    dealer.hand.push(dealCard());
    dealer.score = calculateScore(dealer.hand);
    setTimeout(() =>  1000);
  }
    determineWinner();
};  



