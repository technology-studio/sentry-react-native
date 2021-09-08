/**
 * @Author: Erik Slovak <erik.slovak@technologystudio.sk>
 * @Date: 2021-08-12T13:08:28+02:00
 * @Copyright: Technology Studio
**/

import { is } from '@txo/types'
import * as Sentry from '@sentry/react-native'
import { Log } from '@txo/log'

import type { SentryConfig } from '../Model/Types'

import { UserManager } from './SentryManager'

const log = new Log('txo.sentry-react-native.Api.SentryInit')

export const initSentry = (sentryConfig: SentryConfig): void => {
  if (process.env.NODE_ENV === 'production') {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const userManager = new UserManager(sentryConfig.userIdSelector)
    const strippedBaseUrl = is(sentryConfig.baseUrl.match(/\/\/([\w\W]*?)\/[\w\W]*/)?.[1])
    Sentry.init({
      ...sentryConfig,
      integrations: [
        new Sentry.ReactNativeTracing({
          tracingOrigins: ['localhost', strippedBaseUrl],
        }),
      ],
    })
  } else {
    log.info('Sentry disabled for non-production NODE_ENV')
  }
}
