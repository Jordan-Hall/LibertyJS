import { Routes } from "./interface/routes.ts";

export abstract class LibertyRouter {
    #routes: Routes = [];

    /**
     *
     */
    constructor(routes: Routes) {
        this.#routes = routes;
    }

    
    matchRoute(url: string): Routes {
        return this.#routes.filter(route => {
            route.path.
            const replacePathWithRegex = url.match(route.path)
        })
    }

}