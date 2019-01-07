import { withStyles, WithStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React from "react";

interface LoginFormProps {
  email: string;
  emailChanged: (newEmail: string) => any;
  password: string;
  passwordChanged: (newPassword: string) => any;
  formSubmitted: () => any;
}

export const LoginForm = withStyles(theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
}))(({
  classes,
  email,
  emailChanged,
  password,
  passwordChanged,
  formSubmitted
}: WithStyles & LoginFormProps) => (
<main className={classes.main}>
  <CssBaseline />
  <Paper className={classes.paper}>
    <Avatar className={classes.avatar}>
      <Icon>lock</Icon>
    </Avatar>
    <Typography component="h1" variant="h5">
      Sign in
    </Typography>
    <form className={classes.form}>
      <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor="email">Email Address</InputLabel>
        <Input
          id="email"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => emailChanged(e.target.value)} />
      </FormControl>
      <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input
        name="password"
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => passwordChanged(e.target.value)} />
      </FormControl>
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={() => formSubmitted()}
        className={classes.submit}
      >
        Sign in
      </Button>
    </form>
  </Paper>
</main>
));
