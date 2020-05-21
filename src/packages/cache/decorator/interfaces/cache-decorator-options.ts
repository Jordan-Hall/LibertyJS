import { Storage } from "../../package.ts";

export interface CacheDecoratorOptions {
    type: Storage;
    ttl: number;
}