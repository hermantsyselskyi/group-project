import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import RoomList from './RoomList';

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

const mapStateToProps = state => ({
  user: state.user,
});
class SimpleModal extends React.Component {
  state = {
    open: false,

  };

  handleOpen = (id) => {
    this.setState({ open: true });
  };
  
  handleClose = () => {
    this.setState({ open: false });
  };

  // updates the water DB
  updateEvent = () => {

    this.handleClose();
  } // end updateEvent


  render() {
    const { classes } = this.props;



    return (
      <div>
        <div onClick={() => this.handleOpen(this.props.updateId)}><Button>Rooms</Button></div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
          {/* <pre>{JSON.stringify(this.props.updateId)}</pre> */}
            <Typography variant="title" id="modal-title">
              Rooms and Cleanliness Score:
            </Typography>
            <div>
                {this.props.roomInfo.map((room, i) => {
                    return(
                        <RoomList key={i} roomInfo={room} />
                    );
                })}
            </div>
              <pre>{JSON.stringify(this.props.roominfo)}</pre>
            <Button onClick={this.handleClose}>Close</Button>
          </div>
        </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default connect(mapStateToProps)(SimpleModalWrapped);