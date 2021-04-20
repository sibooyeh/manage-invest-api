const express = require('express');
const router = express.Router();

// @rout        GET api/expenses
// @desc        Get all users expenses
// @access      Privet
router.get('/', (req, res) => {
    res.send('Get all expenses');
});

// @rout        POST api/expenses
// @desc        Add new expenses
// @access      Privet
router.post('/', (req, res) => {
    res.send('Add expenses');
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