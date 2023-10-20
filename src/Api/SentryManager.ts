/**
 * @Author: Erik Slovak <erik.slovak@technologystudio.sk>
 * @Date: 2021-08-12T12:08:04+02:00
 * @Copyright: Technology Studio
**/

import { AbstractStateObservableManager } from '@txo-peer-dep/observable-redux'

import {
  setUser,
} from './SentryHelper'

export class UserManager extends AbstractStateObservableManager<string | null, Record<string, unknown>> {
  onChange (userId: string | null): void {
    super.onChange(userId)
    setUser((userId != null && userId !== '')
      ? {
          id: userId,
        }
      : null,
    )
  }
}
