import type { Random } from "../types.js";
import { generateDateTime, generateDate, generateTime } from "./date-time.js";
import { generateEmail } from "./email.js";
import { generateUri } from "./uri.js";
import { generateHostname } from "./hostname.js";
import { generateIpv4, generateIpv6 } from "./ip.js";
import { generateUuid } from "./uuid.js";
import { generateJsonPointer } from "./json-pointer.js";
import { generateDuration } from "./duration.js";

export type FormatGenerator = (random: Random) => string;

const builtinFormats: Map<string, FormatGenerator> = new Map([
  ["date-time", generateDateTime],
  ["date", generateDate],
  ["time", generateTime],
  ["duration", generateDuration],
  ["email", generateEmail],
  ["idn-email", generateEmail],
  ["uri", generateUri],
  ["uri-reference", generateUri],
  ["iri", generateUri],
  ["iri-reference", generateUri],
  ["hostname", generateHostname],
  ["idn-hostname", generateHostname],
  ["ipv4", generateIpv4],
  ["ipv6", generateIpv6],
  ["uuid", generateUuid],
  ["json-pointer", generateJsonPointer],
  ["relative-json-pointer", (random: Random) => `${random.int(0, 5)}${generateJsonPointer(random)}`],
]);

export function createFormatRegistry(
  userFormats?: Record<string, FormatGenerator>
): Map<string, FormatGenerator> {
  const registry = new Map(builtinFormats);
  if (userFormats) {
    for (const [name, gen] of Object.entries(userFormats)) {
      registry.set(name, gen);
    }
  }
  return registry;
}

export function registerFormatGlobal(
  name: string,
  generator: FormatGenerator,
  registry: Map<string, FormatGenerator>
): void {
  registry.set(name, generator);
}
