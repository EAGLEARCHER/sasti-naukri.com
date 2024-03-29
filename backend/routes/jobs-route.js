const express = require("express");
const testUser = require("../middleware/testUser");

const router = express.Router();
const {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  getJob,
  showStats,
  updateApplyers,
} = require("../controllers/jobs-controller");

router.route("/").post(testUser, createJob).get(getAllJobs);
router.route("/stats").get(showStats);
router.patch("/applyJob", updateApplyers);
router
  .route("/:id")
  .get(getJob)
  .delete(testUser, deleteJob)
  .patch(testUser, updateJob);

module.exports = router;
