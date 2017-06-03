
import * as  mongoose from 'mongoose';

export interface Profile extends mongoose.Document{
     name:string;
     description:string;
     fileName: string;    
}

var profileSchema = new mongoose.Schema({
    name: String,
    description: String,
    fileName: String
});

export const ProfileRecord = mongoose.model<Profile>('Profile', profileSchema);