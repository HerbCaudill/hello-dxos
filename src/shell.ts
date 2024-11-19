import { runShell } from '@dxos/shell'
import '@dxos/shell/style.css'
import { getConfig } from './config'

const main = async () => {
  const config = await getConfig()
  await runShell(config)
}

void main()
