import { useState } from "react";

import Intro from "../Intro/Intro";
import About from "../About/About";
import Projects from "../Projects/Projects";
import Education from "../Education/Education";

export default function Main() {
  // const [activeSection, setActiveSection] = useState("intro");

  return (
    <main>
      <Intro />
      <About />
      <Projects />
      <Education />
      {/* <Nav></Nav> */}
    </main>
  );
}
