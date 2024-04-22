import React, { useState } from 'react';
import { Text, View, Button, Image, StyleSheet } from 'react-native';
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
  const [playerBank, setPlayerBank] = useState(1000);
  const [dealerHand, setDealerHand] = useState([]);
  const [dealerScore, setDealerScore] = useState(0);
  const [showDealerCard, setShowDealerCard] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [doubleClicked, setDoubleClicked] = useState(false);
  const [drawCards, setDrawCards] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

let shuffledDeck = shuffleDeck([...deck]);

const dealCard = () => {
  if (shuffledDeck.length < 5) {
    shuffledDeck = shuffleDeck([...deck]);
  }
  return shuffledDeck.pop();
};

const dealInitialCards = () => {
  const playerNewHand = [dealCard(), dealCard()];
  const dealerNewHand = [dealCard(), dealCard()];
  setPlayerHand(playerNewHand);
  setDealerHand(dealerNewHand);
  setDealerScore(calculateScore(dealerNewHand));
  setPlayerScore(calculateScore(playerNewHand));
};

React.useEffect(() => {
  dealInitialCards();
  setSliderValue(50);
}
, []);

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
  if (isGameOver) return;
  setIsGameOver(true);
  setShowDealerCard(true);
  // Implement the logic to determine the winner
  let winner = "";
  if (playerScore > 21) {
    // Player busts, dealer wins
    setPlayerBank(playerBank - sliderValue);
    winner = "Dealer";
  } else if (dealerScore > 21) {
    // Dealer busts, player wins
    setPlayerBank(playerBank + sliderValue);
    winner = "Player";
  } else if (playerScore === dealerScore) {
    // It's a tie
    winner = "Tie";  
  } else if (playerScore === 21){
    // Player blackjack, Player wins
    setPlayerBank(playerBank + (sliderValue * 1.5));
    winner = "Player"; 
  } else if (dealerScore === 21) {
    setPlayerBank(playerBank - sliderValue);
    // Dealer blackjack, Dealer wins
    winner = "Dealer";
  } else if (playerScore > dealerScore) {
    // Player wins
    setPlayerBank(playerBank + sliderValue);
    winner = "Player";
  } else if (dealerScore > playerScore) {
    // Dealer wins
    setPlayerBank(playerBank - sliderValue);
    winner = "Dealer";
  } else {
    // No winner
    winner = "No one";
  }
  alert(`The winner is: ${winner}`);
  softReset();
};

const handleDoubleClick = () => {
  setDoubleClicked(true);
  setDrawCards(true);
  setSliderValue(sliderValue * 2);
  setShowDealerCard(true);
};

const handleHit = (currentHand) => {
  const newHand = [...currentHand, dealCard()];
  return newHand;
};

const handleDouble = (currentHand) => {
  const newHand = [...currentHand, dealCard()];
  return newHand;
};

// const handleSplit = (currentHand) => {
//   const newHand = [currentHand.pop()];
//   return [currentHand, { hand: newHand, score: calculateScore(newHand) }];
// };

