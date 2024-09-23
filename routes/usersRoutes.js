const express = require('express');
const router = express.Router();

router.get('/api/users', (req, res) => {
    res.json({message:"get all contacts"});
})

module.exports = router;
