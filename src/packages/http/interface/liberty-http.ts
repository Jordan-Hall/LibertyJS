import { HttpRequest } from "./http-request.ts";
import { HttpSettings } from "./http-settings.ts";

export interface LibertyHttp<TBodyReader> extends AsyncIterable<HttpRequest<TBodyReader>> {
    close(): void
}

export interface libertyConnect<TBodyReader> {
    (httpSettings: HttpSettings): LibertyHttp<TBodyReader>
}