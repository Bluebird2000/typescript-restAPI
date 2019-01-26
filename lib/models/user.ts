import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    firstname: {
        type: String,
        required: 'Enter a first name'
    },
    lastname: {
        type: String,
        required: 'Enter a last name'
    },
    email: {
        type: String
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: null
    }
});