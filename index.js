const express = require("express");
const  connection  = require("./db/connection");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const {blogModel} = require("./models/blog");
const { checkForAuthenticationCookie } = require("./middleware/authentication");
const path = require("path");
const app = express();

const PORT = 5000;

connection();
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser());
app.use(express.static(path.resolve("./public")));
app.use(checkForAuthenticationCookie('token'))

app.get("/", async(req,res)=> {
    const blogs = await blogModel.find({});
    res.render("home", {
        user : req.user,
        blogs : blogs
    });
} )
app.use("/user", userRoute);
app.use("/blog", blogRoute);


app.listen(PORT, () => {
    console.log(`The server is running on PORT ${PORT}`);
})