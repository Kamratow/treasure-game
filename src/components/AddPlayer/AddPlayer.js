import React, { useState } from "react";
import PropTypes from "prop-types";

import classes from "./AddPlayer.module.css";

const AddPlayer = ({ isGameStarted, playerName, gameStarted, nameChanged }) => {
  const [isPlayerNameValid, setIsPlayerNameValid] = useState(false);

  const checkPlayerName = nameToCheck => {
    if (!!nameToCheck === false || nameToCheck.length < 3) {
      setIsPlayerNameValid(false);
    } else {
      setIsPlayerNameValid(true);
    }
  };

  const handlePlayerNameChanged = event => {
    const newPlayer = event.target.value;
    checkPlayerName(newPlayer);
    nameChanged(newPlayer);
  };

  return (
    <div className={classes.AddPlayer}>
      {isGameStarted ? (
        <p className={classes.AddPlayerTitle}>Happy hunting {playerName}!</p>
      ) : (
        <>
          <p className={classes.AddPlayerTitle}>
            Please enter a player name that is at least 3 characters long
          </p>
          <label htmlFor="PlayerName">
            <input
              name="PlayerName"
              type="text"
              onChange={event => handlePlayerNameChanged(event)}
              placeholder="type player name here"
            />
          </label>
          <button
            type="button"
            disabled={!isPlayerNameValid}
            onClick={gameStarted}
          >
            Start Game
          </button>
        </>
      )}
    </div>
  );
};

AddPlayer.propTypes = {
  isGameStarted: PropTypes.bool,
  playerName: PropTypes.string,
  gameStarted: PropTypes.func,
  nameChanged: PropTypes.func
};

export default AddPlayer;
