"use client";
import { Card } from "@/components/CardContainer";
import { Step } from "@/components/Step";
import { useEffect, useMemo, useRef, useState } from "react";
import { Irish_Grover } from "@next/font/google";
import { Timer } from "@/components/Timer";
import { Status } from "@/components/AMLStatus";
import { InputForm } from "@/components/InputForm";
import React from "react";
import { useStoreState } from "@/hooks/useStoreState";
import {
  useAccount,
  useConnect,
  useContractRead,
  useContractWrite,
  useWalletClient,
} from "wagmi";
import { abi } from "@/abi";
import { depositToContract } from "@/server/contract";
import { ethers } from "ethers";

const Irish = Irish_Grover({ weight: "400", subsets: ["latin"] });
const Store = React.createContext(null);

const Home = () => {
  const [value, setValue] = useState(0);
  const { address } = useAccount();

  useEffect(() => {
    console.log(typeof address, address, 111);
    if (!!address) {
      depositToContract();
    }
  }, [address]);
  return (
    <div className="container flex flex-col gap-10">
      <div className="select-none  flex justify-center">
        <p className={`${Irish.className}` + " text-8xl"}>Mixer</p>
      </div>
      {/* <div className="grid grid-cols-3 grid-flow-col gap-x-1 gap-y-8"> */}
      {/* <Card classNames="col-span-2 row-span-3 w-[100%] h-[595px]"> */}
      <div className="flex flex-row">
        <Card classNames="w-[50%] h-[595px]">
          <InputForm />
        </Card>
        <div className="flex pl-[20px] w-[50%] h-[595px] flex-col justify-between">
          {/* <Card classNames="w-[50%] h-[282px]"> */}
          <Card classNames="w-full h-[282px]">
            <Status />
          </Card>
          {/* <Card classNames="w-[50%] h-[282px]"> */}
          <Card classNames="w-full h-[282px]">
            <Timer />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default () => {
  const state = useStoreState();
  useEffect(() => {
    console.log("gbbbbbbbbb");
  }, []);
  return <Home></Home>;
};
