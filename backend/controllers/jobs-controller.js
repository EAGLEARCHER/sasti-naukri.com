const getAllJobs = async (req, res) => {
  res.send("get all job successfull....");
};

const getJob = async (req, res) => {
  res.send("get job  sucessfull....");
};

const editJob = async (req, res) => {
  res.send("edit job successfull....");
};

const deleteJob = async (req, res) => {
  res.send("delete job sucessfull....");
};
const createJob = async (req, res) => {
  res.json(req.user);
};
const getAllStats = async (req, res) => {
  res.json({msg:"all stats..."});
};

module.exports = {
  getAllStats,
  getAllJobs,
  createJob,
  getJob,
  editJob,
  deleteJob,
};
