/**
 * @Author: Erik Slovak <erik.slovak@technologystudio.sk>
 * @Date: 2021-08-12T13:08:28+02:00
 * @Copyright: Technology Studio
**/

import { is } from '@txo/types'
import * as Sentry from '@sentry/react-native'

import type { SentryConfig } from '../Model/Types'

import { UserManager } from './SentryManager'

export const initSentry = (sentryConfig: SentryConfig): void => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const userManager = new UserManager(sentryConfig.userIdSelector)
  const strippedBaseUrl = is(sentryConfig.baseUrl.match(/\/\/([\w\W]*?)\/[\w\W]*/)?.[1])
  Sentry.init({
    enabled: (sentryConfig.debug ?? false) || process.env.NODE_ENV === 'production',
    tracesSampleRate: 0,
    ...sentryConfig,
    integrations: [
      new Sentry.ReactNativeTracing({
        tracingOrigins: ['localhost', strippedBaseUrl],
        // NOTE: this is a workaround for Detox tests being stuck
        // https://github.com/getsentry/sentry-react-native/issues/1921
        enableStallTracking: false,
      }),
    ],
  })
}
