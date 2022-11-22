import { Project } from "./types";
export declare const BASE_URL = "https://getfluid.co";
type ClientParams = {
    clientId: string;
};
declare class Client {
    private clientId;
    constructor({ clientId }: ClientParams);
    getProject(params: QueryParams): Promise<Project>;
}
type QueryParams = {
    id?: string;
};
export default Client;
