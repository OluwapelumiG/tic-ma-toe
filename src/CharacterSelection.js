import React, { useState } from 'react';
import { Alert, View, Text, TextInput, Button, Switch, StyleSheet } from 'react-native';

const CharacterSelection = ({ onStartGame }) => {
    const [player1, setPlayer1] = useState('');
    const [player2, setPlayer2] = useState('');
    const [step, setStep] = useState(1); // Step 1 for player 1, Step 2 for player 2
    const [playWithComputer, setPlayWithComputer] = useState(false);

    const handleNext = () => {
        if (player1 && player1.length === 1) {
            setStep(2);
        } else {
            Alert.alert('Error', 'Player 1 must enter a single character.');
        }
    };

    const handleStart = () => {
        if (playWithComputer) {
            onStartGame(player1, 'Computer');
        } else if (player2 && player2.length === 1 && player1 !== player2) {
            onStartGame(player1, player2);
        } else {
            Alert.alert('Error', 'Player 2 must enter a different single character.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Enter your character</Text>
            {step === 1 ? (
                <>
                    <Text style={styles.label}>Player 1 Character</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Player 1 Character"
                        value={player1}
                        onChangeText={setPlayer1}
                        maxLength={1} // Ensure only one character is entered
                    />
                    <Button title="Next" onPress={handleNext} />
                </>
            ) : (
                <>
                    <View style={styles.switchContainer}>
                        <Text style={styles.label}>Play with Computer</Text>
                        <Switch
                            value={playWithComputer}
                            onValueChange={setPlayWithComputer}
                        />
                    </View>
                    {!playWithComputer && (
                        <>
                            <Text style={styles.label}>Player 2 Character</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Player 2 Character"
                                value={player2}
                                onChangeText={setPlayer2}
                                maxLength={1} // Ensure only one character is entered
                            />
                        </>
                    )}
                    <Button title="Start Game" onPress={handleStart} />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        width: 200,
        height: 40,
        borderColor: '#000',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
        textAlign: 'center',
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
});

export default CharacterSelection;
