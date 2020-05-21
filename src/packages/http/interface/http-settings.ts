export type SSLSetting = {
    certFile: string,
    keyFile: string,
}

export type HttpSettings = {
    hostname: string,
    port: number,
    SSL?: SSLSetting
}