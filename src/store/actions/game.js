import * as actionTypes from "./actionTypes";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios, { delayResponse: 1000 });

const mockedGameSetup = {
  gameSetup: [
    {
      id: 0,
      proximity: "3",
      isCellSelected: false,
      isCellRevealed: false
    },
    {
      id: 1,
      proximity: "T",
      isCellSelected: false,
      isCellRevealed: false
    },
    {
      id: 2,
      proximity: "3",
      isCellSelected: false,
      isCellRevealed: false
    },
    {
      id: 3,
      proximity: "2",
      isCellSelected: false,
      isCellRevealed: false
    },
    {
      id: 4,
      proximity: "1",
      isCellSelected: false,
      isCellRevealed: false
    },
    {
      id: 5,
      proximity: "2",
      isCellSelected: false,
      isCellRevealed: false
    },
    {
      id: 6,
      proximity: "3",
      isCellSelected: false,
      isCellRevealed: false
    },
    {
      id: 7,
      proximity: "2",
      isCellSelected: false,
      isCellRevealed: false
    },
    {
      id: 8,
      proximity: "3",
      isCellSelected: false,
      isCellRevealed: false
    },
    {
      id: 9,
      proximity: "2",
      isCellSelected: false,
      isCellRevealed: false
    },
    {
      id: 10,
      proximity: "1",
      isCellSelected: false,
      isCellRevealed: false
    },
    {
      id: 11,
      proximity: "2",
      isCellSelected: false,
      isCellRevealed: false
    },
    {
      id: 12,
      proximity: "3",
      isCellSelected: false,
      isCellRevealed: false
    },
    {
      id: 13,
      proximity: "T",
      isCellSelected: false,
      isCellRevealed: false
    },
    {
      id: 14,
      proximity: "3",
      isCellSelected: false,
      isCellRevealed: false
    },
    {
      id: 15,
      proximity: "2",
      isCellSelected: false,
      isCellRevealed: false
    },
    {
      id: 16,
      proximity: "3",
      isCellSelected: false,
      isCellRevealed: false
    },
    {
      id: 17,
      proximity: "2",
      isCellSelected: false,
      isCellRevealed: false
    },
    {
      id: 18,
      proximity: "3",
      isCellSelected: false,
      isCellRevealed: false
    },
    {
      id: 19,
      proximity: "2",
      isCellSelected: false,
      isCellRevealed: false
    },
    {
      id: 20,
      proximity: "3",
      isCellSelected: false,
      isCellRevealed: false
    },
    {
      id: 21,
      proximity: "T",
      isCellSelected: false,
      isCellRevealed: false
    },
    {
      id: 22,
      proximity: "3",
      isCellSelected: false,
      isCellRevealed: false
    },
    {
      id: 23,
      proximity: "2",
      isCellSelected: false,
      isCellRevealed: false
    },
    {
      id: 24,
      proximity: "1",
      isCellSelected: false,
      isCellRevealed: false
    }
  ]
};

mock.onGet("/game-setup").reply(200, mockedGameSetup);

export const gameFetchInitialSetupStart = () => ({
  type: actionTypes.GAME_FETCH_INITIAL_SETUP_START
});

export const gameFetchInitialSetupSuccess = fetchedData => ({
  type: actionTypes.GAME_FETCH_INITIAL_SETUP_SUCCESS,
  gameSetup: fetchedData.gameSetup
});

export const gameFetchInitialSetupFail = error => ({
  type: actionTypes.GAME_FETCH_INITIAL_SETUP_FAIL,
  error
});

export const gameFetchInitialSetup = () => {
  return dispatch => {
    dispatch(gameFetchInitialSetupStart());
    axios
      .get("/game-setup")
      .then(response => {
        dispatch(gameFetchInitialSetupSuccess(response.data));
      })
      .catch(error => {
        dispatch(gameFetchInitialSetupFail(error));
      });
  };
};

export const gameChangePlayerName = playerName => ({
  type: actionTypes.GAME_CHANGE_PLAYER_NAME,
  playerName
});

export const gameStart = () => {
  return dispatch => {
    dispatch(gameFetchInitialSetup());
  };
};

export const gameCellSelected = (cell, cellIndex) => ({
  type: actionTypes.GAME_CELL_SELECTED,
  cell: cell,
  index: cellIndex
});

export const gameRevealCells = (cell, cellIndex) => ({
  type: actionTypes.GAME_REVEAL_CELLS,
  cell: cell,
  index: cellIndex
});

export const gameTreasureClicked = () => ({
  type: actionTypes.GAME_TREASURE_CLICKED
});

export const gameEnd = () => ({
  type: actionTypes.GAME_END
});

export const gameRestart = () => ({
  type: actionTypes.GAME_RESTART
});
