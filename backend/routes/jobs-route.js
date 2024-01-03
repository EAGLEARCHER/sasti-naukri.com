const express = require("express");

const router = express.Router();

const {
  getAllJobs,
  getJob,
  editJob,
  deleteJob,
  createJob,
  showStats,
} = require("../controllers/jobs-controller");

router.route("/").get(getAllJobs).post(createJob);
router.route("/:id").get(getJob).delete(deleteJob).patch(editJob);
router.route("/stats").get(showStats);
module.exports = router;
