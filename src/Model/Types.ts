/**
 * @Author: Erik Slovak <erik.slovak@technologystudio.sk>
 * @Date: 2021-08-08T18:08:74+02:00
 * @Copyright: Technology Studio
**/

import type { ReactNativeOptions } from '@sentry/react-native'
import type { DefaultRootState } from '@txo-peer-dep/redux'

export type SentryConfig = Partial<ReactNativeOptions> & {
  baseUrl: string,
  userIdSelector: (state: DefaultRootState) => string | null,
  debug?: boolean,
}
