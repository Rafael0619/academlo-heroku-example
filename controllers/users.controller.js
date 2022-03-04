const req = require("express/lib/request");
const res = require("express/lib/response");
const {fileterObj} = require('../util/filterObj');
const {User} = require('../models/user.model');

const users = [
    { id:1 , name: 'Rafael' , age: 24  },
    {id: 2, name: 'Max' , age: 23 },
    {id: 3, name: 'Richard' , age: 21 }];


exports.getAllUsers = async (req,res) =>{
    try {

        const users = await User.findAll({
            where: { status: 'Active'}});
        res.status(200).json({
            status:'success',
            data: { users }
        });
    } catch (error) {
        console.log(error);
    }
   
};

exports.getUserById = async (req,res) => {
    try {
        const {id} = req.params;

    const user = await User.findOne({where: { id : id}});

    if(!user){
        res.status(404).json({
            status: 'error',
            message: 'User not found'
        });
        return;
    }

    res.status(200).json({
        status: 'success',
        data: {user}
    });
    } catch (error) {
        console.log(error);
    }
};

exports.createNewUser = async (req,res) => {
    try {
        const {name,  email, password} = req.body;

        if(!name || !email || password){
        res.status(400).json({
            status: 'error',
            message: 'Must provide a valid name, email and password'
        });
        return;
    }

    const newUser = await User.create({name, email, pass});

    res.status(201).json({
        status: 'success',
        data: {newUser}
    });
            
    } catch (error) {
        console.log(error);
    }
    
};

exports.updateUser = (req,res) => {
    const {id} = req.params;
    const data = fileterObj(req.body, 'name', 'age');

    const userIndex = users.findIndex(user => user.id === +id);

    if(!userIndex === -1){
        res.status(404).json({
            status: 'error',
            message:'User not found, Invalid ID'
        });
        return;
    }

    let updateUser = users[userIndex];

    updateUser = {...updateUser, ...data};

    users[userIndex] = updateUser;

    res.status(204).json({
        status:'success',
    });
};

exports.deleteUser = (req,res) => {
    const {id} = req.params;

    const userIndex = users.findIndex(user => user.id === +id);

    if(userIndex === -1){
        res.status(404).json({
            status: 'error',
            message:'couldnt delete user, invalid ID'
        });
        return;
    }

    users.splice(userIndex , 1);

    res.status(204).json({status:'success'});
};