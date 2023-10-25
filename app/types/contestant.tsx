import { BigNumber } from "ethers";

export interface ContestantStruct{
    id: number;
    image: string;
    name: string;
    voter: string;
    votes: BigNumber;
    voters: string[];
}