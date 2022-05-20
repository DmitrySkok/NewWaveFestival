import { connect } from 'react-redux';
import { getSeats, getRequests, loadSeatsRequest, addSeatRequest } from '../../../redux/seatsRedux';
import SeatChooser from './SeatChooser';

const mapStateToProps = state => ({
  seats: getSeats(state),
  requests: getRequests(state),
});

const mapDispatchToProps = dispatch => ({
  loadSeats: () => dispatch(loadSeatsRequest()),
  addSeat: (seat) => dispatch(addSeatRequest(seat))
});

export default connect(mapStateToProps, mapDispatchToProps)(SeatChooser);