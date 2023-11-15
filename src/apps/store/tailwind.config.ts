import type { Config } from "tailwindcss"
import tailwindConfig from "ui/tailwind.config"

const config: Config = {
  ...tailwindConfig,
  content: (tailwindConfig.content as string[]).concat(["./src/**/*.tsx"]),
}
export default config
