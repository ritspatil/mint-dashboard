import React, { Component } from 'react';
import { map } from 'lodash';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import firebase from '../firebase';
import Expenses from '../components/expenses/Expenses';
import Matcher from '../components/matcher/Matcher';
import NavBar from '../components/navBar/navBar';
import budgets from '../descriptors/categories.json';

import './index.scss';
import ProgressBar from '../components/progressBar/ProgressBar';
import NewsFeedContainer from '../components/newsFeed/NewsFeedContainer';

class Home extends Component {
  constructor(props) {
    super(props);
    this.db = firebase.firestore();
    this.state = {
      expenses: [],
      activeUser: ''
    };
  }

  componentDidMount() {
    const me = this;
    this.db
      .collection('expenses')
      .orderBy('date', 'desc')
      .onSnapshot(function(querySnapshot) {
        const expenses = map(querySnapshot.docs, doc => {
          return { ...doc.data(), id: doc.id };
        });
        me.setState({ expenses });
      });
  }

  setActiveUser = userName => {
    this.setState({ activeUser: userName });
  };

  render() {
    const { activeUser } = this.state;
    return (
      <React.Fragment>
        <NavBar user={activeUser} />
        <Matcher onMatch={this.setActiveUser} />
        {activeUser !== 'Nikhil' && <NewsFeedContainer />}
        {activeUser === 'Nikhil' && (
          <Container>
            {activeUser === 'Nikhil' && (
              <Grid container spacing={3}>
                <Grid item xs={9}>
                  <Expenses expenses={this.state.expenses} />
                </Grid>
                <Grid item xs={3}>
                  <Grid container className="budget-container">
                    {map(budgets, (budget, category) => (
                      <Grid key={category} item xs={12}>
                        <ProgressBar
                          expenses={this.state.expenses}
                          categories={budget.categories}
                          name={category}
                          limit={budget.budget}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Container>
        )}
      </React.Fragment>
    );
  }
}

export default Home;
