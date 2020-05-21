import { ServerRequest } from "../../../package.ts";
import { HttpSettings } from "./http-settings.ts";

export interface LibertyHttp extends AsyncIterable<ServerRequest> {
    close(): void
}

export interface libertyConnect {
    (httpSettings: HttpSettings): LibertyHttp
}