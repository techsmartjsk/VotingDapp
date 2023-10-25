'use client'

import Header from "@/app/components/header"
import { useEthereumContext } from "@/app/context/context.eth";
import { ethers } from "ethers";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import abi from '../../contracts/DappVotes.json'
import { PollStruct } from "@/app/types/poll";
import ContestCard from "@/app/components/contest.card";
import { ContestantStruct } from "@/app/types/contestant";
import ContestantCard from "@/app/components/contestant.card";

const Poll = ({ params }) =>{
    const [contestants, setContestants] = useState<ContestantStruct[]>([])
    const [pollId,setPollId] = useState(0)
    const [visible, setVisible] = useState(false)
    const { ethereum, connectedAccount } = useEthereumContext();
    const [title, setTitle] = useState('Title')
    const [description,setDescription] = useState('Description')
    useEffect(()=>{
        fetchPollDetails();
    },[ethereum,connectedAccount])

    const fetchPollDetails = async ()=>{
        try{
            if(ethereum && connectedAccount){
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const contractAddress = `${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`;
                const contractABI = abi.abi;
                const pollId = params.id;
                setPollId(pollId)
                const contract = new ethers.Contract(contractAddress,contractABI, signer);

                const poll: PollStruct = await contract.getPoll(pollId);
                const contestants = await contract.getContestants(pollId);
                
                setTitle(poll.title);
                setDescription(poll.description);
                setContestants(contestants);
            }
        }catch(error){
            console.log("Error retrieving poll", error)
        }
    }

    return <div>
        <Header/>
        <div className="px-28 mt-20">
            {
            ethereum ? 
                (<div className="mt-10">
                    <h1 className="text-2xl font-bold">{title}</h1>
                    <h2 className="text-xl">{description}</h2>
                    <button onClick={()=>{
                        setVisible(!visible);
                    }} className="bg-blue-400 mt-5 text-white rounded-full px-5 p-2">Contest</button>
                </div>):
                <p>Wallet not Connected!</p>
            }
        </div>

        <div className="px-28 flex gap-2 flex-wrap">
            {
                contestants.length > 0 ? (
                    contestants.map((contestant: ContestantStruct, index)=>{
                        return <div key={index}>
                            <ContestantCard contestant={contestant} pollId={pollId}/>
                        </div>
                    })
                ):null
            }
        </div>
        {
            visible ? <ContestCard pollId={pollId} visible={visible} setVisible={setVisible}/>:
            null
        }
    </div>
}

export default Poll