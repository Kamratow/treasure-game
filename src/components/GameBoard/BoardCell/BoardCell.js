import React from "react";
import PropTypes from "prop-types";

import classes from "./BoardCell.module.css";

const BoardCell = ({ cellInfo, cellClicked }) => {
  const getCellClasses = cellData => {
    const cellClasses = [classes.BoardCell];

    const cellProximityClasses = {
      T: classes.BoardCellTreasure,
      "3": classes.BoardCellProximityHigh,
      "2": classes.BoardCellProximityMedium,
      "1": classes.BoardCellProximityLow
    };

    if (cellData.isCellRevealed) {
      cellClasses.push(cellProximityClasses[cellData.proximity]);
    } else if (cellData.isCellSelected) {
      cellClasses.push(classes.BoardCellSelected);
    }

    return cellClasses.join(" ");
  };

  const handleCellClick = () => {
    if (!cellInfo.isCellSelected) {
      cellClicked();
    }
  };

  let cellContent = null;

  if (cellInfo.isCellRevealed) {
    cellContent = (
      <div className={classes.BoardCellText}>{cellInfo.proximity}</div>
    );
  }

  return (
    <div className={getCellClasses(cellInfo)} onClick={() => handleCellClick()}>
      {cellContent}
    </div>
  );
};

BoardCell.propTypes = {
  cellInfo: PropTypes.shape({})
};

export default BoardCell;
