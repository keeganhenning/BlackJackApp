import { player } from './Player';
import { dealer } from './Dealer';
import { dealCard } from './Card';

export const game = {
  gameOver: false,
  betAmount: 0,
};

export const dealInitialCards = () => {
  player.hand = [dealCard(), dealCard()];
  dealer.hand = [dealCard(), dealCard()];
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

export const resetGame = () => {
  game.gameOver = false;
  game.betAmount = 0;
  player.hand = [];
  player.score = 0;
  dealer.hand = [];
  dealer.score = 0;
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
