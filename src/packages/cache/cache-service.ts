export class CacheService {
    constructor(private provider: ICacheProvider) { }
    forMethod(method: Function, args: any[]) {
      const argsString = JSON.stringify(args);
      if (!this.provider.hasCache(argsString) || this.provider.isExpired(argsString)) {
        const result = method.call(this, ...args);
        this.provider.setCached(argsString, result);
        return result;
      } else {
        return this.provider.getCached(argsString);
      }
    }
  
    getValue(key: string) {
      if(this.provider.isExpired(key)) {
        return;
      }
      return this.provider.getCached(key);
    }
    setValue(key: string, value: any) {
      this.provider.setCached(key, value);
    }
  }