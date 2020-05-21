export * from './provider/base-provider.ts';
export * from './provider/storage-provider.ts';
export * from './interfaces/cache-provider.ts';
import { InMemoryCache, Storage } from './package.ts';

interface Liberty {
    cache: Storage;
}

export let liberty: Liberty = {} as Liberty;