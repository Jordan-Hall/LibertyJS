import { Storage } from '../package.ts';

export type CacheOptions = {
    type: Storage;
    ttl: number;
}