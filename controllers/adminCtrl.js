const Posts = require("../models/postModel");
const Users = require("../models/userModel");
const Comments = require("../models/commentModel");

const adminCtrl = {
  getTotalUsers: async (req, res) => {
    try {
      const total_users = await Users.countDocuments();
      res.json({ total_users });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getTotalPosts: async (req, res) => {
    try {
      const total_posts = await Posts.countDocuments();
      res.json({ total_posts });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getTotalComments: async (req, res) => {
    try {
      const total_comments = await Comments.countDocuments();
      res.json({ total_comments });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getTotalLikes: async (req, res) => {
    try {
      const result = await Posts.aggregate([
        {
          $group: {
            _id: null,
            total_likes: { $sum: { $size: { $ifNull: ["$likes", []] } } }
          }
        }
      ]);
      const total_likes = result.length > 0 ? result[0].total_likes : 0;
      res.json({ total_likes });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getTotalSpamPosts: async (req, res) => {
    try {
      const total_spam_posts = await Posts.countDocuments({
        $expr: { $gt: [{ $size: { $ifNull: ["$reports", []] } }, 2] }
      });
      res.json({ total_spam_posts });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getSpamPosts: async (req, res) => {
    try {
      const spamPosts = await Posts.find({
        $expr: { $gt: [{ $size: { $ifNull: ["$reports", []] } }, 1] }
      })
      .select("user createdAt reports content")
      .populate({ path: "user", select: "username avatar email" });
      
      res.json({ spamPosts });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteSpamPost: async (req, res) => {
    try {
      const post = await Posts.findOneAndDelete({
        _id: req.params.id,
      });

      if (post && post.comments && post.comments.length > 0) {
        await Comments.deleteMany({ _id: { $in: post.comments } });
      }

      res.json({ msg: "Post deleted successfully." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = adminCtrl;
