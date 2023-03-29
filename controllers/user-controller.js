const User = require('../model/User');
const bcrypt = require('bcrypt');

const getAllUser = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (err) {
        console.log(err);
    }
    if (!users) {
        return res.status(404).json({msg: "No Users Found"});
    }
    return res.status(200).json({users});
}; 


 const singup = async(req ,res ,next)=>{
    const { name ,email ,password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({email});
    } catch (error) {
        return console.log(error);
    }
    if(existingUser){
        return res.status(400).json({msg: "User Already Exits! ligin instead"})
    }
    const hashedPassword = bcrypt.hashSync(password);
    const user = new User({
        name,
        email,
        password:hashedPassword,
        blogs: [],
    });

    try {
        await user.save();
    } catch (error) {
        return console.log(error);
    }
    return res.status(201).json({user})
};

 const login = async (req, res ,next)=>{
    const { email ,password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({email});
    } catch (error) {
        return console.log(error);
    }
    if(!existingUser){
        return res.status(404).json({msg: "Couldn't find user by this email "});
    }
    
    const isthePassworCorrect = bcrypt.compareSync(password,existingUser.password);
    if (!isthePassworCorrect){
        return res.status(400).json({msg: "Incorrect Password"})
    }
    return res.status(200).jspn({msg: "login Successfull"})
};

module.exports={getAllUser, singup, login}
