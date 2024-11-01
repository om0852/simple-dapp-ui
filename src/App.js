import React, { useEffect, useState } from "react";
import Web3 from "web3";
import contractABI from "../src/contract_app/Funder.json";
import detectEthereumProvider from "@metamask/detect-provider";
import "./App.css";

function App() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
    contract: null,
  });
  const loadProvider = async () => {
    try {
      
      const provider = await detectEthereumProvider();
      if (provider) {
        const web3 = new Web3(provider);
      console.log(web3);
      const contract = new web3.eth.Contract(
        contractABI,
        "0x921CD0f089F7Ddf3bf6d2E0B5bf5bf7fB2a04e9e"
      );
      setWeb3Api({
        provider,
        web3,
        contract,
      });
      
      // Request account access if needed
      await provider.request({ method: "eth_requestAccounts" });
    } else {
      alert("Please install MetaMask!");
    }
  } catch (error) {
    
  }
  };
  useEffect(() => {
    
    loadProvider();
  }, []);

  useEffect(() => {
    const loadBalance = async () => {
      const { web3, contract } = web3Api;
      if (contract) {
        const balance = await web3.eth.getBalance(contract.options.address);
        setBalance(web3.utils.fromWei(balance, "ether"));
      }
    };
    if (web3Api.web3) loadBalance();
  }, [web3Api]);

  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3Api.web3.eth.getAccounts();
      setAccount(accounts[0]);
    };
    if (web3Api.web3) getAccount();
  }, [web3Api.web3]);

  const handleTransfer = async () => {
    try{

      if (web3Api.contract) {
        await web3Api.contract.methods
        .transfer()
        .send({
          from: account,
          value: web3Api.web3.utils.toWei("1", "ether"),
        });
      }
    }
    catch(error){

    }
  };

  const handleWithdraw = async () => {
    try {
      
      if (web3Api.contract) {
        await web3Api.contract.methods
        .withdraw(web3Api.web3.utils.toWei("0.5", "ether"))
        .send({ from: account });
      }
    } catch (error) {
      
    }
  };

  return (
    <div className="App">
      <div className="card">
        <div className="card-body">Funding</div>
      </div>
      <div className="card">
        <div className="card-body">
          Balance: {balance ? balance : "Loading..."} ETH
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          Account: {account ? account : "MetaMask not connected"}
        </div>
      </div>
      {!account && (
        <button type="button" className="btn btn-success" onClick={loadProvider}>
          Connect to MetaMask
        </button>
)}
      <button
        type="button"
        className="btn btn-success"
        onClick={handleTransfer}
      >
        Transfer
      </button>
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleWithdraw}
      >
        Withdraw
      </button>
    </div>
  );
}

export default App;
