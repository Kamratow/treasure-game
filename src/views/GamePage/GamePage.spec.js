import React from "react";
import { shallow } from "enzyme";

import { GamePage } from "./GamePage";

const defaultProps = {
  gameName: "Test game",
  playerName: "Test player",
  isGameStarted: true,
  currentTurn: 1,
  movesLeft: 3,
  isGameSetupLoading: false,
  gameSetup: [
    {
      id: 1,
      proximity: "T"
    },
    {
      id: 2,
      proximity: "3"
    }
  ],
  isGameSetupFetchFailed: false,
  treasuresLeft: 3,
  isGameFinished: false,
  scores: [],
  onPlayerNameChange: jest.fn(),
  onGameStart: jest.fn(),
  onCellClick: jest.fn(),
  onTreasureClick: jest.fn(),
  onRevealCells: jest.fn(),
  onEndGame: jest.fn(),
  onRestartGame: jest.fn()
};

describe("GamePage", () => {
  it("renders properly when game is not finished", () => {
    const wrapper = shallow(<GamePage {...defaultProps} />);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders properly when game is finished", () => {
    const propsToRender = {
      ...defaultProps,
      isGameFinished: true,
      scores: [
        { playerName: "Player1", score: 3 },
        { playerName: "Player2", score: 5 }
      ]
    };
    const wrapper = shallow(<GamePage {...propsToRender} />);
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
