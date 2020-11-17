import Router from '@/router'
import RouteConfig from './router'

export default class Developer {
  public static install(router: typeof Router): void {
    router.addRoutes(RouteConfig)
  }
}
