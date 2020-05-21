import { CacheOptions } from "../interfaces/cache-options.ts";

export abstract class BaseCacheProvider implements ICacheProvider {
    constructor(protected options: CacheOptions) {}
    abstract getCached<T>(key: string): T;
    abstract setCached(key: string, value: any): void;
    abstract isExpired(key: string): boolean;
    abstract hasCache(key: string): boolean;
}