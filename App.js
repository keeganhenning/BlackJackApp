import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const BlackjackApp = () => {
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);
  const [resultMessage, setResultMessage] = useState('');
  const [betAmount, setBetAmount] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const deck = [
    '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A',
    '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A',
    '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A',
    '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'
  ];

  const shuffleDeck = () => {
    // Implement deck shuffling logic here
  };

  const dealCard = (hand, setHand, scoreSetter) => {
    if(deck.length === 0) {
      shuffleDeck();
    }else if(calculateScore(hand) < 21) {
    const updatedDeck = [...deck];
    const randomIndex = Math.floor(Math.random() * updatedDeck.length);
    const dealtCard = updatedDeck.splice(randomIndex, 1)[0];
    
    if (hand.length === 0) {
      // If dealer's hand is empty, deal a single card as the first card
      setHand([dealtCard]);
    } else {
      // Otherwise, add the dealt card to the hand
      setHand([...hand, dealtCard]);
    }
  
    // Calculate and update the score
    const newScore = calculateScore([...hand, dealtCard]);
    scoreSetter(newScore);
  }
};

  
  
  

  const calculateScore = (hand) => {
    let score = 0;
    let aceCount = 0;
  
    // Iterate through each card in the hand
    for (let i = 0; i < hand.length; i++) {
      const card = hand[i];
      // If the card is a number card (2-10), add its value to the score
      if (!isNaN(card)) {
        score += parseInt(card);
      }
      // If the card is a face card (J, Q, K), add 10 to the score
      else if (['J', 'Q', 'K'].includes(card)) {
        score += 10;
      }
      // If the card is an Ace, increment the Ace count
      else if (card === 'A') {
        aceCount++;
      }
    }
  
    // Add Ace values to the score
    for (let i = 0; i < aceCount; i++) {
      // If adding 11 to the score doesn't bust, add 11; otherwise, add 1
      if (score + 11 <= 21) {
        score += 11;
      } else {
        score += 1;
      }
    }
  
    return score;
  };
  

  const dealInitialCards = () => {
    if(playerHand.length !== 2) {
      dealCard(playerHand, setPlayerHand, setPlayerScore);
      dealCard(playerHand, setPlayerHand, setPlayerScore);
    }
    if(dealerHand.length ==0) {
    dealCard(dealerHand, setDealerHand, setDealerScore);
    //dealCard(playerHand, setPlayerHand, setPlayerScore);
    //dealCard(dealerHand, setDealerHand, setDealerScore);
    }
    };
  
  const handleHit = () => {
    dealCard(playerHand, setPlayerHand, setPlayerScore);
  };

  //const dealerHit = () => {
    //dealCard(dealerHand, setDealerHand, setDealerScore);
  //};
  

  const handleStand = () => {
    dealCard(dealerHand, setDealerHand, setDealerScore);
    while (dealerScore < 17) {
      if (dealerScore < 17) {
        // Dealer hits
        dealCard(dealerHand, setDealerHand, setDealerScore);
        setTimeout(dealerHitLoop, 500); // Delay execution to prevent blocking
        dealerHitLoop();
      } else {
        // Dealer's turn is finished, check for winner
        determineWinner();
      }
    //};
    }
  };

  const dealerHitLoop = () => {
    dealCard(dealerHand, setDealerHand, setDealerScore);
    while(dealerScore < 17) {
      dealerHitLoop();
    }
  };

  const determineWinner = () => {
    if (playerScore > 21) {
      setResultMessage('Player busts, dealer wins');
    } else if (dealerScore > 21) {
      setResultMessage('Dealer busts, player wins');
    } else if (playerScore > dealerScore) {
      setResultMessage('Player wins');
    } else if (playerScore < dealerScore) {
      setResultMessage('Dealer wins');
    } else {
      setResultMessage('It\'s a tie');
    }
  };
  

  const handleDouble = () => {
    // Implement logic for the player doubling down
  };

  const handleSplit = () => {
    // Implement logic for the player splitting
  };

  const resetGame = () => {
  // Reset player and dealer cards to empty arrays
  setPlayerCards([]);
  setDealerCards([]);
  // Generate a new deck of cards
  const newDeck = generateDeck();
  // Set the deck state to the new deck
  setDeck(newDeck);
  // Reset player and dealer scores to 0
  setPlayerScore(0);
  setDealerScore(0);
  // Reset player bust state to false
  setPlayerBust(false);
  // Deal initial cards to start a new game
  dealInitialCards();
};


  return (
    <View>
      <Text>Blackjack</Text>
      <Text>Result: {resultMessage}</Text>
      <View>
        <Text>Dealer Hand: {dealerHand.join(', ')}</Text>
        <Text>Dealer Score: {dealerScore}</Text>
      </View>
      <View>
        <Text>Player Hand: {playerHand.join(', ')}</Text>
        <Text>Player Score: {playerScore}</Text>
      </View>
      <View>
        <Button title="Deal" onPress={dealInitialCards} />
        <Button title="Hit" onPress={handleHit} />
        <Button title="Stand" onPress={handleStand} />
        <Button title="Double" onPress={handleDouble} />
        <Button title="Split" onPress={handleSplit} />
        <Button title="Reset" onPress={resetGame} />
      </View>
      <View>
        <Text>Bet Amount: {betAmount}</Text>
      </View>
    </View>
  );
};

export default BlackjackApp;
