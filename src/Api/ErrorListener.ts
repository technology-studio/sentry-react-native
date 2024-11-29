/**
 * @Author: Erik Slovak <erik.slovak@technologystudio.sk>
 * @Date: 2024-11-29T20:43:00+01:00
 * @Copyright: Technology Studio
**/

import {
  ServiceOperationError,
  containsNonNetworkError,
} from '@txo/service-prop'
import { subscribeErrorListener } from '@txo-peer-dep/error-handler'
import * as Sentry from '@sentry/react-native'
import { VALIDATION_ERROR } from '@txo/service-graphql-react'

export const subscribeSentryErrorListener = (): () => void => (
  subscribeErrorListener((error) => {
    if (error instanceof ServiceOperationError) {
      const areErrorsValidationOnly = error.serviceErrorList.every(error => (
        error.meta?.type === VALIDATION_ERROR
      ))
      if (containsNonNetworkError(error) || !areErrorsValidationOnly) {
        Sentry.withScope(scope => {
          scope.setExtra('serviceErrorList', error.serviceErrorList)
          scope.setExtra('context', error.context)
          scope.setExtra('operationName', error.operationName)

          Sentry.captureException(error)
        })
      }
    } else {
      Sentry.captureException(error)
    }
  })
)
