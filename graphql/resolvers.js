const User = require('../models/user');
const bcrypt = require('bcryptjs');
module.exports = {
    hello() {
        return {
            text: "hello world",
            views: 123
        }
    },
    createUser: async function({userInput} , req){
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
    }
}