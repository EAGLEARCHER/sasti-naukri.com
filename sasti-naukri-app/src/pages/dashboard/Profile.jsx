import { useEffect, useState } from "react";
import { FormRow } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { deleteAccount, updateUser } from "../../features/user/userSlice";
import { useNavigate } from "react-router";

function Profile() {
  const { isLoading, user, accountDeleted } = useSelector(
    (store) => store.user
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    userId: user.userId,
    name: user?.name || "",
    email: user?.email || "",
    lastName: user?.lastName || "",
    location: user?.location || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, lastName, location } = userData;
    if (!name || !email || !lastName || !location) {
      toast.error("please fill out all fields");
      return;
    }
    dispatch(updateUser(userData));
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };
  const handleDeleteAccount = (e) => {
    dispatch(deleteAccount({ userId: user.id }));
  };
  useEffect(() => {
    if (accountDeleted) {
      navigate("/landing", { replace: true });
    }
  }, [accountDeleted]);
  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>profile</h3>
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            value={userData.name}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            labelText="last name"
            name="lastName"
            value={userData.lastName}
            handleChange={handleChange}
          />
          <FormRow
            type="email"
            name="email"
            value={userData.email}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="location"
            value={userData.location}
            handleChange={handleChange}
          />
          <button type="submit" className="btn btn-block" disabled={isLoading}>
            {isLoading ? "Please Wait..." : "save changes"}
          </button>
        </div>
      </form>

      <Popup
        trigger={
          <button className="btn btn-danger" style={{ marginTop: "2%" }}>
            delete Account
          </button>
        }
        modal
        nested
      >
        {(close) => (
          <div className="modal">
            <div className="content">
              You Really want to delete your account
            </div>
            <div>
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteAccount()}
              >
                Yes
              </button>
              <button className="btn btn-hipster" onClick={() => close()}>
                No
              </button>
            </div>
          </div>
        )}
      </Popup>
    </Wrapper>
  );
}
export default Profile;
