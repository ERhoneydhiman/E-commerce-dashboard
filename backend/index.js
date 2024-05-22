const express = require('express');
const cors = require('cors')
require('./db/config');
const User = require('./db/User');
const app = express();

app.use(express.json());
app.use(cors())


// signup API 
app.post('/signup', async (req, res) => {
    let existingUser  = await User.findOne(req.body)
    if(existingUser ){
        return res.send({ error: "Email already in use" });
    }
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject()
    delete result.password
    res.send(result)
})


// login API
app.post('/login', async (req, res) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            res.send(user)
        } else {
            res.send({ error: "no user found" })
        }
    } else {
        res.send({ error: "no user found" })
    }
})




app.listen(5000)