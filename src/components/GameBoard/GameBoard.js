import React from "react";
import PropTypes from "prop-types";

import BoardCell from "./BoardCell/BoardCell";
import Spinner from "../Spinner/Spinner";

import classes from "./GameBoard.module.css";

const GameBoard = ({
  isGameStarted,
  isGameSetupLoading,
  gameSetup,
  cellClicked,
  isGameSetupFetchFailed
}) => {
  let gameBoardContent = null;

  if (!isGameStarted && !isGameSetupLoading) {
    gameBoardContent = <p>Please add new player name to start the game...</p>;
  } else if (isGameSetupLoading) {
    gameBoardContent = <Spinner />;
  } else if (isGameSetupFetchFailed) {
    gameBoardContent = (
      <p>Something went wrong. Please refresh the page and try again</p>
    );
  } else {
    gameBoardContent = gameSetup.map((cell, index) => (
      <BoardCell
        cellInfo={cell}
        key={cell.id}
        cellClicked={() => cellClicked(cell, index)}
      />
    ));
  }

  let gameBoardClasses = [classes.GameBoard];

  if (!isGameStarted || isGameSetupLoading || isGameSetupFetchFailed) {
    gameBoardClasses = [classes.GameBoard, classes.GameBoardFullBorder];
  }

  return <div className={gameBoardClasses.join(" ")}>{gameBoardContent}</div>;
};

GameBoard.propTypes = {
  isGameStarted: PropTypes.bool,
  isGameSetupLoading: PropTypes.bool,
  gameSetup: PropTypes.array,
  cellClicked: PropTypes.func
};

export default GameBoard;
