export function withQueryParams(
  url: string,
  params: Record<string, string | number>
) {
  Object.entries(params).forEach(([key, value]) => {
    if (typeof value === 'number') {
      params[key] = value.toString()
    }
  })

  const queryParams = new URLSearchParams(
    params as Record<string, string>
  ).toString()

  if (!queryParams) return url

  return `${url}?${queryParams}`
}
