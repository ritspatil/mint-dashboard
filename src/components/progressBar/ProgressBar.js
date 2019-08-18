import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { filter, reduce, round } from 'lodash';
import moment from 'moment';
import Filler from './Filler';

import './index.scss';

const ProgressBar = props => {
  const { expenses, categories, limit, name } = props;
  const currentMonthTransactions = filter(expenses, expense => {
    return (
      moment(expense.date).isSame(new Date(), 'month') &&
      categories.includes(expense.category)
    );
  });

  const total = reduce(
    currentMonthTransactions,
    (keep, transaction) => {
      const newTotal = keep + transaction.amount;
      return round(newTotal);
    },
    0
  );

  const percentage = round((total / limit) * 100);
  return (
    <div className="progress-bar-wrapper">
      <div className="budget-category-description">
        <span className="category-description">{name}</span>
        <span className="budget-description">
          <Typography variant="button">${total}</Typography>
          &nbsp;of&nbsp;
          <Typography variant="button">${limit}</Typography>
        </span>
      </div>
      <div className="progress-bar">
        <Filler percentage={percentage} />
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  expenses: PropTypes.array,
  categories: PropTypes.array,
  name: PropTypes.string,
  limit: PropTypes.number
};

export default ProgressBar;
