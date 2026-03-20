import type { Random } from "../types.js";
export type FormatGenerator = (random: Random) => string;
export declare function createFormatRegistry(userFormats?: Record<string, FormatGenerator>): Map<string, FormatGenerator>;
export declare function registerFormatGlobal(name: string, generator: FormatGenerator, registry: Map<string, FormatGenerator>): void;
//# sourceMappingURL=index.d.ts.map