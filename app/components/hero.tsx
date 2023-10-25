'use client'

import { useState, useEffect } from "react";
import { useEthereumContext } from "../context/context.eth";
import { ethers } from "ethers";
import abi from '../contracts/DappVotes.json';
import { PollStruct } from "../types/poll";
import Card from "./card";
import CreatePoll from "./create.poll";
import { toast } from "react-toastify";

const Hero = () => {
  const { connectedAccount, ethereum } = useEthereumContext();
  const [visible,setVisible] = useState(false);
  const [polls, setPolls] = useState<PollStruct[]>([]);
  const contractAddress = `${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`;
  const contractABI = abi.abi;

  const getPolls = async () => {
    try {
      if (ethereum && connectedAccount) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const pollsContract = new ethers.Contract(contractAddress, contractABI, signer);

        const polls = await pollsContract.getPolls();
        console.log('Retrieved polls...', polls);
        setPolls(polls);
      }
    } catch (error) {
      console.error('Error fetching polls:', error);
      toast.error("Could not fetch polls....")
    }
  }

  useEffect(() => {
    getPolls();
  }, [ethereum, connectedAccount]);

  return (
    <div className="mt-10 pl-28 pr-28">
      <div className="flex justify-between">
        <h1 className="text-xl">Polls</h1>
        {
            ethereum ? <button onClick={()=>{
                setVisible(true)
            }} className="bg-blue-400 p-2 text-white text-center rounded-full w-[120px]">Create Poll</button>
            :null
        }
      </div>
      <div className="flex gap-2 flex-wrap mt-10">
        {
            !ethereum ? <p className="font-bold">Wallet not connected!</p>:
            (
                polls.length > 0 ? polls.map((poll: PollStruct,index)=>{
                    return <div key={index}>
                        <Card {...poll} />
                    </div>
                }):<p>No Polls yet!</p>
            )
        }
      </div>
      {
        visible ? <CreatePoll visible={visible} setVisible={setVisible} />:null
      }
    </div>
  )
}

export default Hero;
