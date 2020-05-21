import { libertyConnect, LibertyHttp } from "../interface/mod.ts";
import { Server } from './package.ts';
const { listen, listenTls } = Deno;


export const denoConnect: libertyConnect<Deno.Reader> = (settings) => {
    const { SSL, hostname, port} = settings
    const listener: Deno.Listener = SSL?.certFile && SSL?.keyFile 
        ? listenTls({port, hostname, certFile: SSL.certFile, keyFile: SSL.keyFile})
        : listen({port, hostname});
    return new Server(listener) as  LibertyHttp<Deno.Reader>;
}