const express = require('express');
const cont = require("../controllers/user-controller");
const router =express();

router.get('/',cont.getAllUser);
router.post('/singup',cont.singup);
router.post('/login',cont.login);

module.exports =router;
