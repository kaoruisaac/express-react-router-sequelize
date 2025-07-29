import type { Config } from "@react-router/dev/config";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
  
  // Build configuration
  buildDirectory: "build",
  
  // Custom client entry (optional)
  // clientEntry: "./app/entry.client.tsx",
} satisfies Config;
