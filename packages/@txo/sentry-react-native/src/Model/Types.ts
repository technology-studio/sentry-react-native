/**
 * @Author: Erik Slovak <erik.slovak@technologystudio.sk>
 * @Date: 2021-08-08T18:08:74+02:00
 * @Copyright: Technology Studio
**/

import { NavigationState as _NavigationState } from 'react-navigation'

export type NavigationState = _NavigationState & {
  routeName?: string,
}

export type SentryConfig = {
  baseUrl: string,
  dsn: string,
  environment: string,
}
