import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import PersonRounded from '@material-ui/icons/PersonRounded';
import Done from '@material-ui/icons/DoneRounded';
import Hourglass from '@material-ui/icons/HourglassFullTwoTone';

import './index.scss';

const ButtonAppBar = props => {
  const { user, status } = props;
  return (
    <div className="nav-bar">
      <AppBar position="static">
        <Toolbar className="nav-bar-container">
          <Typography variant="h6" className="dashboard">
            Dashboard
          </Typography>
          {user && (<span className="user-details"><PersonRounded /> {user}</span>)}
          {status === "Models Loaded" && (<span className="user-details"><Done /> Models Loaded</span>)}
          {status === "Loading Models" && (<span className="user-details"><Hourglass />Loading Models</span>)}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default ButtonAppBar;
