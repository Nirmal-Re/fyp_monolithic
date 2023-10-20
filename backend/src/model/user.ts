import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {type: String, required: true, select: false},
    passwordSalt: {type: String, required: true, select: false},
    createdAt: {type: Date, default: Date.now},
    emailVerification: {type: Boolean, default: true}, //TODO: implement email verification and change default to false
});

export const User = mongoose.model("User", userSchema);

const getUsers = async () => {
    return await User.find({});
}
const getUserByEmail = async (email: string) => {await User.findOne({email})}
const getUserById = async (id:string) => {await User.findById(id)}
const createUser = async (user: any) => User.create(user).then((user: any) => user._id); //TODO this could be wrong
const verifyUserEmail = async (email:string) => {
    const conditions = {email};
    const update = {$set:{emailVerification: true}};
    User.updateOne(conditions, update, (err:any, res:any) => {
        if (err) throw err;
        console.log(res);
    } )
}