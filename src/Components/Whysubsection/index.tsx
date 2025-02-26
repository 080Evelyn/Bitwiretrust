import "./styles.css";

type Props = {
  hidePreferenceSection?: boolean;
  containerClass?: string;
};

const WhysubSection = ({
  hidePreferenceSection = false, containerClass = "",}: Props) => {
  return (
    <>
      <div className={`why-section-content ${containerClass}`}>
        <div className="intro-section">
          <span className="subtitle">Why us</span>
          <h3 className="main-title">
            We offer secure, fast transactions, competitive rates, and
            exceptional customer service
          </h3>
          <p className="description">
            Made managing Users payments faster, safer, and so much more
            convenient!
          </p>
        </div>

        <div className="stats-grid">
          <div className="stat-item">
            <h3>100%</h3>
            <p>Transaction Success rates</p>
          </div>
          <div className="stat-item">
            <h3>2K</h3>
            <p>Users Daily</p>
          </div>
          <div className="stat-item">
            <h3>100%</h3>
            <p>Best Rates</p>
          </div>
        </div>

        {!hidePreferenceSection && (
          <div className="preference-section">
            <h4>Why they prefer Bitwire</h4>
            <p>See what makes use the the best for you</p>
          </div>
        )}
      </div>
    </>
  );
};

export default WhysubSection;
