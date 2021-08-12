/**
 * @Author: Erik Slovak <erik.slovak@technologystudio.sk>
 * @Date: 2021-08-08T18:08:80+02:00
 * @Copyright: Technology Studio
**/

import { ConfigManager } from '@txo/config-manager'

export type Config = {
  dsn: string,
  environment: string,
}

export const configManager: ConfigManager<Config> = new ConfigManager<Config>({
  dsn: undefined,
  environment: undefined,
})
