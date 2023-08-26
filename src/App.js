// App.js
import * as React from 'react';
import { Box, Button, Text, ChakraProvider } from '@chakra-ui/react';
import { useState } from 'react';
import { calculateWinner, calculateNextValue, calculateStatus } from './gameHelpers';

function Square({ value, onClick }) {
  return (
    <Button
      className="square"
      onClick={onClick}
      size="60px"
      fontSize="28px"
      fontWeight="bold"
      border="12px solid #ddd"
      margin="-2px 0 0 -1px"
      padding="0"
      cursor="pointer"
      backgroundColor="white"
    >
      {value}
    </Button>
  );
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(squares);
  const nextValue = calculateNextValue(squares);
  const status = calculateStatus(winner, squares, nextValue);

  function selectSquare(square) {
    if (squares[square] || winner) {
      return;
    }
    const newSquares = [...squares];
    newSquares[square] = nextValue;
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  }

  function restart() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  function renderSquare(i) {
    return <Square value={squares[i]} onClick={() => selectSquare(i)} />;
  }

  return (
    <Box textAlign="center" pt={8}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        {status}
      </Text>
      <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </Box>
      <Button mt={10} colorScheme="blue" onClick={restart}>
        Restart
      </Button>
    </Box>
  );
}

function Game() {
  return (
    <div>
      <div>
        <Board />
      </div>
    </div>
  );
}

function App() {
  return (
    <ChakraProvider>
      <Game />
    </ChakraProvider>
  );
}

export default App;
