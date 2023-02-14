/**
 * @Author: Erik Slovak <erik.slovak@technologystudio.sk>
 * @Date: 2021-08-08T17:08:39+02:00
 * @Copyright: Technology Studio
**/

import * as Sentry from '@sentry/react-native'
import type { NavigationParams } from 'react-navigation'

import type { NavigationState } from '../Model/Types'

export const setUser = (user: Sentry.User | null): void => {
  Sentry.configureScope(scope => {
    scope.setUser(user)
  })
}

export const addNavigationBreadcrumb = (navigation: NavigationState): void => {
  const anonymizedParams = (navigation.params != null)
    ? JSON.stringify(prepareNavigationParams(navigation.params), null, 2)
    : {}
  Sentry.addBreadcrumb({
    category: 'nav',
    message: `Navigated: ${navigation?.routeName ?? ''}`,
    level: 'info',
    data: {
      params: anonymizedParams,
    },
  })
}

export const getCurrentNavigation = (navigation: NavigationState): NavigationState => {
  const { routes } = navigation
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- TODO: routes could be undefined - types are probably not correct and this will also probably need to be refactored when migrating to new react-navigation
  if (routes) {
    return getCurrentNavigation(routes[navigation.index])
  } else {
    return navigation
  }
}

export const prepareNavigationParams = (obj: NavigationParams): NavigationParams => Object.keys(obj).reduce<NavigationParams>((acc, key) => {
  if (obj[key] != null && typeof obj[key] === 'object') {
    acc = { ...acc, id: obj.id, [key]: prepareNavigationParams(obj[key]) }
  } else {
    acc = { ...acc, id: obj.id }
  }
  return acc
}, {})

export const stringifyAndFilter = (value: unknown): string => (
  JSON.stringify(value, null, 2)?.replace(/(a)u(th)/gmi, '$1*$2')
)

export const stripSignature = (jwt: string): string => jwt.replace(/(Bearer [\w-]+\.[\w-]+)(\.[\w-]+)/g, '$1')
