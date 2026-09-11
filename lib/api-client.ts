export async function apiJson<T = unknown>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
  const response = await fetch(input, init);
  const text = await response.text();
  let data: any = null;
  if (text) { try { data = JSON.parse(text); } catch { data = { error: text }; } }
  if (!response.ok) throw new Error(data?.error || `Error HTTP ${response.status}`);
  return data as T;
}
