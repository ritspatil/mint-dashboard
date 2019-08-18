import React from 'react';
import { string } from 'prop-types';
import { map } from 'lodash';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import './index.scss';

class NewsFeed extends React.PureComponent {
  static propTypes = {
    queryParams: string,
    url: string,
    title: string
  };

  static defaultProps = {
    queryParams: '',
    title: '',
    url:
      'https://newsapi.org/v2/top-headlines?apiKey=f3ad97bce8d64f8cbef9a37c4e2aebe1'
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      timer: 30000
    };
  }

  componentDidMount() {
    const { timer } = this.state;
    this.getNewsFeed().then(response => {
      this.setState({ articles: response.data.articles }, () => {
        this.interval = setInterval(this.updateNewsFeed.bind(this), timer);
      });
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getNewsFeed() {
    const { queryParams } = this.props;
    const url = [
      'https://newsapi.org/v2/top-headlines?apiKey=f3ad97bce8d64f8cbef9a37c4e2aebe1',
      queryParams
    ].join('&');
    return axios.get(url);
  }

  updateNewsFeed() {
    this.getNewsFeed().then(response =>
      this.setState({ articles: response.data.articles })
    );
  }

  render() {
    const { queryParams, title } = this.props;
    return (
      <Paper className="news-container">
        <Typography variant="h6" className="news-title">
          {title}
        </Typography>
        <List className="feed-container">
          {map(this.state.articles, (article, index) => {
            return (
              <ListItem
                key={`${index}-${queryParams}-article.publishedAt`}
                alignItems="flex-start"
                className="each-news-feed"
              >
                <ListItemAvatar>
                  <Avatar alt={article.title} src={article.urlToImage} />
                </ListItemAvatar>
                <ListItemText
                  primary={article.title}
                  secondary={
                    <Typography
                      component="span"
                      variant="body2"
                      className="news-text"
                      color="textPrimary"
                    >
                      {article.description}
                    </Typography>
                  }
                />
              </ListItem>
            );
          })}
        </List>
      </Paper>
    );
  }
}

export default NewsFeed;
