/**
 * @Author: Erik Slovak <erik.slovak@technologystudio.sk>
 * @Date: 2021-09-10T13:09:59+02:00
 * @Copyright: Technology Studio
**/

import * as Sentry from '@sentry/react-native'
import type { Middleware } from 'redux'
import { Log } from '@txo/log'

const log = new Log('txo.sentry-react-native.Redux.SentryRedux')

export const sentryTransactionNavigationMiddleware: Middleware =
  (store) => (next) => (action) => {
    const type = action.type as string | undefined
    if (type?.startsWith('Navigation/') ?? false) {
      const currentTransaction = Sentry.getCurrentHub().getScope()?.getTransaction()
      if (currentTransaction != null) {
        currentTransaction.finish()
        log.debug('currentTransaction', { currentTransaction })
      }
      const transaction = Sentry.startTransaction({ name: 'Navigation' })
      Sentry.getCurrentHub().configureScope(scope => scope.setSpan(transaction))
      const span = transaction.startChild({
        description: type,
        op: 'navigation',
        data: {
          routeName: action.routeName,
          params: action.params,
        },
      })
      span.finish()
    }
    return next(action)
  }
