import Image from "next/image"
import { ContestantStruct } from "../types/contestant";
import { useEthereumContext } from "../context/context.eth";
import { ethers } from "ethers";
import abi from '../contracts/DappVotes.json'
import { toast } from "react-toastify";

const ContestantCard: React.FC<{
    contestant: ContestantStruct,
    pollId: Number
}> = ({
    contestant,
    pollId
}) =>{
    const isImageValid = /\.(jpg|jpeg|png|gif|svg)$/i.test(contestant.image);
    const image = isImageValid ? contestant.image : "/images/ballot.svg";
    const { ethereum, connectedAccount } = useEthereumContext();
    const handleVote = async (contestantId: Number) =>{
        if(ethereum && connectedAccount){
            try{
                const provider = new ethers.providers.Web3Provider(ethereum)
                const signer = provider.getSigner();
                const contractAddress = `${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`;
                const contractABI = abi.abi

                const contract = new ethers.Contract(contractAddress, contractABI, signer)
                const tx = await contract.vote(pollId,contestantId)
                await tx.wait();
                toast.success("Vote Successfully Captured")
            }catch(error){
                console.log('Cannot be voted', error)
                toast.error("Error, Try Again!")
            }
        }
    }


    return <div className="rounded-md border-[1px] mt-10 border-grey-500 h-[400px]">
        <Image src={image} width={300} height={225} alt={contestant.name} className="border-b-[1px] object-cover h-[225px] w-[300px] rounded-t-md border-grey-500"></Image>
        <div className="p-5">
            <div>
                <p>{contestant.name}</p>
                <p>{contestant.voter.slice(0,4)}...{contestant.voter.slice(-5,-1)}</p>
            </div>
            <div className="mt-2">
                <p className="font-bold">Total Votes : {contestant.votes.toNumber()}</p>
                <button onClick={()=>{
                    handleVote(contestant.id)
                }} className="bg-blue-400 p-1 mt-5 px-5 text-white text-center rounded-full w-[80px]">Vote</button>
            </div>
        </div>
    </div>
}

export default ContestantCard