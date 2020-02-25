import React from "react";
import PropTypes from "prop-types";

import classes from "./LeaderBoard.module.css";

const LeaderBoard = ({ scores }) => {
  const sortedScores = [...scores].sort((a, b) => {
    return a.score - b.score;
  });

  const leaderBoardContent = sortedScores.map((playerScore, index) => (
    <li className={classes.LeaderBoardListItem} key={index}>
      {index + 1}: {playerScore.playerName} - {playerScore.score} turns
    </li>
  ));

  return (
    <div className={classes.LeaderBoard}>
      <h3>LeaderBoard</h3>
      <ul className={classes.LeaderBoardList}>{leaderBoardContent}</ul>
    </div>
  );
};

LeaderBoard.propTypes = {
  scores: PropTypes.arrayOf(
    PropTypes.shape({
      playerName: PropTypes.string,
      score: PropTypes.number
    })
  )
};

export default LeaderBoard;
