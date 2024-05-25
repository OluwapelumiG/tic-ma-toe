import React, { useState, useEffect } from 'react';
import { View, Text, Alert, TouchableOpacity, StyleSheet, Button } from 'react-native';

const Game = ({ players, onBackToSelection }) => {
    const { player1, player2 } = players;
    const initialBoard = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ];

    const [board, setBoard] = useState(initialBoard);
    const [player, setPlayer] = useState(player1);
    const [winner, setWinner] = useState('');

    useEffect(() => {
        if (player === 'Computer' && !winner) {
            handleComputerMove();
        }
    }, [player]);

    useEffect(() => {
        checkWinner();
    }, [board]);

    const handlePress = (rowIndex, cellIndex) => {
        if (board[rowIndex][cellIndex] === '' && !winner) {
            const newBoard = [...board];
            newBoard[rowIndex][cellIndex] = player;
            setBoard(newBoard);
            setPlayer(player === player1 ? player2 : player1);
        }
    };

    const handleComputerMove = () => {
        // Simple AI for computer move: select first available cell
        const emptyCells = [];
        board.forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex) => {
                if (cell === '') {
                    emptyCells.push({ rowIndex, cellIndex });
                }
            });
        });

        if (emptyCells.length > 0) {
            const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            handlePress(randomCell.rowIndex, randomCell.cellIndex);
        }
    };

    const checkWinner = () => {
        // rows
        for (let i = 0; i < 3; i++) {
            if (
                board[i][0] !== '' &&
                board[i][0] === board[i][1] &&
                board[i][0] === board[i][2]
            ) {
                setWinner(board[i][0]);
                break;
            }
        }

        // cols
        for (let i = 0; i < 3; i++) {
            if (
                board[0][i] !== '' &&
                board[0][i] === board[1][i] &&
                board[0][i] === board[2][i]
            ) {
                setWinner(board[0][i]);
                break;
            }
        }

        // diagonals
        if (
            board[0][0] !== '' &&
            board[0][0] === board[1][1] &&
            board[0][0] === board[2][2]
        ) {
            setWinner(board[0][0]);
        } else if (
            board[0][2] !== '' &&
            board[0][2] === board[1][1] &&
            board[0][2] === board[2][0]
        ) {
            setWinner(board[0][2]);
        }
    };

    const resetBoard = () => {
        setBoard(initialBoard);
        setPlayer(player1);
        setWinner('');
    };

    useEffect(() => {
        if (winner) {
            Alert.alert(`Player ${winner} won!!`, '', [{ text: 'OK', onPress: resetBoard }]);
        }
    }, [winner]);

    useEffect(() => {
        if (!winner) {
            const isBoardFull = board.every((row) => row.every((cell) => cell !== ''));
            if (isBoardFull) {
                Alert.alert(`It's a tie!!`, '', [{ text: 'OK', onPress: resetBoard }]);
            }
        }
    }, [board]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>TicTacToe by {player1} and {player2}</Text>
            <Text>Now playing: {player}</Text>
            <Board board={board} onPress={handlePress} />
            <TouchableOpacity style={styles.resetButton} onPress={resetBoard}>
                <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
            <Button title="Back to Selection" onPress={onBackToSelection} />
        </View>
    );
};

const Board = ({ board, onPress }) => (
    <View style={styles.board}>
        {board.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
                {row.map((cell, cellIndex) => (
                    <TouchableOpacity
                        key={cellIndex}
                        style={styles.cell}
                        onPress={() => onPress(rowIndex, cellIndex)}
                    >
                        <Text style={styles.cellText}>{cell}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        ))}
    </View>
);

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
    board: {
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
    },
    cell: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000',
    },
    cellText: {
        fontSize: 24,
    },
    resetButton: {
        padding: 10,
        backgroundColor: '#3498db',
        borderRadius: 5,
    },
    resetButtonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default Game;
