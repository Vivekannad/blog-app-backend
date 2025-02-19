const { userModel } = require("../models/user");
const bcrypt = require("bcrypt");
const { createToken } = require("../service/auth");

const router = require("express").Router();

router.get("/signup", (req,res) => {
    res.render("signup");
})

router.get("/login", (req,res) => {
    res.render("login");
})

router.get("/logout", (req,res) => {
    return res.clearCookie("token").redirect("/");
})

router.post("/login", async(req,res) => {
    const {email , password} = req.body;
    if(!email || !password) return res.redirect(400,"/user/login");
    const user = await userModel.findOne({email : email});
    if(!user)return  res.redirect(400,"/user/login");
    const isPasswordTrue = await bcrypt.compare(password, user.password);
    if(!isPasswordTrue) return res.render("login", {
        error : "Email or password incorrect!"
    });

    const token = createToken(user);

    res.cookie("token", token).redirect("/");
})

router.post("/signup", async(req,res) => {
    const {fullName , email , password} = req.body;
    if(!fullName || !email || !password) return res.redirect(400, "/user/signup");
    const hashedPwd = await bcrypt.hash(password , 12);
    await userModel.create({
        fullName ,
        email , 
        password : hashedPwd
    })
    res.redirect("/user/login");
})

module.exports = router;