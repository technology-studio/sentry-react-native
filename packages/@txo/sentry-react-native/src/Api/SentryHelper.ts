/**
 * @Author: Erik Slovak <erik.slovak@technologystudio.sk>
 * @Date: 2021-08-08T17:08:39+02:00
 * @Copyright: Technology Studio
**/

import * as Sentry from '@sentry/react-native'
import { NavigationParams } from 'react-navigation'

import { NavigationState } from '../Model/Types'

export const setUser = (user: Sentry.User | null): void => {
  return Sentry.configureScope(scope => {
    scope.setUser(user)
  })
}

export const addNavigationBreadcrumb = (navigation: NavigationState): void => {
  const anonymizedParams = navigation.params
    ? JSON.stringify(prepareNavigationParams(navigation.params), null, 2)
    : {}
  Sentry.addBreadcrumb({
    category: 'nav',
    message: `Navigated: ${navigation?.routeName ?? ''}`,
    level: Sentry.Severity.Info,
    data: {
      params: anonymizedParams,
    },
  })
}

export const getCurrentNavigation = (navigation: NavigationState): NavigationState => {
  const { routes } = navigation
  if (routes) {
    return getCurrentNavigation(routes[navigation.index])
  } else {
    return navigation
  }
}

export const prepareNavigationParams = (obj: NavigationParams): NavigationParams => {
  return Object.keys(obj).reduce<NavigationParams>((acc, key) => {
    if (obj[key] && typeof obj[key] === 'object') {
      acc = { ...acc, id: obj.id, [key]: prepareNavigationParams(obj[key]) }
    } else {
      acc = { ...acc, id: obj.id }
    }
    return acc
  }, {})
}
