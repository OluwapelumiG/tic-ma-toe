export const checkWinner = (board, setWinner) => {
    // rows
    for (let i = 0; i < 3; i++) {
        if (
            board[i][0] !== '' &&
            board[i][0] === board[i][1] &&
            board[i][0] === board[i][2]
        ) {
            setWinner(board[i][0]);
            return;
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
            return;
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
