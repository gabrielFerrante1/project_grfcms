export type History = {
    id: number;
    ip: string;
    banned: boolean;
    date: string;
}

export type ApiGetHistorys = {
    historys: History[]
}