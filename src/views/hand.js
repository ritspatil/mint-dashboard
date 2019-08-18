import React, { Component } from 'react';
import { map } from 'lodash';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import firebase from '../firebase';
import NavBar from '../components/navBar/navBar';
import Expenses from '../components/expenses/Expenses';
import HandTracker from '../components/handTracker/HandTracker';
import budgets from '../descriptors/categories.json';
import ProgressBar from '../components/progressBar/ProgressBar';
import NewsFeedContainer from '../components/newsFeed/NewsFeedContainer';

import './index.scss';

class Hand extends Component {
  constructor(props) {
    super(props);
    this.db = firebase.firestore();
    this.state = {
      expenses: [],
      screen: 1,
      status: 'Loading Models'
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

  onHandTrack = direction => {
    console.log('will update');
    const { screen } = this.state;
    this.setState({ screen: (screen + 1) % 2 });
  };
  
  modelsLoaded = () => {
    this.setState({ status: 'Models Loaded' })
  }

  render() {
    const { screen, status } = this.state;
    return (
      <React.Fragment>
        <NavBar status={status} />
        <HandTracker onHandTrack={this.onHandTrack} onModelsLoaded={this.modelsLoaded}/>
        {screen === 0 && <NewsFeedContainer />}
        {screen === 1 && (
          <Container>
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
          </Container>
        )}
      </React.Fragment>
    );
  }
}

export default Hand;
