"use client";

import { Step } from "@/components/Step";
import { useState } from "react";

const Home = () => {
  const [value,setValue] = useState(0)
  return (
    <div className="container">
      <Step value={value} onChange={setValue}></Step>
      <div className="select-none">Mixer</div>
      <div>
        <div></div>
        <div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
