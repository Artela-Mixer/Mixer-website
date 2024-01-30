const API_IP = "http://5u6b4t.natappfree.cc";
export class Request {
  public static get(api: string, data: any = null): any {
    return this.request("GET", api, data);
  }
  public static post(api: string, data: any = null): any {
    return this.request("POST", api, data);
  }
  public static put(api: string, data: any = null): any {
    return this.request("PUT", api, data);
  }
  public static delete(api: string, data: any = null): any {
    return this.request("DELETE", api, data);
  }
  public static options(api: string, data: any = null): any {
    return this.request("OPTIONS", api, data);
  }
  public static patch(api: string, data: any = null): any {
    return this.request("PATCH", api, data);
  }

  private static async request(method: string, api: string, data: any = null) {
    // const url = ;
    const apiUrl = new URL(`${API_IP}${api}`);

    const options = {
      method,
      mode: "cors",
      headers: {
        "Content-Type": "application/json", // 根据需要设置合适的 Content-Type
      },
    } as RequestInit;

    if (method !== "GET" && data) {
      options.body = JSON.stringify(data);
    } else if (data && Object.keys(data)?.length > 0) {
      Object.keys(data).forEach((key) => {
        apiUrl.searchParams.append(key, data[key]);
      });
    }
    try {
      const response = await fetch(apiUrl.toString(), options);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // 根据实际需要，这里可以根据响应的 Content-Type 来解析数据
      const responseData = await response.json();

      return responseData;
    } catch (error) {
      console.error("Error during fetch:", error.message);
      throw error;
    }
  }
}
