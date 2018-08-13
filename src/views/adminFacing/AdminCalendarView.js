import React, { Component } from 'react';
import { connect } from 'react-redux';
import {compose} from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { AVAILABILITY_ACTIONS } from '../../redux/actions/availabilityActions'; 
import ApptCalendar from '../../components/ApptCalendar/ApptCalendar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Nav from '../../components/Nav/Nav';
import sweetAlertSuccess from '../../redux/modules/sweetAlertSuccess';

const mapStateToProps = state => ({
    user: state.user,
});

const styles = {

    saveButton: {
        marginTop: '30px',
        display: 'inline-block',
        backgroundSize: '200% auto',
        transition: '0.5s',
        backgroundImage: 'linear-gradient(to right, #ff8008 0%, #ffc837 51%, #fe981e 100%)',
        borderRadius: '200px',
        display: 'flex',
        backgroundColor: '#ef8902',
        marginTop: '1vw',
        margin: '1vw',
        padding: '2%',
        paddingLeft: '4%',
        paddingRight: '4%',
        fontSize: '2vw',
        color: 'white !important',
        '&:hover': {
          backgroundImage: 'linear-gradient(to right, #ff8008 0%, #ffc837 51%,#fbad40 100%)',
          backgroundColor: '#E8E8E8',
          backgroundPosition: 'right center'
        }
    },
    calendar: {
        position: 'absolute',
        width: '100vw',
        marginRight: '-10px',
    }
    
};

class AdminCalendarView extends Component {
    // constructor(props) {
    //     super(props);
    // }

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    }

    saveAvailability = (event) => {
        this.props.dispatch({ type: AVAILABILITY_ACTIONS.POST });
        sweetAlertSuccess(`Cleaner availability saved and customer scheduler updated.`);
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.view}>

                <Nav history={this.props.history}/>
                <br/>
                <br/>
                <ApptCalendar className={classes.calendar} userType={'admin'}/>
                <center>
                    <Button variant="contained" onClick={this.saveAvailability} className={classes.saveButton}>Save</Button>
                </center>
            </div>
        );
    }
}

AdminCalendarView.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default compose(withStyles(styles),connect(mapStateToProps))(AdminCalendarView);