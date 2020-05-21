export interface HttpRequest<TBody> {
    url: string;
    method: string;
    proto: string;
    headers: Headers;
    respond(r: Response): Promise<void>
    body(): TBody;
}