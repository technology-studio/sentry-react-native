/**
 * @Author: Erik Slovak <erik.slovak@technologystudio.sk>
 * @Date: 2021-09-08T11:09:81+02:00
 * @Copyright: Technology Studio
**/

import { onError } from '@apollo/client/link/error'
import * as Sentry from '@sentry/react-native'

import {
  stringifyAndFilter,
  stripSignature,
} from './SentryHelper'

export const sentryBreadcrumbErrorLink = onError(({ graphQLErrors, response, operation }) => {
  if ((graphQLErrors ?? []).length > 0) {
    // TODO: send whole error as an object and stringify in beforeSend to prevent heavy computation
    Sentry.addBreadcrumb({
      category: 'graphql',
      message: operation.operationName,
      data: {
        response: stringifyAndFilter(response),
        request: {
          headers: stripSignature(stringifyAndFilter(operation.getContext().headers)),
          variables: stringifyAndFilter(operation.variables),
          operation: operation.query.loc?.source.body.replace(/\\n/g, '\n'),
        },
      },
      level: 'error',
    })
  }
})
