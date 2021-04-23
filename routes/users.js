const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @rout        POST api/users
// @desc        Register a user
// @access      Public
router.post('/',
    [
        check('name', 'Please add name').not().isEmpty().trim().escape(),
        check('email', 'Please include a valid email').isEmail().normalizeEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
        // body('name').not().isEmpty().trim().escape(),
        // body('email').isEmail().normalizeEmail(),
        // body('password').isLength({ min: 5 }).withMessage('must be at least 5 chars long').matches(/\d/).withMessage('must contain a number')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }
          
        const { name, email, password } = req.body;

        try {
            let user = await User.findOne({ email});

            if(user) {
                return res.status(400).json({ msg: 'User already exists'});
            }

            user = new User({
                name,
                email,
                password
            });

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(payload, config.get('jwtSecret'), {
                // expiresIn: 3600
                expiresIn: 360000
            }, (err, token) => {
                if (err) throw err;
                res.json({ token });
            })
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error');
        }
});

module.exports = router;