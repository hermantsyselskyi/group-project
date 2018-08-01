import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

// Material UI Imports
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';

// Component Imports 
import AddRoomForm from './AddRoomForm';

const mapStateToProps = store => ({
    locations: store.locations,
    rooms: store.rooms
});

class RoomControlTable extends React.Component{
    constructor(){
        super();
        this.state = {
            roomInfo: {
                room_name: '',
                location_id: null,
                metric: ''
            },
            anchor: null
        }
    }

    componentDidMount(){
        this.props.dispatch({type: 'FETCH_LOCATIONS'});
        this.props.dispatch({type: 'FETCH_ROOMS'});
    }

    submitRoom = () => {
        // this.props.dispatch({type: 'POST_ROOM', payload: this.state.roomInfo});
        console.log('SEND IT: ', this.state.roomInfo);
    }

    handleChangeFor = event => {
        return new Promise((resolve, reject)=>{
            try{
                this.setState({roomInfo: {...this.state.roomInfo, [event.target.id]: event.target.value}, anchor: null});
                resolve();
            }catch(error){
                reject();
            }
        });
    }

    render(){
        let table = null;
        if(this.props.rooms){
            table = (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Room Name</TableCell>
                            <TableCell>Location Type</TableCell>
                            <TableCell>Duration Metric</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Hide</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.rooms.map(room => {
                            return(
                                <TableRow key={room.id}>
                                    <TableCell>{room.room_name}</TableCell>
                                    <TableCell>{room.location_type}</TableCell>
                                    <TableCell>{room.metric}</TableCell>
                                    <TableCell><Button>Edit</Button></TableCell>
                                    <TableCell>Insert check box</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            );
        }
        return(
            <Paper>
                <Typography variant="title">Add Rooms</Typography>
                <AddRoomForm handleChangeFor={this.handleChangeFor} submitRoom={this.submitRoom} room={this.state.roomInfo.room_name} metric={this.state.roomInfo.metric} anchor={this.state.anchor} locations={this.props.locations}/>
                {table}
            </Paper>
        );
    }
}

export default compose(
    connect(mapStateToProps)
)(RoomControlTable);