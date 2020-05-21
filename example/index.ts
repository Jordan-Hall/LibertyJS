import { LibertyServer } from '../src/liberty.ts';
import { denoConnect } from '../src/packages/http/deno/deno.connect.ts';

const app = new LibertyServer({
    http: denoConnect,
    
});

console.log(app.listen());