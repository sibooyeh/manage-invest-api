const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Expenses = require('../models/Expenses');

// @rout        GET api/expenses
// @desc        Get all users expenses
// @access      Privet
router.get('/', auth, async (req, res) => {
    try {
        const expenses = await Expenses.find({ user: req.user.id }).sort({ date: -1});
        res.json(expenses);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

// @rout        POST api/expenses
// @desc        Add new expenses
// @access      Privet
router.post('/', [ auth, [
    check('name', 'Name is required').not().isEmpty()
] ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, type, price, currency, note, date } = req.body;

    try {
        const newExpenses = new Expenses({
            name,
            type,
            price,
            currency,
            note,
            date,
            user: req.user.id
        });

        const expenses = await newExpenses.save();

        res.json(expenses);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

// @rout        PUT api/expenses:id
// @desc        Update new expenses
// @access      Privet
router.put('/:id', (req, res) => {
    res.send('Update expenses');
});

// @rout        DELETE api/expenses:id
// @desc        Update expenses
// @access      Privet
router.delete('/:id', (req, res) => {
    res.send('Delete expenses');
});

module.exports = router;