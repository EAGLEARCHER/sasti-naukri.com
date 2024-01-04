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
router.route("/stats").get(showStats);
router.route("/:id").get(getJob).delete(deleteJob).patch(editJob);
module.exports = router;
