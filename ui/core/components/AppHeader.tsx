import { AppBar, Button, Toolbar, Typography, withStyles } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { tokenManager } from '../../lib/Token';
const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  }
};

export type AppHeaderProps = {
  classes: Record<keyof typeof styles, string>;
} & RouteComponentProps;

export const AppHeaderComp: FunctionComponent<AppHeaderProps> = ({ classes, history }) => (
  <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit" className={classes.grow}>
          Tech Tools
        </Typography>
        <Button color="inherit" onClick={async () => {
          await tokenManager.logout();
          history.push('/auth/login');
        }}>Logout</Button>
      </Toolbar>
    </AppBar>
  </div>
)
export const AppHeader = withStyles(styles)(withRouter(AppHeaderComp));
