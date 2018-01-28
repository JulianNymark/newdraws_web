export interface Draw {
    name: string;
    ctime: Date;
}

export interface QueryParams {
    page: number;
    resultsPerPage: number;
    filter: string;
}

export interface Store {
    drawsAPI: string;
    drawsURL: string;
    queryParams: QueryParams;
    draws: Draw[];
}
