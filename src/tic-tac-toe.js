import React, { useState, useEffect, useReducer } from 'react'

function Restart(props) {
    return (
        <button className="restart" onClick={() => props.setSquares(Array(9).fill(null))}>
            restart
        </button>
    );
}   

function Square(props) {
    const selectSquare = (square) => {
        const { squares } = props;
        const nextValue = calculateNextValue(squares)
        if (calculateWinner(squares) || squares[square]) {
            return;
        }
        const squaresCopy = [...squares];
        squaresCopy[square] = nextValue;
        props.setSquares(squaresCopy);
    };

    return (
        <button className="square" onClick={() => selectSquare(props.index)}>
            {props.value}
        </button>
    );
}

function Row(props) {
    const squareComponents = props.rowSquares.map(sq => <Square key={sq.index} index={sq.index} value={sq.value} squares={props.squares} setSquares={props.setSquares} />);
    return (
        <div className="board-row">
            {squareComponents}
        </div>
    );
}

function Board() {
    const [squares, setSquares] = useState(JSON.parse(window.localStorage.getItem('squares')) || Array(9).fill(null));
    useEffect(() => {
        window.localStorage.setItem('squares', JSON.stringify(squares))
    }, squares);

    const nextValue = calculateNextValue(squares);
    const winner = calculateWinner(squares);
    let status = calculateStatus(winner, squares, nextValue);

    const rows = [0, 3, 6].map((val, index) => {
        const rowSquares = squares.slice(val, val + 3).map((el, index) => ({ index: index + val, value: el }));
        return (<Row key={index} rowSquares={rowSquares} squares={squares} setSquares={setSquares} />);
    });

    return (
        <div>
            <div className="status">{status}</div>
            {rows}
            <Restart setSquares={setSquares} />
        </div>
    );
}

function Game() {
    return (
        <div className="game">
            <div className="game-board">
                <Board />
            </div>
        </div>
    );
}

function calculateStatus(winner, squares, nextValue) {
    return winner
        ? `Winner: ${winner}`
        : squares.every(Boolean)
            ? `Scratch: Cat's game`
            : `Next player: ${nextValue}`
}

function calculateNextValue(squares) {
    return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

function App() {
    return <Game />;
}

export default App;
