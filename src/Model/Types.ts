/**
 * @Author: Erik Slovak <erik.slovak@technologystudio.sk>
 * @Date: 2021-08-08T18:08:74+02:00
 * @Copyright: Technology Studio
**/

import type { NavigationState as _NavigationState } from 'react-navigation'
import type { ReactNativeOptions } from '@sentry/react-native'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DefaultRootState {}

export type NavigationState = _NavigationState & {
  routeName?: string,
}

export type RootState = {
  navigation: NavigationState,
}

export type SentryConfig = Partial<ReactNativeOptions> & {
  baseUrl: string,
  userIdSelector: (state: DefaultRootState) => string | null,
  debug?: boolean,
}
