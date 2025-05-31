import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role:{type: String, enum: ['comprador', 'vendedor', 'admin'], default: 'comprador'},
});

const User = mongoose.models.User || mongoose.model('User', userSchema, 'usuarios');

export default User;