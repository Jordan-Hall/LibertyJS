import { Route } from "./interface/routes.ts";
import { pathToRegexp } from "./package.ts";

export abstract class LibertyRouter<T extends Route> {
    #routes: T[] = [];

    /**
     *
     */
    constructor(routes: T[]) {
        this.#routes = routes;
    }

    
    matchRoute(url: string): T |  T[] | undefined {
        return this.#routes.filter(route => {
            const regex = pathToRegexp(route.path);
            return url.match(regex);
        })
    }

    add(...routes: T[]) {
        this.#routes.push(...routes)
    }
}