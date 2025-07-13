/**
 * Onsite: Make a card matching game from scratch. 
 * Create a game where you need to click on a card to reval its type, 
 * then click on another card to reveal its type. 
 * If 2 types match you have. a match if not the cards flip over.
 */



import { useState } from "react";

function randomizeCard(n) {
    let int = Math.round(Math.random() * n);
    return int;
}


function Board({ n }) {
    const [grid, setGrid] = useState(new Array(n).fill().map(() => new Array(n).fill().map(() => {
        return { hidden: true, value: randomizeCard(n) };
    })));

    const [revealed, setRevealed] = useState([]);
    const [points, setPoints] = useState([0, 0]);
    const [currPlayer, setCurrPlayer] = useState(0);

    // card grid of size n by n
    // randomize card list
    // each card has a status: hidden, revealed
    // players have points
    // game over

    // when all cards revealed game over

    // current player
    // card grid 

    function handleClick(x, y) {

        if (!grid[x][y].hidden) return;

        const newGrid = structuredClone(grid);
        let newRevealed = structuredClone(revealed);

        newGrid[x][y].hidden = false;

        if (revealed.length === 1) {
            let row = newRevealed[0].loc[0];
            let col = newRevealed[0].loc[1];

            if (newRevealed[0].value === newGrid[x][y].value) {
                newGrid[row][col].hidden = false;

                const newPoints = points;
                newPoints[currPlayer]++;
                setPoints(newPoints);    
            } else {
                newGrid[x][y].hidden = true;
                newGrid[row][col].hidden = true;

            }
            newRevealed = [];
            setCurrPlayer(currPlayer ? 0 : 1);


        } else {
            newRevealed.push({
                loc: [x, y],
                value: newGrid[x][y].value
            });
        }

        setGrid(newGrid);
        setRevealed(newRevealed);

    }

    return (
        <div>
            <div>Player 1: {points[0]}</div>
            <div>Player 2: {points[1]}</div>
            <div>Current player: {currPlayer+1}</div>

            <table>
                <tbody>
                    {grid.map((row, x) => {
                        return (<tr>{row.map((cell, y) => {
                            return (<td onClick={() => handleClick(x, y)}>{cell.hidden ? 'X' : cell.value}</td>);
                        })}</tr>)
                    })}
                </tbody>
            </table>
        </div>
    )

}
function App() {
    return <Board n={7} />
}

export default App;
