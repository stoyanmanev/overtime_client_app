import { Cookies } from "react-cookie";

export const fetchData = <TData, TVariables>(query: string, variables?: TVariables, parsedToken?: string): (() => Promise<TData>) => {
  
  interface LooseObject {
    [key: string]: any
  }

  const cookies = new Cookies();
  const token = cookies.get('token') ? cookies.get('token') : parsedToken ?? '';

  return async () => {

    const headers:LooseObject = {
      'Content-Type': 'application/json',
    }
    if(token) {
      headers['Authorization'] = `Bearer ${token}`
    }

      const res = await fetch('https://overtime--api.herokuapp.com/graphql', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          query,
          variables,
        }),
      });
  
      const json = await res.json();
  
      if (json.errors) {
        const { message } = json.errors[0] || 'Error..';
        throw new Error(message);
      }
  
      return json.data;
    };
  };