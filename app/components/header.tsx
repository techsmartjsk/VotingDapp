'use client'

import { useEffect } from "react";
import { useEthereumContext } from "../context/context.eth";
import { toast } from "react-toastify";

declare var window: any

const Header: React.FC = () => {
  const { setConnectedAccount, connectedAccount, setEthereum, ethereum } = useEthereumContext()
  const handleAccounts = (accounts: string[]) => {
    if (accounts.length > 0) {
      const account = accounts[0];
      console.log('We have an authorized account: ', account);
      setConnectedAccount(account);
      toast.success("Successfully Connected!")
    } else {
      console.log("No authorized accounts yet");
    }
  };


  const connectAccount = async () => {
    if (window.ethereum) {
        setEthereum(window.ethereum);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        handleAccounts(accounts);
    }
  };



  return (
    <div className="flex justify-between items-center shadow-sm pl-28 pr-28 p-5">
      <h1 className='text-xl'>VOTE</h1>
      {
        connectedAccount === '' ? 
        <button onClick={connectAccount} className="rounded-full bg-blue-400 text-white pl-5 pr-5 p-2 text-md">Connect Wallet</button> :
        <p className='text-xl border-1 rounded-md p-2'> Connected Address : {connectedAccount?.slice(0, 5)}</p>
      }
    </div>
  );
};

export default Header;
