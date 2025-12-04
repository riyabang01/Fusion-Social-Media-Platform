const router = require("express").Router();
const auth = require("../middleware/auth");
const postCtrl = require("../controllers/postCtrl");

// Posts routes
router.route("/posts")
  .post(auth, postCtrl.createPost) // Create a post
  .get(auth, postCtrl.getPosts);   // Get all posts

// Single post routes
router.route("/post/:id")
  .get(auth, postCtrl.getPost)        // Get a single post by id
  .patch(auth, postCtrl.updatePost)   // Update a post
  .delete(auth, postCtrl.deletePost); // Delete a post

// Like/Unlike a post
router.patch("/post/:id/like", auth, postCtrl.likePost);
router.patch("/post/:id/unlike", auth, postCtrl.unLikePost);

// Report a post
router.patch("/post/:id/report", auth, postCtrl.reportPost);

// User specific posts
router.get("/user_posts/:id", auth, postCtrl.getUserPosts);

// Discover posts
router.get("/post_discover", auth, postCtrl.getPostDiscover);

// Save / Unsave posts
router.patch("/savePost/:id", auth, postCtrl.savePost);
router.patch("/unSavePost/:id", auth, postCtrl.unSavePost);

// Get all saved posts
router.get("/getSavePosts", auth, postCtrl.getSavePost);

module.exports = router;
