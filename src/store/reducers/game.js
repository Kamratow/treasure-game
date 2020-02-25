import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../helpers/utilities";

const initialState = {
  gameName: "Treasure Hunt",
  isGameSetupLoading: false,
  isGameSetupFetchFailed: false,
  isGameStarted: false,
  playerName: "",
  currentTurn: 0,
  movesLeft: 3,
  treasuresLeft: 3,
  gameSetup: null,
  isGameFinished: false,
  currentlySelectedCells: [],
  scores: []
};

const gameFetchInitalSetupStart = (state, action) => {
  return updateObject(state, {
    isGameSetupLoading: true,
    isGameSetupFetchFailed: false
  });
};

const gameFetchInitalSetupSuccess = (state, action) => {
  return updateObject(state, {
    isGameSetupLoading: false,
    gameSetup: action.gameSetup,
    isGameStarted: true,
    currentTurn: 1
  });
};

const gameFetchInitalSetupFail = (state, action) => {
  return updateObject(state, {
    isGameSetupLoading: false,
    isGameSetupFetchFailed: true
  });
};

const gameChangePlayerName = (state, action) => {
  return updateObject(state, {
    playerName: action.playerName
  });
};

const gameRestart = (state, action) => {
  const updatedScores = [...state.scores];
  const updatedState = { ...initialState, scores: updatedScores };
  return updateObject(state, updatedState);
};

const gameCellSelected = (state, action) => {
  const updatedCell = { ...action.cell, isCellSelected: true };
  const updatedCurrentCellsSelected = [...state.currentlySelectedCells];
  updatedCurrentCellsSelected.push({
    ...action.cell,
    isCellSelected: true,
    isCellRevealed: true
  });
  const updatedGameSetup = [...state.gameSetup];
  updatedGameSetup[action.index] = { ...updatedCell };
  const updatedState = {
    gameSetup: updatedGameSetup,
    currentlySelectedCells: updatedCurrentCellsSelected,
    movesLeft: state.movesLeft - 1
  };
  return updateObject(state, updatedState);
};

const gameRevealCells = (state, action) => {
  const updatedCurrentCellsSelected = [...state.currentlySelectedCells];
  updatedCurrentCellsSelected.push({
    ...action.cell,
    isCellSelected: true,
    isCellRevealed: true
  });
  const updatedGameSetup = [...state.gameSetup];
  updatedCurrentCellsSelected.forEach(
    item => (updatedGameSetup[item.id].isCellRevealed = { ...item })
  );
  const updatedState = {
    gameSetup: updatedGameSetup,
    currentlySelectedCells: [],
    currentTurn: state.currentTurn + 1,
    movesLeft: 3
  };
  return updateObject(state, updatedState);
};

const gameTreasureClicked = (state, action) => {
  const newTreasuresLeft = state.treasuresLeft - 1;
  return updateObject(state, {
    treasuresLeft: newTreasuresLeft
  });
};

const gameEnd = (state, action) => {
  const updatedScores = [...state.scores];
  updatedScores.push({
    playerName: state.playerName,
    score: state.currentTurn
  });
  return updateObject(state, {
    isGameFinished: true,
    scores: updatedScores
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GAME_FETCH_INITIAL_SETUP_START:
      return gameFetchInitalSetupStart(state, action);
    case actionTypes.GAME_FETCH_INITIAL_SETUP_SUCCESS:
      return gameFetchInitalSetupSuccess(state, action);
    case actionTypes.GAME_FETCH_INITIAL_SETUP_FAIL:
      return gameFetchInitalSetupFail(state, action);
    case actionTypes.GAME_CHANGE_PLAYER_NAME:
      return gameChangePlayerName(state, action);
    case actionTypes.GAME_END:
      return gameEnd(state, action);
    case actionTypes.GAME_CELL_SELECTED:
      return gameCellSelected(state, action);
    case actionTypes.GAME_REVEAL_CELLS:
      return gameRevealCells(state, action);
    case actionTypes.GAME_RESTART:
      return gameRestart(state, action);
    case actionTypes.GAME_TREASURE_CLICKED:
      return gameTreasureClicked(state, action);
    default:
      return state;
  }
};

export default reducer;
