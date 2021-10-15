import mongoose from 'mongoose';

const visitorSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        }
    },
    {
        timestamps: true,
    }
)

const Visitor = mongoose.model('Visitor', visitorSchema);

export default Visitor;