const router = require("express").Router();
const multer = require("multer");
const { blogModel } = require("../models/blog");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  })
  
const upload = multer({ storage: storage })

router.get("/add-new", (req,res) => {
    res.render("addBlog", {
        user : req.user
    })
})

router.post("/", upload.single("coverImg"),  async(req,res) => {
    const {title , body} = req.body;
    await blogModel.create({
        title , 
        body , 
        createdBy : req.user.id,
        coverImg : `/uploads/${req.file.filename}`  // writing upload because it can know that images are in upload which is in public which is being ignored by express.static
    })
    console.log(req.body);
    console.log(req.file);
    return res.redirect("/");
})

module.exports = router;