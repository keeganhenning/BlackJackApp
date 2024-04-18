import React, { useState } from 'react';
import { Text, View, Button, Image } from 'react-native';
import { shuffleDeck, deck } from './components/Deck';
import { Slider } from 'react-native-elements';

const cardImages = {
  '2C': require('./assets/2C.png'),
  '2D': require('./assets/2D.png'),
  '2H': require('./assets/2H.png'),
  '2S': require('./assets/2S.png'),
  '3C': require('./assets/3C.png'),
  '3D': require('./assets/3D.png'),
  '3H': require('./assets/3H.png'),
  '3S': require('./assets/3S.png'),
  '4C': require('./assets/4C.png'),
  '4D': require('./assets/4D.png'),
  '4H': require('./assets/4H.png'),
  '4S': require('./assets/4S.png'),
  '5C': require('./assets/5C.png'),
  '5D': require('./assets/5D.png'),
  '5H': require('./assets/5H.png'),
  '5S': require('./assets/5S.png'),
  '6C': require('./assets/6C.png'),
  '6D': require('./assets/6D.png'),
  '6H': require('./assets/6H.png'),
  '6S': require('./assets/6S.png'),
  '7C': require('./assets/7C.png'),
  '7D': require('./assets/7D.png'),
  '7H': require('./assets/7H.png'),
  '7S': require('./assets/7S.png'),
  '8C': require('./assets/8C.png'),
  '8D': require('./assets/8D.png'),
  '8H': require('./assets/8H.png'),
  '8S': require('./assets/8S.png'),
  '9C': require('./assets/9C.png'),
  '9D': require('./assets/9D.png'),
  '9H': require('./assets/9H.png'),
  '9S': require('./assets/9S.png'),
  '10C': require('./assets/10C.png'),
  '10D': require('./assets/10D.png'),
  '10H': require('./assets/10H.png'),
  '10S': require('./assets/10S.png'),
  'JC': require('./assets/JC.png'),
  'JD': require('./assets/JD.png'),
  'JH': require('./assets/JH.png'),
  'JS': require('./assets/JS.png'),
  'QC': require('./assets/QC.png'),
  'QD': require('./assets/QD.png'),
  'QH': require('./assets/QH.png'),
  'QS': require('./assets/QS.png'),
  'KC': require('./assets/KC.png'),
  'KD': require('./assets/KD.png'),
  'KH': require('./assets/KH.png'),
  'KS': require('./assets/KS.png'),
  'AC': require('./assets/AC.png'),
  'AD': require('./assets/AD.png'),
  'AH': require('./assets/AH.png'),
  'AS': require('./assets/AS.png'),
  'back': require('./assets/back.png'),
};

function BlackjackApp() {
  const [playerHand, setPlayerHand] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [playerBank, setBank] = useState(1000);
  const [dealerHand, setDealerHand] = useState([]);
  const [dealerScore, setDealerScore] = useState(0);
  const [showDealerCard, setShowDealerCard] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);

let shuffledDeck = shuffleDeck([...deck]);

const dealCard = () => {
  if (shuffledDeck.length === 0) {
    shuffledDeck = shuffleDeck([...deck]);
  }
  return shuffledDeck.pop();
};

