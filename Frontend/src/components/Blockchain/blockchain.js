import { ethers } from "ethers"; // Import the whole module

// Replace with your contract details
const CONTRACT_ADDRESS = "0x1075afD24Ba1702050a2dD9e02C354D01A086148";
const CONTRACT_ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tradeId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "sellerEmail",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "buyerEmail",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "energyAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "TradeCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tradeId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "sellerEmail",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amountPaid",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "buyerEmail",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "refundAmount",
				"type": "uint256"
			}
		],
		"name": "TradeSettled",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "admin",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_sellerEmail",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_buyerEmail",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_energyAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_SellerEnergyWhileStartTransfer",
				"type": "uint256"
			}
		],
		"name": "storeTransaction",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tradeCounter",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "trades",
		"outputs": [
			{
				"internalType": "string",
				"name": "sellerEmail",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "buyerEmail",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "energyAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "transferredAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "SellerEnergyWhileStartTransfer",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "settled",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tradeId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_buyerEmail",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_sellerEmail",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "CurrentSellerEnergy",
				"type": "uint256"
			}
		],
		"name": "verifyAndSettle",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

let provider, signer, contract;

// Initialize blockchain connection
const initBlockchain = async () => {
  if (!window.ethereum) {
    alert("MetaMask not detected! Install MetaMask to continue.");
    return null;
  }

  try {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    provider = new ethers.BrowserProvider(window.ethereum); // Updated for v6
    signer = await provider.getSigner();
    contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    return contract;
  } catch (error) {
    console.error("MetaMask connection failed:", error);
    alert("Failed to connect wallet.");
    return null;
  }
};

// Store a new trade transaction
const storeTransaction = async (sellerEmail, buyerEmail, energyAmount, price, SellerEnergyWhileStartTransfer) => {
  if (!contract) contract = await initBlockchain();
  if (!contract) return;

  try {
    const tx = await contract.storeTransaction(
      sellerEmail,
      buyerEmail,
      energyAmount,
      ethers.parseUnits(price.toString(), "ether"), // Updated for v6
      SellerEnergyWhileStartTransfer,
      { value: ethers.parseUnits(price.toString(), "ether") }
    );
    await tx.wait();
    console.log("Transaction stored:", tx);
    alert("Transaction stored successfully!");
		return 1
  } catch (error) {
    console.error("Error storing transaction:", error);
    alert("Transaction failed. Check the console for details.");
		return 0;
  }
};

// Verify and settle a trade
const verifyAndSettle = async (tradeId, buyerEmail, sellerEmail, CurrentSellerEnergy) => {
  if (!contract) contract = await initBlockchain();
  if (!contract) return;

  try {
    const tx = await contract.verifyAndSettle(tradeId, buyerEmail, sellerEmail, CurrentSellerEnergy);
    await tx.wait();
    console.log("Trade settled:", tx);
    alert("Trade settled successfully!");
  } catch (error) {
    console.error("Error settling trade:", error);
    alert("Transaction failed. Check the console for details.");
  }
};

export { initBlockchain, storeTransaction, verifyAndSettle };