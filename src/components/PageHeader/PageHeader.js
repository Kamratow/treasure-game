import React from "react";
import PropTypes from "prop-types";

import classes from "./PageHeader.module.css";

const PageHeader = ({ headerText }) => {
  return (
    <>
      <h1 className={classes.PageHeader}>{headerText}</h1>
      <h2>Find three treasures!</h2>
    </>
  );
};

PageHeader.propTypes = {
  headerText: PropTypes.string
};

export default PageHeader;
