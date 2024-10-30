import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import Web3 from "web3";
function App() {
  const [account, setAccount] = useState(null);
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
  });
  useEffect(() => {
    const loadProvicer = async () => {
      console.log(window.web3);
      console.log(window?.ethereum);

      let provider = null;
      if (window.ethereum) {
        provider = window.ethereum;
        try {
          await provider.enable();
        } catch (error) {
          console.log("User is not allowed");
        }
      } else if (window.web3) {
        provider = window.web3.currentProvider;
      } else if (!process.env.production) {
        provider = new Web3.providers.HttpProvider("http://localhost:7545");
      }

      setWeb3Api({ provider: provider, web3: new Web3(provider) });
      // console.log(window>.ethereum.target);
    };

    return () => {
      loadProvicer();
    };
  }, []);

  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3Api.web3.eth.getAccounts();
      // console.log(accounts)
      setAccount(accounts[0]);
    };

    web3Api.web3 && getAccount();
  }, [web3Api.web3]);
  // console.log(web3Api);
  return (
    <div className="App">
      <div className="card">
        <div className="card-body">Funding</div>
      </div>{" "}
      <div className="card">
        <div className="card-body">Balance:20ETH</div>
      </div>{" "}
      <div className="card">
        <div className="card-body">Account:{account ? account :"Metamask not connected"}</div>
      </div>{" "}
      <button
        type="button"
        onClick={async () => {
          const accounts = await window?.ethereum.request({
            method: "eth_requestAccounts",
          });
          console.log(accounts[0]);
        }}
        className="btn btn-success"
      >
        Connect to metamask
      </button>
      <button type="button" className="btn btn-success">
        Transfer
      </button>
      <button type="button" className="btn btn-primary">
        Withdraw
      </button>
    </div>
  );
}

export default App;