React.useEffect(() => {
  if (drawCards) {
    const intervalId = setInterval(() => {
      if (dealerScore < 17) {
        const newDealerHand = handleHit(dealerHand);
        setDealerHand(newDealerHand);
        setDealerScore(calculateScore(newDealerHand, true));
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }
}, [drawCards, dealerScore]);


React.useEffect(() => {
  if (dealerScore >= 17 && drawCards) {
    const timerId = setTimeout(() => {
      determineWinner();
    }, 1000);
    return () => clearTimeout(timerId);
  }
}, [dealerScore, showDealerCard]);

React.useEffect(() => {
  if (playerScore > 21) {
    const timerId = setTimeout(() => {
      determineWinner();
    }, 1000);
    return () => clearTimeout(timerId);
  }
}, [playerScore]);

React.useEffect(() => {
  if (dealerScore > playerScore && dealerScore <= 17 && drawCards) {
    const timerId = setTimeout(() => {
      determineWinner();
    }, 1000);
    return () => clearTimeout(timerId);
  }
}, [dealerScore]);

const onSliderValueChange = (value) => {
  setSliderValue(value);
};

const resetGame = () => {
  setIsGameOver(false);
  setPlayerBank(1000);
  setShowDealerCard(false);
  setDealerScore(0);
  setPlayerScore(0);
  dealInitialCards();
  setDoubleClicked(false);
  setSliderValue(50);
  shuffleDeck([...deck]);
  setDrawCards(false);
};

const softReset = () => {
  setIsGameOver(false);
  setShowDealerCard(false);
  setDealerScore(0);
  setPlayerScore(0);
  dealInitialCards();
  setDoubleClicked(false);
  setSliderValue(50);
  setDrawCards(false);
};

const ThumbLabel = ({ value }) => (
  <View style={{ alignItems: 'center', marginTop: 20, userSelect: 'none' }}>
    <Text style={{ color: '#FFC107', fontWeight: 'bold', userSelect: 'none' }}>
      {value.toFixed(0)} {/* .toFixed(0) to ensure it's rounded to an integer */}
    </Text>
  </View>
);

return (
  <View style={styles.container}>
    <Text style={styles.title}>Blackjack</Text>
    <View style={styles.playerContainer}>
      <View style={styles.containerText}>
        <Text style={styles.playerHandText}>Player's Hand: {playerHand && playerHand.length > 0 ? playerHand.join(', ') : ''}</Text>
        <Text style={styles.playerScoreText}>Player's Score: {playerScore}</Text>
        <Text style={styles.playerBankText}>Player's Bank: {playerBank}</Text>
        {/*<Text style={styles.sliderValueText}>Value: {sliderValue}</Text>*/}
        <Slider
          style={styles.slider}
          minimumValue={50}
          maximumValue={playerBank}
          step={50}
          value={sliderValue}
          onValueChange={onSliderValueChange}
          thumbTintColor='#FFC107' // Golden yellow thumb
          minimumTrackTintColor='#FFC107' // Golden yellow track
          maximumTrackTintColor='#4C4C4C' // Dark track for contrast
          allowTouchTrack={true}
          animateTransitions={true}
          thumbStyle={{ height: 20, width: 20 }}
          thumbProps={{
            children: <ThumbLabel value={sliderValue} />,
          }}
        />
      </View>
      <View style={styles.containerButtons}>
        <View style={styles.buttonContainer}>
          <Button title="Hit" color={"#000"} backgroundColor={"#FFC107"} style={styles.button} onPress={() => {
            const newPlayerHand = handleHit(playerHand);
            setPlayerHand(newPlayerHand);
            setPlayerScore(calculateScore(newPlayerHand));
          }
          } />
          <Button title="Double" color={"#000"} backgroundColor={"#FFC107"} disabled={doubleClicked} style={styles.button} onPress={() => 
            {
              const newPlayerHand = handleDouble(playerHand);
              setPlayerHand(newPlayerHand);
              setPlayerScore(calculateScore(newPlayerHand));
              handleDoubleClick();
            }
          }/>
          {/* <Button title="Split" color={"#000"} backgroundColor={"#FFC107"} style={styles.button} onPress={() => setPlayerHand(handleSplit(playerHand))} /> */}
        </View>
      </View>
      <View style={styles.cardContainer}>
        {playerHand && playerHand.map((card, index) => (
          <Image key={index} source={cardImages[card]} style={styles.cardImage} />
        ))}
      </View>
    </View>
    <View style={styles.dealerContainer}>
      <View style={styles.containerText}>
        <Text style={styles.dealerHandText}>Dealer's Hand: {showDealerCard ? (dealerHand && dealerHand.length > 0 ? dealerHand.join(', ') : '') : "??"}</Text>
        <Text style={styles.dealerScoreText}> Dealer's Score: {showDealerCard ? dealerScore : "??"} </Text>
      </View>
      <View style={styles.containerButtons}>
        <View style={styles.buttonContainer}>
          <Button title="Stand" color={"#000"} backgroundColor={"#FFC107"} style={styles.button} onPress={() => {
            setShowDealerCard(true);
            setDrawCards(true);
          }} />
          <Button title="New Game" color={"#000"} backgroundColor={"#FFC107"} style={styles.button} onPress={() => resetGame()} />
        </View>
        <View style={styles.cardContainer}>
          {dealerHand && dealerHand.map((card, index) => (
            <Image key={index} source={index === 1 && !showDealerCard ? cardImages['back'] : cardImages[card]} style={styles.cardImage} />
          ))}
        </View>
      </View>
    </View>
  </View>
);
};

// Updated styles block with modifications for button CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a', // A deep black for the dark theme
    padding: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#FFC107', // McDonald's golden yellow for accent
    marginTop: 20,
    marginBottom: 25,
    textAlign: 'center',
    fontFamily: 'Helvetica, Arial, sans-serif',
  },
  playerContainer: {
    backgroundColor: '#242424', // Slightly lighter dark shade for contrast
    padding: 20,
    borderRadius: 15,
    marginVertical: 15,
    shadowColor: '#FFC107', // Golden yellow shadow for some pop
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  containerText: {
    backgroundColor: '#242424', // Slightly lighter dark shade for contrast
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    userSelect: 'none',
  },
  containerButtons: {
    backgroundColor: '#242424', // Slightly lighter dark shade for contrast
    padding: 20,
  },
  playerHandText: {
    fontSize: 18,
    color: '#FFC107', // Maintaining the golden yellow for text
    marginBottom: 15,
  },
  playerScoreText: {
    fontSize: 18,
    color: '#FFC107',
    marginBottom: 15,
  },
  playerBankText: {
    fontSize: 18,
    color: '#FFC107',
    marginBottom: 15,
  },
  sliderValueText: {
    fontSize: 18,
    color: '#FFC107',
    marginBottom: 15,
  },
  dealerContainer: {
    backgroundColor: '#242424',
    padding: 20,
    borderRadius: 15,
    marginVertical: 15,
    shadowColor: '#FFC107',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  dealerHandText: {
    fontSize: 18,
    color: '#FFC107',
    marginBottom: 15,
  },
  dealerScoreText: {
    fontSize: 18,
    color: '#FFC107',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Adjusted for even spacing across the container
    marginBottom: 15,
  },
  button: {
    flex: 1, // Allows the button to expand and fill available space
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5, // Add horizontal margin for spacing between buttons
    elevation: 2,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cardImage: {
    width: 100,
    height: 150,
    marginHorizontal: 5,
  },
  slider: {
    width: '85%',
  },
});

export default BlackjackApp;
