import { LibertyRouter } from '../core/mod.ts';
import { ServerRoute } from './interfaces/server-routes.ts';
import { HttpMethod } from '../core/package.ts';

export class LibertyServerRouter extends LibertyRouter<ServerRoute> {

    matchRoute(url: string, method: HttpMethod = "Get"): ServerRoute | undefined {
        const matchedRoutes = super.matchRoute(url);
        if (Array.isArray(matchedRoutes)) {
            return matchedRoutes.find(route => route?.httpMethod?.toLowerCase() == method.toLowerCase());
        }
        return matchedRoutes?.httpMethod?.toLowerCase() === method.toLowerCase() ?  matchedRoutes : undefined
    }
}