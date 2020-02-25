import React from "react";
import PropTypes from "prop-types";

import classes from "./TurnControl.module.css";

const TurnControl = ({
  isGameStarted,
  currentTurn,
  movesLeft,
  treasuresLeft
}) => {
  let turnTemplate = "";

  if (isGameStarted) {
    turnTemplate = (
      <div className={classes.TurnControl}>
        <p className={classes.TurnControlText}>Current turn: {currentTurn}</p>
        <p className={classes.TurnControlText}>Moves left: {movesLeft}</p>
      </div>
    );
  }

  return turnTemplate;
};

TurnControl.propTypes = {
  isGameStarted: PropTypes.bool,
  currentTurn: PropTypes.number,
  movesLeft: PropTypes.number,
  treasuresLeft: PropTypes.number
};

export default TurnControl;
