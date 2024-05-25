import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Board = ({ board, onPress }) => {
    return (
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
};

const styles = StyleSheet.create({
    board: {
        borderWidth: 1,
        borderColor: '#000',
    },
    row: {
        flexDirection: 'row',
    },
    cell: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000',
    },
    cellText: {
        fontSize: 24,
    },
});

export default Board;
