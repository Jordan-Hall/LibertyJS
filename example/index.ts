import { denoConnect } from '../src/packages/http/deno/deno.connect.ts';
import { LibertyServerRouter, LibertyServer } from '../src/framework/mod.ts';

const app = new LibertyServer({
    http: denoConnect,
    router: new LibertyServerRouter([
        {
            path: '/name/:name',
            httpMethod: "Get",
            method: () => {}
        }
    ])
    
});

console.log(app.listen());