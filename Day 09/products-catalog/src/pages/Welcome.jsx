import Hero from "../components/Hero";

const Welcome = ({ onExplore }) => {
  return (
    <div className="page">
      <Hero onExplore={onExplore} />
    </div>
  );
};

export default Welcome;