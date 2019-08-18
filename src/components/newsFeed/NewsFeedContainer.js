import React from 'react';
import Grid from '@material-ui/core/Grid';
import NewsFeed from './NewsFeed';

const NewsFeedContainer = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <NewsFeed title="Head Lines" queryParams="country=us&pageSize=5" />
      </Grid>
      <Grid item xs={4}>
        <NewsFeed
          title="Sports"
          queryParams="country=us&category=sports&pageSize=5"
        />
      </Grid>
      <Grid item xs={4}>
        <NewsFeed
          title="Technology"
          queryParams="country=us&category=technology&pageSize=5"
        />
      </Grid>
    </Grid>
  );
};

export default NewsFeedContainer;
