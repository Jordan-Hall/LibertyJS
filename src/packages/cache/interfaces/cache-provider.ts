interface ICacheProvider {
    getCached(key: string): any;
    setCached(key: string, value: any): Promise<void> | void;
    isExpired(key: string): boolean;
    hasCache(key: string): boolean;
}