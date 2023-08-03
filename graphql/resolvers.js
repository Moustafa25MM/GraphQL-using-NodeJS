const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');

module.exports = {
    createUser: async function({userInput} , req){
        const errors = [];
        if(!validator.isEmail(userInput.email)){
            errors.push({ message : "E-mail is not Valid"});
        }
        if(validator.isEmpty(userInput.password) || !validator.isLength(userInput.password,{min:5})){
            errors.push({ message : "Password is too Short"});
        }
        if(errors.length > 0){
            const error = new Error('Invalid Input');
            error.data = errors;
            error.code = 422;
            throw error;
        }
        const existingUser = await User.findOne({email:userInput.email})
        if(existingUser){
            const error = new Error('User Exists already!')
            throw error;
        }
        const hashedPw = await bcrypt.hash(userInput.password,12)
        const user = new User({
            email:userInput.email,
            name: userInput.name,
            password: hashedPw,
        })
        const createdUser = await user.save();
        return {
            ...createdUser._doc , _id: createdUser._id.toString() 
        }
    },
    login : async function({email,password}){
        const user = await User.findOne({email : email});
        if(!user){
            const err = new Error('User Not Found!');
            err.code = 401;
            throw err;
        }
        const isEqual = await bcrypt.compare(password , user.password);
        if(!isEqual){
            const err = new Error('Password is not correct!');
            err.code = 401 ;
            throw err;
        }
        const token = jwt.sign({
            userId:user._id.toString(),
            email:user.email,
        }, 'supersecretkey', {expiresIn: '1h'});
        return {
            token : token,
            userId:user._id.toString()
        }
    },
}