import { IServer } from './interface/I-server.ts';
import { IHooks } from './hooks/interfaces/i-hooks.ts';
import { LibertyHttp, libertyConnect } from './package.ts';

interface LibertyServerCtor {
    http: libertyConnect

}

export class LibertyServer extends AbortController implements IServer {
    #_isOnline = false
    #server: LibertyHttp | undefined = undefined;
    #hooks: IHooks[] = [];
    #httpConnect: libertyConnect;

    constructor({ http }: LibertyServerCtor) {
        super();
        this.signal.addEventListener("abort", () => {
            this.close();
        })
        this.#httpConnect = http; 
    }

    async listen(): Promise<void> {
        const server: LibertyHttp =  this.#httpConnect({ hostname: '127.0.0.1.xip.io', port: 9000});
        this.#_isOnline = true;
        this.#server = server;
        console.log(`Server start in https://127.0.0.1.xip.io:9000`);
        
        for await (const request of server) {
            console.log(server)
            debugger;
        }
    }
    close(): boolean {
        this.#server?.close();
        return true;
    }

    use(hooks: IHooks): void {
        if (this.isValidHooks(hooks)) {
            this.#hooks.push(hooks);
        }
    }

    get isOnline(): boolean {
        return this.#_isOnline;
    }

    private isValidHooks(hook: IHooks): boolean {
        return hook && [typeof hook.post, typeof hook.catch, typeof hook.pre].includes('function');
    }
}