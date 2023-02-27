import React from 'react';
import useStyles from './Spinner.style';

const Spinner = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div data-testid="spinner" className={classes.spinner}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;