const calculateScore = (hand, isDealer) => {
  let score = 0;
  let aceCount = 0;

  for (let i = 0; i < hand.length; i++) {
    let card = hand[i];
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

  if (isDealer && !showDealerCard) {
    score -= parseInt(hand[1].slice(0, 1));
  }

  while (score > 21 && aceCount > 0) {
    score -= 10;
    aceCount -= 1;
  }
  return score;
};

const determineWinner = () => {
  // Implement the logic to determine the winner
  if (playerScore > 21) {
    // Player busts, dealer wins
    return "Dealer";
  } else if (dealerScore > 21) {
    // Dealer busts, player wins
    return "Player";
  } else if (playerScore === dealerScore) {
    // It's a tie
    return "Tie";
  } else if (playerScore > dealerScore) {
    // Player wins
    return "Player";
  } else {
    // Dealer wins
    return "Dealer";
  }
};

const bet = (amount) => {
  game.betAmount += amount;
  bank.subtractFromBalance(amount);
};

const bank = {
  balance: 1000,
  addToBalance: (amount) => {
    bank.balance += amount;
  },
  subtractFromBalance: (amount) => {
    bank.balance -= amount;
  },
};

const handleHit = (currentHand) => {
  const newHand = [...currentHand, dealCard()];
  const newScore = calculateScore(newHand);
  if (newScore > 21) {
    determineWinner();
  } else if (newScore === 21) {
    determineWinner();
  }
  return newHand;
};

const handleDouble = (currentHand) => {
  const newHand = [...currentHand, dealCard()];
  bet(game.betAmount * 2);
  return newHand;
};

const handleSplit = (currentHand) => {
  const newHand = [currentHand.pop()];
  return [currentHand, { hand: newHand, score: calculateScore(newHand) }];
};

const handleStand = (currentHand) => {
  while (dealerScore < 17) {
    currentHand.push(dealCard());
    setDealerHand(currentHand);
    setDealerScore(calculateScore(currentHand));
    }
  determineWinner();
};

const onSliderValueChange = (value) => {
  setSliderValue(value);
};

const resetGame = () => {
  setPlayerHand([]);
  setPlayerScore(0);
  setBank(1000);
  setDealerHand([]);
  setDealerScore(0);
  setShowDealerCard(false);
  dealInitialCards();
};

const dealInitialCards = () => {
  setPlayerHand([dealCard(), dealCard()]);
  setDealerHand([dealCard(), dealCard()]);
  setDealerScore(calculateScore(dealerHand));
  setPlayerScore(calculateScore(playerHand));
};

React.useEffect(() => {
  resetGame();
}, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Blackjack</Text>
      <View style={styles.playerContainer}>
        <Text style={styles.playerHandText}>Player's Hand: {playerHand && playerHand.length > 0 ? playerHand.join(', ') : ''}</Text>
        <Text style={styles.playerScoreText}>Player's Score: {playerScore}</Text>
        <Text style={styles.playerBankText}>Player's Bank: {playerBank}</Text>
        <Text>Value: {sliderValue}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={playerBank}
          step={10}
          value={sliderValue}
          onValueChange={onSliderValueChange}
          thumbProps={{ style: styles.thumb, 
          thumbSize: 20, 
          thumbTintColor: 'black', 
          minimumTrackTintColor: 'blue', 
          maximumTrackTintColor: 'gray', }}
        />
        <View style={styles.buttonContainer}>
          <Button title="Hit" onPress={() => {
            const newPlayerHand = handleHit(playerHand);
            setPlayerHand(newPlayerHand);
            setPlayerScore(calculateScore(newPlayerHand));
          }} />
          <Button title="Double" onPress={() => setPlayerHand(handleDouble(playerHand))} />
          <Button title="Split" onPress={() => setPlayerHand(handleSplit(playerHand))} />
        </View>
        <View style={styles.cardContainer}>
          {playerHand && playerHand.map((card, index) => (
            <Image key={index} source={cardImages[card]} style={styles.cardImage} />
          ))}
        </View>
      </View>
      <View style={styles.dealerContainer}>
        <Text style={styles.dealerHandText}>Dealer's Hand: {dealerHand && dealerHand.length > 0 ? dealerHand.join(', ') : ''}</Text>
        <Text style={styles.dealerScoreText}>Dealer's Score: {dealerScore}</Text>
        <View style={styles.buttonContainer}>
          <Button title="Stand" onPress={() => {
            handleStand(dealerHand);
            setShowDealerCard(true);
          }} />
          <Button title="New Game" onPress={() => resetGame()} />
        </View>
        <View style={styles.cardContainer}>
          {dealerHand && dealerHand.map((card, index) => (
            <Image key={index} source={index === 1 && !showDealerCard ? cardImages['back'] : cardImages[card]} style={styles.cardImage} />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  playerContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  playerHandText: {
    fontSize: 16,
    marginBottom: 10,
  },
  playerScoreText: {
    fontSize: 16,
    marginBottom: 10,
  },
  playerBankText: {
    fontSize: 16,
    marginBottom: 10,
  },
  dealerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  dealerHandText: {
    fontSize: 16,
    marginBottom: 10,
  },
  dealerScoreText: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  cardContainer: {
    flexDirection: 'row',
  },
  cardImage: {
    width: 100,
    height: 150,
    margin: 5,
  },
  slider: {
    width: 300,
  },
  thumb: {
    width: 10,
    height: 20,
    borderRadius: 5 / 2,
    backgroundColor: 'black',
  },
};

export default BlackjackApp;

