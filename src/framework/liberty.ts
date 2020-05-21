import { IServer } from './interface/I-server.ts';
import { IHooks } from './hooks/interfaces/i-hooks.ts';
import {
    LibertyHttp,
    libertyConnect,
    LibertyServerRouter,
    HttpMethod
} from './package.ts';

interface LibertyServerOptions {
    http: libertyConnect<any>
    router: LibertyServerRouter
}

export class LibertyServer<TBody> extends AbortController implements IServer {
    #_isOnline = false
    #server: LibertyHttp<any> | undefined = undefined;
    #hooks: IHooks[] = [];
    #httpConnect: libertyConnect<TBody>;
    #router: LibertyServerRouter;

    constructor({ http, router }: LibertyServerOptions) {
        super();
        this.signal.addEventListener("abort", () => {
            this.close();
        })
        this.#httpConnect = http;
        this.#router = router;
    }

    async listen(): Promise<void> {
        const server: LibertyHttp<TBody> =  this.#httpConnect({ hostname: '127.0.0.1.xip.io', port: 9000});
        this.#_isOnline = true;
        this.#server = server;
        console.log(`Server start in https://127.0.0.1.xip.io:9000`);
        
        for await (const request of server) {
            console.log(server);
            const matchedRoute = this.#router.matchRoute(request.url, request.method as HttpMethod);
            console.log(matchedRoute);
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