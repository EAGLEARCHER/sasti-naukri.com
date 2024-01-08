import { useEffect } from "react";
import { StatsContainer, Loading, ChartsContainer } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { showStats } from "../../features/allJobs/allJobsSlice";

function Stats() {
  //tbc
  const { isLoading, monthlyApplications } = useSelector(
    (store) => store.allJobs
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showStats());
  }, []);
  console.log(monthlyApplications);
  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 ? (
        <ChartsContainer />
      ) : (
        <p>Please add Job to see Statistics...</p>
      )}
    </>
  );
}
export default Stats;
