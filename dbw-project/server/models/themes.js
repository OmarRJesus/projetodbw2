import mongoose from 'mongoose';
const { Schema } = mongoose;

const ThemeSchema = new Schema({
    tema: { type: String, required: true },
    tempo: { type: String, required: true },
    participantes: [{
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        username: String 
    }],
    palavras: [String],
    aiGeradoText: String
    
}, { collection: 'Themes' }); 

const Theme = mongoose.model('Theme', ThemeSchema);

export default Theme;