const router = require("express").Router();
const multer = require("multer");
const { blogModel } = require("../models/blog");
const commentModel = require("../models/comments");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
})

const upload = multer({ storage: storage })

router.get("/add-new", (req, res) => {
  res.render("addBlog", {
    user: req.user
  })
})

router.get("/:_id", async (req, res) => {
  const id = req.params._id;
  const blog = await blogModel.findOne({ _id: id }).populate("createdBy");
  const comment = await commentModel.find({ blog: req.params._id }).populate("createdBy");
  // automatically populates the createdBy with the user model properties.
  return res.render("blog", {
    blog,
    user: req.user,
    comment
  })
})

router.post("/comment/:blogId", async (req, res) => {
  await commentModel.create({
    content: req.body.content,
    createdBy: req.user.id,
    blog: req.params.blogId
  });
  return res.redirect(`/blog/${req.params.blogId}`);
})

router.post("/", upload.single("coverImg"), async (req, res) => {
  const { title, body } = req.body;
  await blogModel.create({
    title,
    body,
    createdBy: req.user.id,
    coverImg: `/uploads/${req.file.filename}`  // writing upload because it can know that images are in upload which is in public which is being ignored by express.static
  })
  return res.redirect("/");
})

module.exports = router;