import Image from "next/image"
import { PollStruct } from "../types/poll"

const Card: React.FC<PollStruct> = (props) =>{
    const isImageValid = /\.(jpg|jpeg|png|gif|svg)$/i.test(props.image);
    const image = isImageValid ? props.image : "/images/ballot.svg";

    return <div className="rounded-md border-[1px] border-grey-500 h-[350px]">
        <Image src={image} width={300} height={225} alt={props.description} className="border-b-[1px] object-cover h-[225px] rounded-t-md border-grey-500"></Image>
        <div className="p-5">
            <div>
                <p>{props.title}</p>
                <p>{props.description}</p>
            </div>
            <div className="mt-2">
                <a href={`/contest/${props.id}`} className="bg-blue-400 p-1 text-white text-center rounded-full w-[80px]">Enter</a>
            </div>
        </div>
    </div>
}

export default Card