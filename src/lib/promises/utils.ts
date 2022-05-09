import { log } from "../debug/utils";
import { delay } from "../delays/utils";

export async function fetchWithTimeout (url: string, ms: number, { ...options } = {}) {
  const controller = new AbortController();
  delay(ms).then(() => {
    try {
      controller.abort();
    } catch (error) {
      log("fetchWithTimeout abort error", error);
    }
  });

  return fetch(url, { signal: controller.signal, ...options }).catch(() => null);
}
