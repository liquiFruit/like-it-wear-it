#!/bin/bash
set -e

if [ "$#" -ne 1 ]; then
  echo "Usage: $0 <component_name>"
  exit 1
fi

component_name=$1

# # Run pnpx add-component with the argument
pnpx shadcn-ui@latest add "$component_name"

# # Use sed to replace text in src/ui/<component_name>.tsx
sed -i 's/@ui/../g' "src/ui/$component_name.tsx"

# Check if the line already exists in ./index.tsx
if ! grep -q "./src/ui/$component_name" ./index.tsx; then
  # Export component if it doesn't exist
  echo "export * from \"./src/ui/$component_name\"" >> ./index.tsx
fi