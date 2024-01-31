import { useState } from "react";

export const useStoreState = () => {
  const [address, setAddress] = useState();
  const [amount, setAmount] = useState(1);

  return { address, setAddress, amount, setAmount };
};
