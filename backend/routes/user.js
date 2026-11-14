const express = require("express");
const {
  getallLikes,
  register,
  login,
  getallBookmarks,
  uploadprofile,
  getUser,
  bookmark,
  deletebookmark,
  checkbookmark,
  reportcontent,
  followercount,
  followingcount,
  showbookmark,
  fetchprof,
  showmyposts,
  deletepost,
  fetchfollowing,
  follow,
  checkfollowing,
  unfollow,
  searchresult,
  changeabout,
  likes,
  checklikes,
  deletelikes,
  showLikemark,
} = require("../controllers/user");
const { authUser } = require("../middleware/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
// The client keeps the JWT in a cookie it clears itself; nothing to do server-side.
router.get("/logout", (req, res) => res.status(200).json({ success: true }));

router.put("/uploadprofile", authUser, uploadprofile);
router.get("/getUser/:userId", getUser);
router.post("/getallBookmarks", getallBookmarks);
router.post("/setbookmark", bookmark);
router.post("/setlikes", likes);
router.post("/getallLikes", getallLikes);
router.post("/deletelikes", deletelikes);
router.post("/checklikes", checklikes);
router.post("/deletebookmark", deletebookmark);
router.post("/checkbookmark", checkbookmark);
router.post("/reportcontent", reportcontent);
router.post("/countfollower", followercount);
router.post("/countfollowing", followingcount);
router.post("/showbookmarks", showbookmark);
router.post("/showLikemarks", showLikemark);
router.post("/fetchprof", fetchprof);
router.post("/showmyposts", showmyposts);
router.post("/deletepost", deletepost);
router.post("/fetchfollowing", fetchfollowing);
router.post("/startfollow", follow);
router.post("/unfollow", unfollow);
router.post("/searchresult", searchresult);
router.post("/checkfollow", checkfollowing);
router.post("/changeabout", changeabout);

module.exports = router;
