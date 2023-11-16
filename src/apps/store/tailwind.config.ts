import tailwindConfig from "ui/tailwind.config"

import type { Config } from "tailwindcss"

const config: Config = {
  ...tailwindConfig,
  content: (tailwindConfig.content as string[]).concat(["./src/**/*.tsx"]),
}
export default config
