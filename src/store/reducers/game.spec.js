import gameReducer from "./game";
import * as actionTypes from "../actions/actionTypes";

describe("GameReducer", () => {
  it("should not react to unknown action", () => {
    const initialState = {
      prop1: "test1",
      prop2: "test2"
    };
    const unknownAction = {
      type: "UNKNOWN_ACTION_TYPE",
      someProp: "test"
    };
    expect(gameReducer(initialState, unknownAction)).toEqual(initialState);
  });

  it("should handle GAME_CHANGE_PLAYER_NAME", () => {
    const initialState = {
      playerName: "Player1"
    };
    const newPlayerName = "Player2";
    const changePlayerNameAction = {
      type: actionTypes.GAME_CHANGE_PLAYER_NAME,
      playerName: newPlayerName
    };
    expect(gameReducer(initialState, changePlayerNameAction)).toEqual({
      playerName: newPlayerName
    });
  });

  it("should handle GAME_FETCH_INITIAL_SETUP_FAIL", () => {
    const initialState = {
      isGameSetupLoading: true,
      isGameSetupFetchFailed: false
    };
    const gameFetchInitialSetupFailAction = {
      type: actionTypes.GAME_FETCH_INITIAL_SETUP_FAIL
    };
    expect(gameReducer(initialState, gameFetchInitialSetupFailAction)).toEqual({
      isGameSetupLoading: false,
      isGameSetupFetchFailed: true
    });
  });
});
