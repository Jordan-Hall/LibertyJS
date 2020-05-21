import { CacheReturnType } from '../enum/cache-return-type.ts';
export type StorageObject = {
    items: { [args: string]: any };
    ttl: { [args: string]: number };
    returnType?: CacheReturnType;
}