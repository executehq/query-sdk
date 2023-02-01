import fetch from "node-fetch";

export interface Config {
  suppressLogs?: boolean;
  apiHost?: string;
}

export interface Query {
  [key: string]: any;
}

class QueryClient {
  private apiKey: string;
  private config: Config;

  constructor(apiKey: string, config?: Config) {
    this.apiKey = apiKey;
    this.config = config || {};
  }

  private log(...args: any[]) {
    if (!this.config.suppressLogs) console.log(...args);
  }

  async query(data: Query): Promise<any[]> {
    const response = await fetch(
      `${
        this.config.apiHost ? this.config.apiHost : "https://query.execute.dev"
      }/query`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${this.apiKey}`,
        },
        body: JSON.stringify({
          query: data,
        }),
      }
    );

    if (!response.ok) {
      this.log("Query failed", {
        status: response.status,
        text: response.statusText,
        query: data,
        response: await response.json(),
      });
      return [];
    }

    return (await response.json()) as any[];
  }

  queryWithCallback(data: Query, callback: (data: any) => void) {
    this.query(data).then((res) => {
      callback(res);
    });
  }

  
}

export default QueryClient;
