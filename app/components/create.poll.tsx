'use client'

import { useState } from "react";
import { useEthereumContext } from "../context/context.eth";
import { ethers } from "ethers";
import abi from '../contracts/DappVotes.json';

interface CreatePollProps {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreatePoll = ({
    visible, setVisible
}: CreatePollProps) => {
  const { ethereum } = useEthereumContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [startsAt, setStartsAt] = useState("");
  const [endsAt, setEndsAt] = useState("");

  const contractAddress = `${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`;
  const contractABI = abi.abi;

  const handleCreatePoll = async (e) => {
    e.preventDefault();
    if (ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        
        const startsAtString = startsAt.toString();
        const startsAtInt = Date.parse(startsAtString);

        const endsAtString = endsAt.toString();
        const endsAtInt = Date.parse(endsAtString);

        const tx = await contract.createPoll(image, title, description, startsAtInt, endsAtInt);
        await tx.wait();
        toast.success("Successfully created the poll")
      } catch (error) {
        console.error("Error creating poll:", error);
        toast.error("Failed, try again!")
      }
    }
  };

  return (
    <div className="w-full">
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white border-[1px] border-gray-500 w-[500px] rounded-md p-5">
          <h1 className="text-xl text-center font-semibold">Create Poll</h1>
          <form onSubmit={handleCreatePoll} className="flex flex-col gap-5 mt-10">
            <input
              type="text"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-2 mt-2 border-[1px] border-gray-500 rounded-full w-full"
            />
            <input
              type="text"
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-2 mt-2 border-[1px] border-gray-500 rounded-full w-full"
            />
            <input
              type="text"
              placeholder="Enter Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="p-2 mt-2 border-[1px] border-gray-500 rounded-full w-full"
            />
            <input
              type="datetime-local"
              placeholder="Start Date (timestamp)"
              value={startsAt}
              onChange={(e) => setStartsAt(e.target.value)}
              className="p-2 mt-2 border-[1px] border-gray-500 rounded-full w-full"
            />
            <input
              type="datetime-local"
              placeholder="End Date (timestamp)"
              value={endsAt}
              onChange={(e) => setEndsAt(e.target.value)}
              className="p-2 mt-2 border-[1px] border-gray-500 rounded-full w-full"
            />
            <div className="flex flex-row gap-2">
                <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
                >
                Create Poll
                </button>
                <button
                type="button"
                onClick={()=>{
                    setVisible(!visible);
                }}
                className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                >
                Cancel
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePoll;
