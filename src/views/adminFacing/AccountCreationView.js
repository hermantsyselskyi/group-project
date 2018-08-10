import React from 'react';
import axios from 'axios';

// Material UI Imports
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import { Typography } from '../../../node_modules/@material-ui/core';
import TextField from '@material-ui/core/TextField';

// Component Imports
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import { compose } from 'redux';
import Nav from '../../components/Nav/Nav';
import sweetAlertSuccess from '../../redux/modules/sweetAlertSuccess';


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 230,
      },
      button: {
          backgroundColor: '#EF8902',
      },
      formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
      },

});

const mapStateToProps = state => ({
  user: state.user,

});

class AccountCreationView extends React.Component{
    constructor(props) {
        super(props);
    
        this.state = {
          username: '',
          password: '',
          confirmPassword: '',
          message: '',
        };
      }


    registerAdmin = (event) => {
        event.preventDefault();
        const { password, confirmPassword } = this.state;
        if (password !== confirmPassword) {
          this.setState({
            message: `Passwords do not match!`,
          });
        } else {
          const body = {
            username: this.state.username,
            password: this.state.password,
          };
    
          // making the request to the server to post the new admin's registration
          axios.post('/api/admin/register/', body)
            .then((response) => {
              if (response.status === 201) {
                this.setState({
                    message: 'Success!',
                    username: '',
                    password: '',
                    confirmPassword: ''
                })
              } else {
                this.setState({
                  message: 'Ooops! That didn\'t work. The username might already be taken. Try again!',
                });
              }
            })
            .catch(() => {
              this.setState({
                message: 'Ooops! Something went wrong!',
              });
            });
        }
      } // end registerAdmin

    handleChange = propertyName => (event) => {
    this.setState({
        [propertyName]: event.target.value,
    });
    }

    renderAlert() {
        if (this.state.message !== '') {
          return (
            <h1>
              {this.state.message}
            </h1>
          );
        }
        return (<span />);
      }


    render(){
        let content = null;
        let nav = null;
        const { classes } = this.props;
    
        if (this.props.user.userName) {
                nav = (
                  <Nav />
                )
                content = (
                    <div>
                    {this.renderAlert()}
                    <form >
                    <Typography>Register New Admin</Typography>
                    <div>
                        <TextField
                            id="username"
                            placeholder="Username"
                            value={this.state.username}
                            className={classes.textField}
                            onChange={this.handleChange('username')}
                            margin="normal"
                        />
                        <TextField
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={this.state.password}
                            className={classes.textField}
                            onChange={this.handleChange('password')}
                            margin="normal"
                        />
                        <TextField
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm Password"
                            value={this.state.confirmPassword}
                            className={classes.textField}
                            onChange={this.handleChange('confirmPassword')}
                            margin="normal"
                        />
                    </div>
                    <div>
                        <Button variant="contained" onClick={this.registerAdmin} className={classes.button}>
                            Submit
                        </Button>
                        <Link to="/home"><Typography>Cancel</Typography></Link>
                    </div>
                    </form>
                </div>
                );
        }
    
    
        return(
            <Paper>
                { nav }
                { content }
            </Paper>
        );
    }
}

export default compose(withStyles(styles), connect(mapStateToProps))(AccountCreationView);