import Slide from "../Slide/Slide";
import type { SectionProps } from "../../types";

const Education: React.FC<SectionProps> = ({ active }) => {
  return (
    <Slide id="edu">
      <h2>My Education</h2>

      <p>Education content...</p>
    </Slide>
  );
};

export default Education;
