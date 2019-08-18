import React from 'react';
import classNames from 'classnames';

const Filler = ({ percentage }) => {
  const updatedClassName = classNames('filler', {
    quarter: percentage < 33,
    half: percentage >= 33 && percentage < 67,
    full: percentage >= 67
  });
  const width = percentage > 100 ? 100 : percentage;
  return <div className={updatedClassName} style={{ width: `${width}%` }} />;
};

export default Filler;
