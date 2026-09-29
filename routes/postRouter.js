const router = require("express").Router();
const auth = require("../middleware/auth");
const postCtrl = require("../controllers/postCtrl");


router.use((req, res, next) => {
  console.log(`[POST ROUTER HIT]: Method=${req.method} | URL=${req.url}`);
  next();
});

router.route("/posts")
  .post(auth, postCtrl.createPost)
  .get((req, res, next) => {
    console.log("[POST ROUTER]: Reached GET /posts BEFORE auth middleware");
    next();
  }, auth, (req, res, next) => {
    console.log("[POST ROUTER]: Passed auth middleware successfully!");
    next();
  }, postCtrl.getPosts);

router.route("/post/:id")
  .get(auth, postCtrl.getPost)
  .patch(auth, postCtrl.updatePost)
  .delete(auth, postCtrl.deletePost);

router.patch("/post/:id/like", auth, postCtrl.likePost);
router.patch("/post/:id/unlike", auth, postCtrl.unLikePost);
router.patch("/post/:id/report", auth, postCtrl.reportPost);
router.get("/user_posts/:id", auth, postCtrl.getUserPosts);
router.get("/post_discover", auth, postCtrl.getPostDiscover);
router.patch("/savePost/:id", auth, postCtrl.savePost);
router.patch("/unSavePost/:id", auth, postCtrl.unSavePost);
router.get("/getSavePosts", auth, postCtrl.getSavePost);

module.exports = router;
