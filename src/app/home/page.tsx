"use client";

import { Card } from "@/components/CardContainer";
import { Step } from "@/components/Step";
import { useState } from "react";
import { Irish_Grover, } from '@next/font/google';
import { Timer } from "@/components/Timer";
import { Status } from "@/components/AMLStatus";
import { InputForm } from "@/components/InputForm";

const Irish = Irish_Grover({ weight:"400",subsets:['latin']})

const Home = () => {
  const [value, setValue] = useState(0);
  return (
    <div className="container flex flex-col gap-10">
      
      <div className="select-none text-blue-400 flex justify-center">
        <p className={`${Irish.className}` + " text-8xl"}>Mixer</p>
      </div>
      <div className="grid grid-cols-3 grid-flow-col gap-x-1 gap-y-8">
        <Card classNames="col-span-2 row-span-3 w-[627px] h-[595px]">
          <InputForm/>
        </Card>
        <Card classNames="w-[627px] h-[282px]">
          <Status/>
        </Card>
        <Card classNames="w-[627px] h-[282px]">
          <Timer/>
        </Card>
      </div>
    </div>
  );
};

export default Home;
