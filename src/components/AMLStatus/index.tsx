import { abi, contractAddress } from "@/server";
import { useEffect, useState } from "react";
import { useContractEvent } from "wagmi";

export const Status = () => {
  const [isPass, setIsPass] = useState("");

  useContractEvent({
    address: contractAddress,
    abi: abi,
    eventName: "VerifySucceed",
    listener(log) {
      setIsPass("yes");  
    },
  });

  useContractEvent({
    address: contractAddress,
    abi: abi,
    eventName: "VerifyFailed",
    listener(log) {
      setIsPass("false");
    },
  });

 

  return (
    <div className=" bg-slate-50 h-full p-5">
      <div>
        <p className="text-4xl">AML System:</p>
      </div>
      <div className="flex items-center justify-center h-full">
        {isPass === "" && <p className="text-6xl"></p>}
        {isPass === "yes" && <p className="text-6xl text-green-400">True</p>}
        {isPass === "false" && <p className="text-6xl text-red-400">Faild</p>}
      </div>
    </div>
  );
};
