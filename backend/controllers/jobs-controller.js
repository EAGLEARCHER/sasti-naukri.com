const mongoose = require("mongoose");
const Job = require("../models/Job");
const moment = require("moment");
const { StatusCodes } = require("http-status-codes");
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
const showStats = async (req, res) => {
  // res.json({msg:"all stats..."});
  let stats = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);
  console.log(stats);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});
  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };
  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.Id) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);
  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};

module.exports = {
  showStats,
  getAllJobs,
  createJob,
  getJob,
  editJob,
  deleteJob,
};
