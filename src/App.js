import logo from "./logo.svg";
import "./App.css";
import React, { useEffect } from "react";
function App() {
  useEffect(() => {
    const loadProvicer = async () => {
      console.log(window.web3);
      console.log(window?.ethereum);

      // console.log(window>.ethereum.target);
    };

    return () => {
      loadProvicer();
    };
  }, []);

  return (
    <div className="App">
      <div className="card">
        <div className="card-body">Funding</div>
      </div>{" "}
      <div className="card">
        <div className="card-body">Balance:20ETH</div>
      </div>{" "}
      <div className="card">
        <div className="card-body">Account:0000x0000</div>
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
