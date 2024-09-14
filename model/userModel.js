import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    filename: {
        type: String,  // Nullable field
        default: null  // Default value set to null
    }
});

export default mongoose.model("Users", userSchema);
