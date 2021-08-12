/**
 * @Author: Erik Slovak <erik.slovak@technologystudio.sk>
 * @Date: 2021-08-12T12:08:04+02:00
 * @Copyright: Technology Studio
**/

import { AbstractStateObservableManager } from '@txo-peer-dep/observable-redux'
import { selectUserId } from '@txo/identity-react'
import '@txo-peer-dep/react-conditional-navigation'
import { DefaultRootState } from 'react-redux'

import {
  NavigationState,
} from '../Model/Types'

import {
  addNavigationBreadcrumb,
  getCurrentNavigation,
  setUser,
} from './SentryHelper'

class NavigationManager extends AbstractStateObservableManager<NavigationState | null, DefaultRootState> {
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

class UserManager extends AbstractStateObservableManager<string | null, DefaultRootState> {
  constructor () {
    super(selectUserId)
  }

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

const userManager = new UserManager()

export {
  navigationManager,
  userManager,
}
