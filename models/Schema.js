import mongoose, {Schema} from "mongoose";

const contactSchema = new Schema({
    name: String,
    email: String,
    message: String,
    createdAt: Date
})

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;
