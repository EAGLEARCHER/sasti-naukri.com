const express = require("express");

const router = express.Router();

const {
  getAllJobs,
  getJob,
  editJob,
  deleteJob,
  createJob,
} = require("../controllers/jobs");

router.route("/").get(getAllJobs).post(createJob);
router.route("/:id").get(getJob).delete(deleteJob).patch(editJob);

module.exports = router;
