const express = require("express");
const User = require("../db/userModel");
const router = express.Router();


router.post("/user", async (request, res) => {
    const {login_name, password, first_name, last_name, location, description, occupation} = request.body
    const user = await User.findOne({
        login_name: login_name
    })

    
    if(user) {
        res.status(400).send("User exists in db")
    } else {
        if(login_name.trim().length == 0 || first_name.trim().length == 0 || last_name.trim().length == 0) {
            res.status(400).send({
                msg: "Login name or first name or last name can't be empty"
            })
            return
        }
        const newUser = new User({
            login_name, password, first_name, last_name, location, description, occupation
        })
        await newUser.save();
        console.log("saved user ok")
        res.status(200).send({
            login_name: login_name
        })

        
    }

});

router.get("/user/list", async (request, response) => {
    const users = await User.find().select("_id first_name last_name")
    response.status(200).send(users)
})

router.get("/user/:id", async (request, response) => {
    const {id} = request.params
   const user = await  User.findById(id).select("_id first_name last_name location description occupation")
    if(user) {
        response.status(200).send(user)
    } else {
        response.status(400).send(`User with id: ${id} not found`)
    }
});

module.exports = router;