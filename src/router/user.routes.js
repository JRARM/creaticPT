const router = require("express").Router();
const User = require("../model/user.model");
const { faker } = require("@faker-js/faker");

const checkUserExist = async (req, res, next) => {
    const id = req.params.user_id;
    const user = await User.findOne({ where: { user_id: id } });
    if (!user) {
        return res.status(404).json({
            ok: false,
            status: 404,
            message: "User not found in db"
        });
    }
    // Attach the user object to the request for later use if needed
    req.user = user;
    next();
};

const checkRequestBody = (req, res, next) => {
    const { user_name, user_email, user_password } = req.body;
    if (!user_name || !user_email || !user_password) {
        return res.status(400).json({
            ok: false,
            status: 400,
            message: "Empty fields request body"
        });
    }
    next();
};
const checkEmailExists = async (req, res, next) => {
    const user_email = req.body.user_email;
    const existingUser = await User.findOne({ where: { user_email } });
    if (existingUser) {
        return res.status(409).json({
            ok: false,
            status: 409,
            message: "Email already exists"
        });
    }
    next();
};


router.post("/users", checkRequestBody, checkEmailExists, async (req, res) => {
    const dataUsers = req.body;
    await User.sync();
    const newtest = await User.create({
        user_name: dataUsers.user_name,
        user_email: dataUsers.user_email,
        user_password: dataUsers.user_password
    });
    res.status(201).json({
        ok: true,
        status: 201,
        message: "User successfuly created",
        user: newtest.user_id
    });
});

router.get("/users/:user_id", checkUserExist, async (req, res) => {
    //exist user in db?

    const id = req.params.user_id;
    const getuser = await User.findOne({
        where: { user_id: id }
    });
    res.status(200).json({
        ok: true,
        status: 200,
        body: getuser
    });
});


router.put("/users/:user_id", checkRequestBody, checkUserExist, checkEmailExists, async (req, res) => {
    const id = req.params.user_id;
    const dataUsers = req.body;
    const updateTest = await User.update({
        user_name: dataUsers.user_name,
        user_email: dataUsers.user_email,
        user_password: dataUsers.user_password
    }, { where: { user_id: id } });
    res.status(200).json({
        ok: true,
        status: 200,
        body: updateTest
    })
});

module.exports = router;