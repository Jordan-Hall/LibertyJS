export interface IServer {

    isOnline: boolean

    /**
     * Listen starts the server and returns either port number, boolean or URL of the server
     *
     * @returns {(number | boolean | string)}
     * @memberof IServer
     */
    listen(): Promise<string | number | boolean | void>;
    /**
     * Close the port and graceful shutdown
     *
     * @returns {boolean}
     * @memberof IServer
     */
    close(): boolean;
    /**
     * use should also handle cors
     * @param {*} middleware
     * @memberof IServer
     */
    use(middleware: any): void

}