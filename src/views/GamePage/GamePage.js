import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import GameBoard from "../../components/GameBoard/GameBoard";
import PageHeader from "../../components/PageHeader/PageHeader";
import TurnControl from "../../components/TurnControl/TurnControl";
import AddPlayer from "../../components/AddPlayer/AddPlayer";
import LeaderBoard from "../../components/LeaderBoard/LeaderBoard";

import * as actions from "../../store/actions/index";

import classes from "./GamePage.module.css";

export const GamePage = ({
  gameName,
  playerName,
  isGameStarted,
  currentTurn,
  movesLeft,
  isGameSetupLoading,
  gameSetup,
  isGameSetupFetchFailed,
  treasuresLeft,
  isGameFinished,
  scores,
  onPlayerNameChange,
  onGameStart,
  onCellClick,
  onTreasureClick,
  onRevealCells,
  onEndGame,
  onRestartGame
}) => {
  const nameChanged = newPlayerName => {
    onPlayerNameChange(newPlayerName);
  };

  const gameStarted = () => {
    onGameStart();
  };

  const cellClicked = (cell, index) => {
    if (cell.proximity === "T" && treasuresLeft === 1) {
      onEndGame();
      return;
    }

    if (cell.proximity === "T") {
      onTreasureClick();
    }

    if (movesLeft === 1) {
      onRevealCells(cell, index);
    } else {
      onCellClick(cell, index);
    }
  };

  let gamePageContent = null;

  if (isGameFinished) {
    gamePageContent = (
      <>
        <h3 className={classes.GamePageFinishTitle}>
          Congratulations {playerName}!! You have won in {currentTurn} turns.
        </h3>
        <button type="button" onClick={() => onRestartGame()}>
          Restart Game
        </button>
        <LeaderBoard scores={scores} />
      </>
    );
  } else {
    gamePageContent = (
      <>
        <PageHeader headerText={gameName} />
        <AddPlayer
          isGameStarted={isGameStarted}
          playerName={playerName}
          gameStarted={gameStarted}
          nameChanged={newPlayer => nameChanged(newPlayer)}
        />
        <TurnControl
          isGameStarted={isGameStarted}
          currentTurn={currentTurn}
          movesLeft={movesLeft}
        />
        <GameBoard
          isGameStarted={isGameStarted}
          isGameSetupLoading={isGameSetupLoading}
          isGameSetupFetchFailed={isGameSetupFetchFailed}
          gameSetup={gameSetup}
          cellClicked={cellClicked}
        />
      </>
    );
  }

  return gamePageContent;
};

const mapStateToProps = state => ({
  gameName: state.game.gameName,
  playerName: state.game.playerName,
  isGameStarted: state.game.isGameStarted,
  currentTurn: state.game.currentTurn,
  movesLeft: state.game.movesLeft,
  isGameSetupLoading: state.game.isGameSetupLoading,
  gameSetup: state.game.gameSetup,
  isGameSetupFetchFailed: state.game.isGameSetupFetchFailed,
  treasuresLeft: state.game.treasuresLeft,
  isGameFinished: state.game.isGameFinished,
  scores: state.game.scores
});

const mapDispatchToProps = dispatch => {
  return {
    onPlayerNameChange: playerName =>
      dispatch(actions.gameChangePlayerName(playerName)),
    onGameStart: () => dispatch(actions.gameStart()),
    onCellClick: (cell, cellIndex) =>
      dispatch(actions.gameCellSelected(cell, cellIndex)),
    onTreasureClick: () => dispatch(actions.gameTreasureClicked()),
    onEndGame: () => dispatch(actions.gameEnd()),
    onRevealCells: (cell, cellIndex) =>
      dispatch(actions.gameRevealCells(cell, cellIndex)),
    onRestartGame: () => dispatch(actions.gameRestart())
  };
};

GamePage.propTypes = {
  gameName: PropTypes.string,
  playerName: PropTypes.string,
  isGameStarted: PropTypes.bool,
  currentTurn: PropTypes.number,
  movesLeft: PropTypes.number,
  gameSetup: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      proximity: PropTypes.string
    })
  ),
  isGameSetupFetchFailed: PropTypes.bool,
  isGameFinished: PropTypes.bool,
  scores: PropTypes.arrayOf(
    PropTypes.shape({
      playerName: PropTypes.string,
      score: PropTypes.number
    })
  ),
  onPlayerNameChange: PropTypes.func,
  onGameStart: PropTypes.func,
  onGameFetchInitialSetup: PropTypes.func,
  onCellClick: PropTypes.func,
  onTreasureClick: PropTypes.func,
  onRevealCells: PropTypes.func,
  onEndGame: PropTypes.func,
  onRestartGame: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
