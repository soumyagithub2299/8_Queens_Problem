import React, { useState } from 'react'; 
import { Grid, Paper, Typography, Button } from '@mui/material'; 


function Chessboard() {

  // initialize the state with an array representing the queens positions
  const initialQueens = [-1, -1, -1, -1, -1, -1, -1, -1]; 
  // create an array with -1 values to represent the initial queen positions.

  const [queens, setQueens] = useState(initialQueens); 
  // initialize the 'queens' state variable using the 'useState' hook.



  const [showSolution, setShowSolution] = useState(false); 
  // initialize the 'showSolution' state variable using the 'useState' hook.



  // function to check if a queen can be placed safely in a given row and column
  const isSafe = (row, col) => { 
    for (let previousRow = 0; previousRow < row; previousRow++) { 

      const previousCol = queens[previousRow]; 

      // Get the column position of the queen in the previous row.
      if (
        previousCol === col || // check if there is a queen in the same column.
        previousRow + previousCol === row + col || // check if there is a queen on the diagonal (from top-left to bottom-right).
        previousRow - previousCol === row - col // check if there is a queen on the diagonal (from top-right to bottom-left).
      ) {
        return false; // if any of the conditions is met, return false (queen can't be placed here).
      }
    }
    return true; // if none of the conditions is met, return true (queen can be placed here safely).
  };




  // function to place a queen in the specified row and column
  const placeQueen = (row, col) => { 
    if (isSafe(row, col)) { // check if it's safe to place a queen at the given position using the 'isSafe' function.
      const newQueens = [...queens]; // create a copy of the 'queens' array.
      newQueens[row] = col; // place the queen in the specified row and column.
      setQueens(newQueens); // update the 'queens' state with the new array.
    }
  };




  // function to check if all queens are placed correctly
  const checkSolution = () => {
    for (let row = 0; row < 8; row++) { 
      if (queens[row] === -1) {
        
        // check if a queen is not placed in the current row (represented by -1).
        alert('all Queens are not placed in all rows correctly 😐 !');
        return; 
      }
    }
    // check if the queens are placed correctly
    if (!isQueensPlacedCorrectly()) {
      alert('all Queens are not placed correctly 😐 !');
      return;
    }
    alert('all Queens are placed correctly 😃 !'); 
  };



  // function to check if all queens are placed correctly on the board
  const isQueensPlacedCorrectly = () => { // define a function 'isQueensPlacedCorrectly'.
    for (let row = 0; row < 7; row++) { // Loop through rows except the last one.
      for (let nextRow = row + 1; nextRow < 8; nextRow++) { // Loop through rows below the current row.
        if (
          queens[row] === queens[nextRow] || // check if two queens are in the same column.
          queens[row] + row === queens[nextRow] + nextRow || // check if two queens are on the same diagonal.
          queens[row] - row === queens[nextRow] - nextRow // check if two queens are on the same diagonal.
        ) 
        {
          return false; // if any of the conditions is met, return false (queens are not placed correctly).
        }
      }
    }
    return true; // if none of the conditions is met, return true (queens are placed correctly).
  };




  // function to display the correct solution
  const showCorrectSolution = () => { 
    setShowSolution(true); 
  };



  // function to reset the board and clear the correct solution display
  const resetQueens = () => { 
    setQueens(initialQueens); 
    setShowSolution(false);
  };



  // define the correct placement of queens (replace with the correct solution)
  const correctQueensPlacement = [0, 4, 7, 5, 2, 6, 1, 3]; 
  // Replace with the correct solution (queen positions).




  return (

    <div>


      <Button  variant="contained"  color="primary"    style={{ margin: '12px' }}   onClick={checkSolution} > check </Button>
      <Button  variant="contained"  color="secondary"  style={{ margin: '12px' }}   onClick={resetQueens} > Reset </Button>
      <Button  variant="contained"  style={{ margin: '12px' }}   onClick={showCorrectSolution} > Show Correct Solution </Button>


      <div style={{ margin: '25px' }}> 
        <Grid container spacing={0}>

          {Array.from({ length: 8 }, (_, row) => ( // Loop to create rows.
            <Grid container item key={row} justifyContent="center"> 

              {Array.from({ length: 8 }, (_, col) => ( // Loop to create columns within each row.
                <Grid item key={col}>

                  <Paper
                    elevation={3}
                    style={{
                      width: '50px',
                      height: '50px',
                      backgroundColor: showSolution
                        ? correctQueensPlacement[row] === col
                          ? 'lightgreen'
                          : 'white'
                        : queens[row] === col
                        ? 'yellow'
                        : 'white',
                    }}
                    onClick={() => placeQueen(row, col)}
                  >
                    {(showSolution && correctQueensPlacement[row] === col) ||
                    (!showSolution && queens[row] === col) ? (
<Typography
  variant="h6"
  style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    fontFamily:'bold',
  }}
>
  Q♛
</Typography>
                    ) : null}
                  </Paper>


                </Grid>
              ))}
            </Grid>
          ))}
        </Grid>
      </div>


    </div>
  );
}

export default Chessboard;
