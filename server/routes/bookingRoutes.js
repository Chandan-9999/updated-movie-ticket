import express from 'express'
import { createBooking, getOccupiedSeats, verifyStripePayment } from '../controllers/bookingController.js';

const bookingRouter=express.Router();

bookingRouter.post('/create', createBooking);
bookingRouter.post('/verify-payment', verifyStripePayment);
bookingRouter.get('/seats/:showId', getOccupiedSeats);

export default bookingRouter;
