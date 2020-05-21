import { ServerRequest, Response } from "../../package.ts";

export interface IHooksReturn {
    serverRequest: ServerRequest,
    response: Response
}

export interface IHooks {
    pre(request: ServerRequest, response: Response): IHooksReturn;
    post(request: ServerRequest, response: Response): IHooksReturn;
    catch(request: ServerRequest, response: Response, error: any): IHooksReturn;
}
