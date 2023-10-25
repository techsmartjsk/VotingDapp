export interface PollStruct {
    id: number;
    image: string;
    title: string;
    description: string;
    votes: number;
    contestants: number;
    deleted: boolean;
    director: string;
    startsAt: number;
    endsAt: number;
    timestamp: number;
    voters: string[];
    avatars: string[];
}
