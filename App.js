import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import CharacterSelection from './src/CharacterSelection';
import Game from './src/Game';

export default function App() {
  const [players, setPlayers] = useState({ player1: '', player2: '' });
  const [charactersSet, setCharactersSet] = useState(false);

  const handleStartGame = (player1, player2) => {
    setPlayers({ player1, player2 });
    setCharactersSet(true);
  };

  const handleBackToSelection = () => {
    setCharactersSet(false);
  };

  return (
      <LinearGradient colors={['#3498db', '#ffffff']} style={styles.container}>
        <View style={styles.overlay}>
          {!charactersSet ? (
              <CharacterSelection onStartGame={handleStartGame} />
          ) : (
              <Game players={players} onBackToSelection={handleBackToSelection} />
          )}
          <StatusBar style="auto" />
        </View>
      </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
