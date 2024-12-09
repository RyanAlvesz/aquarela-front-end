export async function fetchWrapper<T = unknown>(
    input: RequestInfo | URL,
    init?: RequestInit | undefined
) {
    // const baseUrl: string = 'http://localhost:8080'
    const baseUrl: string = 'https://aquarela-nt8n.onrender.com'
    const data: Response = await fetch(`${baseUrl}/${input}`, init)
    const result = await data.json()
    return result as T
}