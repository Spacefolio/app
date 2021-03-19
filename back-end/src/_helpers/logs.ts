import { DEBUG } from "./config";

export function debug(message?: any, ...optionalParams: any[]): void
{
  if (!DEBUG) return;
  console.debug(message);
}