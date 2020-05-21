import { Storage } from "../package.ts";
import { StorageObject } from "../interfaces/storage-object.ts";
import { CacheOptions } from "../interfaces/cache-options.ts";
import { CacheReturnType } from '../enum/cache-return-type.ts';
import { BaseCacheProvider } from "./base-provider.ts";

const __STORAGE_KEY__ = "LIBERTY_CACHE";


export class StorageProvider extends BaseCacheProvider {
    static InstanceNumber = 0;
    private storageKey: string;
    private storage: Storage;
    private memory: StorageObject;
    constructor(options: CacheOptions) {
      super(options);
      StorageProvider.InstanceNumber++
      this.storage = options.type;
      this.storageKey = `${__STORAGE_KEY__}-inst-${StorageProvider.InstanceNumber}`;
      this.memory = this.parseSafe(this.storageKey);
    }
  
    private parseSafe(t: any): any {
      const memory = {
        items: {},
        ttl: {}
      }
      try {
        return JSON.parse(t) || memory;
        // tslint:disable-next-line:no-unused
      } catch (err) {
        return memory
      }
    }
  
    private getCacheType(value: any): CacheReturnType {
      if (Object.prototype.toString.call(value) === "[object Promise]") {
        return CacheReturnType.PROMISE;
      } else if (typeof value.getMonth === 'function' || value instanceof Date) {
        return CacheReturnType.DATE;
      }
      return CacheReturnType.STATIC;
    }
  
    private convertToType(value: any) {
      switch (this.memory.returnType) {
        case CacheReturnType.PROMISE:
          return Promise.resolve(value);
        case CacheReturnType.DATE:
          return new Date(value);
        case CacheReturnType.STATIC:
        default:
          return value;
      }
    }
  
    public getCached(key: string): any {
      let item = null;
      if (this.memory.items.hasOwnProperty(key)) {
        item = this.memory.items[key];
      }
      return this.convertToType(item);
    }
  
    public async setCached(key: string, value: any): Promise<void> {
      this.memory.returnType = this.getCacheType(value);
      if (this.memory.returnType === CacheReturnType.PROMISE) {
        this.memory.items = { ...this.memory.items, [key]: await Promise.resolve(value) };
      } else {
        this.memory.items = { ...this.memory.items, [key]: value };
      }
      if (this.options.ttl) {
        this.memory.ttl = { ...this.memory.ttl, [key]: Date.now() + this.options.ttl };
      }
      this.storage.setItem(this.storageKey, JSON.stringify(this.memory));
    }
  
    public hasCache(key: string): boolean {
      return (this.memory.items.hasOwnProperty(key));
    }
  
    public isExpired(key: string): boolean {
      if (!this.memory.ttl.hasOwnProperty(key)) {
        return false;
      }
      return this.memory.ttl[key] < Date.now();
    }
  }