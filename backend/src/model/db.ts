import mongoose from 'mongoose';

import {DB} from '../constants/config';

export const dbConnection = mongoose.connect(DB.host);
mongoose.connection.on('open', function() {
    console.log('Mongoose connected to ' + DB.host);
  });
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

