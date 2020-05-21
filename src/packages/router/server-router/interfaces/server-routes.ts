import { Route } from "../package.ts";
import { HttpMethod } from "../../core/package.ts";

export interface ServerRoute extends Route {
    httpMethod: HttpMethod
}