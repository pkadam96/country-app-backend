const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../model/user.schema');
const UserRouter = express.Router();

UserRouter.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const saltRounds = 10;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        return res.status(201).send({ error: false, items: newUser });
    } catch (error) {
        console.log(error.message);
        return res.status(400).send({ error: true, message: error.message });
    }
});

UserRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const isUserExists = await User.findOne({ email });
        if (!isUserExists) {
            return res.status(400).send({ error: true, message: "User not found" });
        }
        const checkPassword = await bcrypt.compare(password, isUserExists.password);
        if (checkPassword) {
            const accessToken = jwt.sign(
                { data: { email: isUserExists.email, name: isUserExists.name } },
                process.env.SECRETKEY,
                { expiresIn: '1h' }
            );
            return res.status(200).send({ error: false, items: accessToken });
        }
        return res.status(400).send({ error: true, message: "Wrong password" });
    } catch (error) {
        console.log(error.message);
        return res.status(400).send({ error: true, message: error.message });
    }
});

module.exports = { UserRouter };
