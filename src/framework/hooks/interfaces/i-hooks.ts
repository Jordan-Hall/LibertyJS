import { HttpRequest } from "../../package.ts";

export interface IHooksReturn {
    serverRequest: HttpRequest<any>,
    response: Response
}

export interface IHooks {
    pre(request: HttpRequest<any>, response: Response): IHooksReturn;
    post(request: HttpRequest<any>, response: Response): IHooksReturn;
    catch(request: HttpRequest<any>, response: Response, error: any): IHooksReturn;
}
