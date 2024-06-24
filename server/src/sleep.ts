export default function sleep(ms = 500): Promise<void> {
  return new Promise((res) => setTimeout(res, ms));
}
