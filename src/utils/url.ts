export function getIdFromSWApiUrl(url: string) {
  return url
    .split('/')
    .filter((chunk) => !!chunk)
    .pop();
}
