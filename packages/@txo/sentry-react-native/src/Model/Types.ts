/**
 * @Author: Erik Slovak <erik.slovak@technologystudio.sk>
 * @Date: 2021-08-08T18:08:74+02:00
 * @Copyright: Technology Studio
**/

import type { NavigationState as _NavigationState } from 'react-navigation'

export type NavigationState = _NavigationState & {
  routeName?: string,
}

export type RootState = {
  navigation: NavigationState,
}

export type SentryConfig = {
  baseUrl: string,
  dsn: string,
  environment: string,
  tracesSampleRate?: number,
  userIdSelector: (state: Record<string, unknown>) => string | null,
}
