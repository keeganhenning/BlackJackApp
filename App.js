import React, { useState } from 'react';
import { Text, View, Button, Image } from 'react-native';
import { player, handleHit, handleDouble, handleSplit } from './components/Player';
import { dealer, handleStand } from './components/Dealer';
import { dealInitialCards, resetGame } from './components/Game';
import { calculateScore } from './components/Card';

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
};

function BlackjackApp() {
  const [playerHand, setPlayerHand] = useState(player.hand || []);
  const [playerScore] = useState(player.score);
  const [dealerHand, setDealerHand] = useState(dealer.hand || []);
  const [dealerScore] = useState(dealer.score);
  // Call dealInitialCards when the component mounts
  React.useEffect(() => {
    dealInitialCards();
    setPlayerHand(player.hand || []);
    setDealerHand(dealer.hand || []);
    calculateScore(player.hand);
    calculateScore(dealer.hand);
  }, []);

  return (
    <View>
      <Text>Blackjack</Text>
      <View>
        <Text>Player's Hand: {playerHand.join(', ')}</Text>
        <Text style={{ position: 'absolute', top: 10, left: 10 }}>Player's Score: {playerScore}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Button title="Hit" onPress={() => setPlayerHand(handleHit(playerHand))} />
          <Button title="Double" onPress={() => setPlayerHand(handleDouble(playerHand))} />
          <Button title="Split" onPress={() => setPlayerHand(handleSplit(playerHand))} />
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
          {playerHand.map((card, index) => (
            <Image key={index} source={cardImages[card]} style={{ width: 50, height: 80, margin: 5 }} />
          ))}
        </View>
      </View>
      <View>
        <Text>Dealer's Hand: {dealerHand.join(', ')}</Text>
        <Text style={{ position: 'absolute', top: 10, right: 10 }}>Dealer's Score: {dealerScore}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Button title="Stand" onPress={() => setDealerHand(handleStand(dealerHand))} />
          <Button title="New Game" onPress={() => setDealerHand(resetGame)} />
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
          {dealerHand.map((card, index) => (
            <Image key={index} source={cardImages[card]} style={{ width: 50, height: 80, margin: 5 }} />
          ))}
        </View>
      </View>
    </View>
  );
}

export default BlackjackApp;
