/**
 * @Author: Erik Slovak <erik.slovak@technologystudio.sk>
 * @Date: 2021-09-08T11:09:81+02:00
 * @Copyright: Technology Studio
**/

import { onError } from '@apollo/client/link/error'
import * as Sentry from '@sentry/react-native'

export const sentryBreadcrumbErrorLink = onError(({ graphQLErrors, operation }) => {
  if (graphQLErrors?.length > 0) {
    // TODO: send whole error as an object and stringify in beforeSend to prevent heavy computation
    Sentry.addBreadcrumb({
      category: 'graphql',
      message: operation.operationName,
      data: {
        errors: JSON.stringify(
          graphQLErrors.map(({ message, name, path }) => ({
            message,
            name,
            path,
          })),
          null,
          2,
        ).replace(/(a)u(th)/gmi, '$1*$2'),
      },
      level: Sentry.Severity.Error,
    })
  }
})
