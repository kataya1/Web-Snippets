import { default as Slide } from "../Slide/Slide";
import type { SectionProps } from "../../types";

const Intro: React.FC<SectionProps> = ({ active }) => {
  return (
    <Slide id="intro">
      <h1>Hello!</h1>
      <p>My intro content...</p>
      {active && "active"}
    </Slide>
  );
};

export default Intro;
