import { Project } from "./types";

export const BASE_URL = "https://www.getfluid.co";

type ClientParams = { clientId: string };
class Client {
  private clientId = "";

  constructor({ clientId }: ClientParams) {
    this.clientId = clientId;
  }

  async getProject(params: QueryParams) {
    const res = await fetch(
      `${BASE_URL}/api/project/${params?.id}?clientId=${this.clientId}`
    );

    return res.json() as Promise<Project>;
  }
}

type QueryParams = { id?: string };

export default Client;
