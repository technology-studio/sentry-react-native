/**
 * @Author: Erik Slovak <erik.slovak@technologystudio.sk>
 * @Date: 2021-08-12T12:08:04+02:00
 * @Copyright: Technology Studio
**/

import { AbstractStateObservableManager } from '@txo-peer-dep/observable-redux'

import type {
  NavigationState,
  RootState,
} from '../Model/Types'

import {
  addNavigationBreadcrumb,
  getCurrentNavigation,
  setUser,
} from './SentryHelper'

class NavigationManager extends AbstractStateObservableManager<NavigationState | null, RootState> {
  constructor () {
    super((state) => state.navigation)
  }

  onChange (state: NavigationState | null): void {
    super.onChange(state)
    if (state) {
      const currentNavigation = getCurrentNavigation(state)
      addNavigationBreadcrumb(currentNavigation)
    }
  }
}

const navigationManager = new NavigationManager()

export class UserManager extends AbstractStateObservableManager<string | null, Record<string, unknown>> {
  onChange (userId: string | null): void {
    super.onChange(userId)
    setUser(userId
      ? {
          id: userId,
        }
      : null,
    )
  }
}

export {
  navigationManager,
}
