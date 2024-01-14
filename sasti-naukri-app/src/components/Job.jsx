import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Job";
import { useDispatch, useSelector } from "react-redux";
import JobInfo from "./JobInfo";
import moment from "moment";
import { applyJob, deleteJob, setEditJob } from "../features/job/jobSlice";
import { getUserFromLocalStorage } from "../utils/localStorage";
import { toast } from "react-toastify";
function Job({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  createdAt,
  status,
  isOwner,
  createdBy,
}) {
  const dispatch = useDispatch();
  const date = moment(createdAt).format("MMM Do, YYYY");
  const userData = getUserFromLocalStorage();
  const handleApplication = (e) => {
    const applicationData = {
      recruiterId: createdBy,
      userId: userData.id,
    };
    if (!createdBy || !userData.id) {
      toast.error("Not provided all Details....");
    } else {
      dispatch(applyJob({ applicationData }));
    }
  };
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        {isOwner ? (
          <footer>
            <div className="actions">
              <Link
                to="/add-job"
                className="btn edit-btn"
                onClick={() =>
                  dispatch(
                    setEditJob({
                      editJobId: _id,
                      position,
                      company,
                      jobLocation,
                      jobType,
                      status,
                    })
                  )
                }
              >
                Edit
              </Link>
              <button
                type="button"
                className="btn delete-btn"
                onClick={() => dispatch(deleteJob(_id))}
              >
                delete
              </button>
            </div>
          </footer>
        ) : (
          <>
            <button
              type="button"
              className="btn edit-btn"
              onClick={() => handleApplication()}
            >
              apply
            </button>
          </>
        )}
      </div>
    </Wrapper>
  );
}
export default Job;
