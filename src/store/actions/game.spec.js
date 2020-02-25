import * as actionTypes from "./actionTypes";
import * as actions from "./game";

describe("Game actions", () => {
  it("should create gameChangePlayerName action", () => {
    const testPlayerName = "TestName";
    const expectedAction = {
      type: actionTypes.GAME_CHANGE_PLAYER_NAME,
      playerName: testPlayerName
    };
    expect(actions.gameChangePlayerName(testPlayerName)).toEqual(
      expectedAction
    );
  });

  it("should create gameEnd action", () => {
    const expectedAction = {
      type: actionTypes.GAME_END
    };
    expect(actions.gameEnd()).toEqual(expectedAction);
  });
});
