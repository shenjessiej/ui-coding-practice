/**
 * How can you build a tic tac toe game that accommodates two players,
 *  ensures input correctness, and identifies game completion, 
 * using a two-dimensional array for spatial orientation?
 */



import { useState } from "react";

function TicTacToe({ n }) {

    const [grid, setGrid] = useState(new Array(n).fill().map(() => new Array(n).fill(" ")));
    const [player, setPlayer] = useState('X');
    const [winner, setWinner] = useState(null);

function checkWin(r, c, currentGrid) {
    const symbol = currentGrid[r][c];

    const winRow = currentGrid[r].every(cell => cell === symbol);
    const winCol = currentGrid.every(row => row[c] === symbol);
    const winDiag1 = r === c && currentGrid.every((row, idx) => row[idx] === symbol);
    const winDiag2 = r + c === n - 1 && currentGrid.every((row, idx) => row[n - 1 - idx] === symbol);

    if (winRow || winCol || winDiag1 || winDiag2) {
        setWinner(symbol);
    } else if (currentGrid.flat().every(cell => cell !== ' ')) {
        setWinner("Draw");
    }
}

    function handleClick(i, j) {
        if (winner || grid[i][j] !== ' ') return;
        const newGrid = grid.map((row, rowIndex) =>
            row.map((cell, colIndex) =>
                rowIndex === i && colIndex === j ? player : cell
            )
        );
        setGrid(newGrid);
        checkWin(i,j,newGrid);

        setPlayer(player === 'X' ? 'O' : 'X');

    };

    function resetGame() {
        setGrid(new Array(n).fill().map(() => new Array(n).fill(" ")));
        setPlayer('X');
        setWinner(null);
    };

    return (

        <div>
            {winner ? `Winner: ${winner}` : `Player ${player} turn`}
            <div>
                {winner ? (<button onClick={() => resetGame()}>Play Again</button>) : ''}
            </div>
            {grid && 
            (
            <table style={{borderCollapse: 'collapse'}}>
                <tbody>
                {grid.map((row, i) => {
                    return (<tr key={i}>
                        {row.map((cell, j) => {
                            return (
                                <td style={{
                                    border: '1px solid black', 
                                    height: '50px', 
                                    width: '50px',
                                    fontSize: '24px',
                                    textAlign: 'center',
                                    cursor: winner ? 'default' : 'pointer'
                                }} 
                                onClick={!winner ? () => handleClick(i, j) : undefined}
                                key={`${i}-${j}`}>{cell}</td>
                            )
                        })}
                    </tr>)
                })}
                </tbody>
            </table>
            )
            
            }

        </div>
    )

}
function App() {
    return <TicTacToe n={3} />
}

export default App;
