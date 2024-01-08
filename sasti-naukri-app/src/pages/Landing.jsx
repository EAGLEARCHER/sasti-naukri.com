import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
import { Link } from "react-router-dom";
export default function Landing() {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        {/* info */}
        <div className="info">
          <h1>
            Sasti <span>Naukri.com</span> app
          </h1>
          <p>
            Discover boundless career opportunities at SastiNaukri.com, where
            finding your dream job is simplified. With an extensive array of
            listings spanning diverse industries and experience levels, our
            intuitive search filters streamline your quest for the perfect role.
            Receive tailored job alerts, access our resume-building tools, and
            benefit from expert career advice all in one secure platform. Join
            us in shaping your professional future today with SastiNaukri.com.
          </p>
          <Link to="/register" className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
}
