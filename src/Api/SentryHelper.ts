/**
 * @Author: Erik Slovak <erik.slovak@technologystudio.sk>
 * @Date: 2021-08-08T17:08:39+02:00
 * @Copyright: Technology Studio
**/

import { type Route } from '@react-navigation/native'
import * as Sentry from '@sentry/react-native'

export const setUser = (user: Sentry.User | null): void => {
  Sentry.configureScope(scope => {
    scope.setUser(user)
  })
}

export const addNavigationBreadcrumb = (route: Route<string, Record<string, unknown>>): void => {
  const anonymizedParams = (route.params != null)
    ? JSON.stringify(prepareNavigationParams(route.params), null, 2)
    : {}
  Sentry.addBreadcrumb({
    category: 'nav',
    message: `Navigated: ${route?.name ?? ''}`,
    level: 'info',
    data: {
      params: anonymizedParams,
    },
  })
}

// NOTE: NavigationParams in react-navigation use `any` as type for values
type NavigationParams = Record<string, unknown>

export const prepareNavigationParams = (obj: NavigationParams): NavigationParams => Object.keys(obj).reduce<NavigationParams>((acc, key) => {
  if (obj[key] != null && typeof obj[key] === 'object') {
    acc = { ...acc, id: obj.id, [key]: prepareNavigationParams(obj[key] as NavigationParams) }
  } else {
    acc = { ...acc, id: obj.id }
  }
  return acc
}, {})

export const stringifyAndFilter = (value: unknown): string => (
  JSON.stringify(value, null, 2)?.replace(/(a)u(th)/gmi, '$1*$2')
)

export const stripSignature = (jwt: string): string => jwt.replace(/(Bearer [\w-]+\.[\w-]+)(\.[\w-]+)/g, '$1')
