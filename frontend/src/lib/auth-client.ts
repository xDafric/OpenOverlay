import { createAuthClient } from "better-auth/react";
import { baseUrl } from "./config";
import { adminClient, organizationClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: `${baseUrl}/auth`,
  plugins: [
    adminClient(),
    organizationClient({ dynamicAccessControl: { enabled: true } }),
  ],
});
