import { ethers ,sha256} from "ethers";
import MerkleTree from "merkletreejs";

// 设置智能合约地址
const contractAddress = "0xd3F51f2Dff074a6A49e64B38b3946E91f677965b";

// 实例化智能合约
const abi = [
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_root",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "root",
        type: "bytes32",
      },
    ],
    name: "RootUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Withdrawal",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes32[]",
        name: "proof",
        type: "bytes32[]",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "deposits",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRoot",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isOwner",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "is_verified",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_root",
        type: "bytes32",
      },
    ],
    name: "setRoot",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32[]",
        name: "proof",
        type: "bytes32[]",
      },
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "verify",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
// 合约生成
// const contract = new ethers.Contract(contractAddress, abi, senderWallet);
let contract = new ethers.Contract(contractAddress, abi, {});

// 我的理解，每次首先需要将所有地址传进来（参考实现），import生成一个根， 然后合约交互更新一次。
export async function setRoot() {
  try {
    const response = await fetch("http://yiwokan.com:24128/whitelist/import", {
      method: "POST",
      body: JSON.stringify({
        addr: [
          "0x4Cfa91a4061a4438EC6F8fBcFe207897856504A9",
          "0x8953dfbd3F3cB19b77E71DdF1179FEDf12EF20F0",
        ],
      }),
      headers: { "Content-Type": "application/json", accept: "*/*" },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      const root = data.data.root;

      console.log("import root : ", root);

      const b_result = await contract.getRoot();
      console.log("before setRoot:", b_result);
      const w_result = await contract.setRoot(root);
      await w_result.wait();
      console.log("finish setRoot");
      const a_result = await contract.getRoot();
      console.log("after setRoot:", a_result);
    } else {
      console.error("Fetch request failed");
    }
  } catch (error) {
    console.error("Error setRoot", error);
  }
}
// 存钱，可以参考我写的交互。
async function deposit() {
  try {
    // 发送以太币到智能合约
    const amountToSend = ethers.parseEther("0.1"); // 转账金额，这里是 0.1 ETH
    const root = await contract.getRoot();
    console.log("deposit getRoot : ", root);
    const sender = "0x4Cfa91a4061a4438EC6F8fBcFe207897856504A9";
    const response = await fetch("http://yiwokan.com:24128/whitelist/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
      },
      body: JSON.stringify({
        addr: sender,
        root: root,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("data", data);
      const roots = data.data;
      if (Array.isArray(roots)) {
        const leave = roots[0]; // 取第一个叶子
        const leaves = roots.map((x) => sha256(x));
        const tree = new MerkleTree(leaves, sha256);
        const leaf = sha256(leave);
        const proof = tree.getProof(leaf);
        const tx = await contract.deposit(proof, { value: amountToSend });
        await tx.wait();
        console.log("Deposit success");
      } else {
        throw new Error("roots not founed");
      }
    } else {
      console.error("fetch fauild");
    }
  } catch (error) {
    console.log("deposit Error", error);
  }
}