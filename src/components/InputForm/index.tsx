import { useState } from "react";
import { Step } from "../Step";
import { useAccount } from "wagmi";
import { deposit } from "@/server/contract";

const items = [
  { value: "0.1", label: "0.1ETH" },
  { value: "0.5", label: "0.5ETH" },
  { value: "1", label: "1ETH" },
  { value: "5", label: "5ETH" },
];

export const InputForm = () => {
  const [amount, setAmount] = useState("0.1");
  const { address: addressText , isConnected} = useAccount();
  const onClick = () => {
    deposit(addressText, amount);
  };
  return (
    <div className=" bg-slate-50 h-full">
      <div className="h-full flex flex-col justify-around p-5">
        <div style={{ borderBottom: "1px solid black" }}></div>
        <div className="flex flex-col p-4 gap-10">
          <div>
            <p>Address:</p>
            <input
              value={(isConnected && addressText) ? addressText : '' }
              disabled={true}
              className="border rounded text-5xl h-[76px] w-full transition-all focus:border-black outline-none p-5"
            ></input>
          </div>
          <div></div>
          <div>
            <p>Amount:</p>
            <Step value={amount} onChange={setAmount} items={items}></Step>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={onClick}
            disabled={isConnected}
            className="border border-gray hover:bg-gray-300 hover:border-black transition-all w-4/6 p-2 text-2xl rounded border-black"
          >
            <p className="text-4xl">Despoit</p>
          </button>
        </div>
      </div>
    </div>
  );
};
