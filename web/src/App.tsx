import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TextField from '@material-ui/core/TextField';
import WarningIcon from '@material-ui/icons/Warning';
import DoneIcon from '@material-ui/icons/Done';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper, InputAdornment, IconButton, Typography, CssBaseline, Button } from '@material-ui/core';
import axios from 'axios';

const styles = ({ palette, spacing, breakpoints }: Theme) => createStyles({
  root: {
    height: 500,
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    position: 'relative',
    marginTop: spacing.unit * 3,
    width: 'fill-available'
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  divider: {
    height: spacing.unit * 2,
  },
  paper: {
    marginTop: spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${spacing.unit * 2}px ${spacing.unit * 3}px ${spacing.unit * 3}px`,
  },
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: spacing.unit * 3,
    marginRight: spacing.unit * 3,
    [breakpoints.up(400 + spacing.unit * 3 * 2)]: {
      width: 500,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  text: {
    textAlign: 'center'
  }
});

class App extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      value: '',
      completed: false
    }
  }

  onChange = (event: any) => {
    this.setState({
      value: event.target.value
    })
  }

  render() {
    const { value, suggestions } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <main className={classes.main}>
          <CssBaseline />
          {!this.state.completed && <Paper className={classes.paper}>
            <Typography component="h1" variant="h5">
              Add to Queue
            </Typography>
            <div className={classes.container}>
              <TextField
                fullWidth
                onChange={this.onChange}
                label={this.state.validEmail?'':'Enter Name'}
                InputProps = {{
                  classes: {
                    input: classes.input,
                  },
                }}
              />
            </div>
            <div className={classes.container}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => {
                axios.post(`https://gatekeeper.sundheim.online/bathroom/add/${value}`, {
                  
                }).then((response) => {
                  this.setState({
                    completed: true,
                  });
                }).catch((error) => {
                  this.setState({
                    completed: true
                  })
                });
              }}
            >
              Add
            </Button>
          </div>
          </Paper>}
          {this.state.completed && <Paper className={classes.paper}>
              <CssBaseline />
              <div className={classes.text}>
                <Typography component="h1" variant="h5">
                  Success!
                </Typography>
              </div>
          </Paper>}
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(App);