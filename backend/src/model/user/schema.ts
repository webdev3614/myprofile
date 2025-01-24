import { Schema, Document } from "mongoose";

// Define the interface for the user document
interface IUser extends Document {
    first_name: string
    last_name: string
    email: string
    password: string
    img: string
    is_admin: boolean
    createdAt: Date
}

// Define the schema
const user_schema = new Schema<IUser>({
    first_name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    last_name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,  // Email must be unique
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,  // Email format validation
    },
    password: {
        type: String,
        required: true,
        minlength: 6  // Password must be at least 6 characters long
    },
    img: {
        type: String
    },
    is_admin: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now  // Automatically sets the creation date
    }
});

export {
    IUser
}
// Export the schema
export default user_schema;
