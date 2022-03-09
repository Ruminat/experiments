const HOST = `http://127.0.0.1`;
const PORT = "5000";

function getApiPath(method: string): URL {
  const base = PORT ? `${HOST}:${PORT}` : HOST;
  return new URL(`${base}/${method}`);
}

type TUrlParams = string | string[][] | Record<string, string> | URLSearchParams;

export async function fetchGET<T>(method: string, options?: { urlParams?: TUrlParams }): Promise<T | Error> {
  const url = getApiPath(method);

  if (options?.urlParams) {
    url.search = new URLSearchParams(options?.urlParams).toString();
  }

  const response = await fetch(url.href);
  return await response.json();
}

export async function fetchPOST<T>(method: string): Promise<T | Error> {
  const url = getApiPath(method);
  const params: RequestInit = { method: "POST" };
  const response = await fetch(url.href, params);
  return await response.json();
}
