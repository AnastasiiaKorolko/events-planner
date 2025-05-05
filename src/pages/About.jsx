import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ImageScroller } from "../components/ImageScroller";
import StepTimeline from "../components/StepTimeLine";
import './About.scss';

const About = () => {
  // const navigate = useNavigate();
  return (
    <div className="container">
      <h2 className="hero-title">Plan your moments</h2>
      <ImageScroller />
      <section className="hero-section">
        <ul className="hero-list">
          <li className="hero-list__item">Relax with friends or enjoy some time alone</li>
          <li className="hero-list__item">Schedule meaningful meetups</li>
          <li className="hero-list__item">Conquer new heights</li>
        </ul>
      </section>
<h1>We are create a plarform for your comfort planning event</h1>
      <ImageScroller />

      <StepTimeline />

      <p>Join to our community</p>
      <Link to={'/register'}>Go</Link>
    </div>
  )
}

export default About;