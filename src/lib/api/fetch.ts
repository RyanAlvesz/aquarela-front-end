export async function fetchWrapper<T = unknown>(
    input: RequestInfo | URL,
    init?: RequestInit | undefined
) {
    const baseUrl: string = 'https://'
    const data: Response = await fetch(`${baseUrl}/${input}`, init)
    const result = await data.json()
    return result as T
}