// The Plateful phone apps: this React app inside a native shell (Capacitor). The web build in dist/public is the app.
// CapacitorHttp makes fetch() native, so recipe pages are read on the phone itself — sites that block servers still answer.
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ca.plateful.app',
  appName: 'Plateful',
  webDir: 'dist/public',
  android: { allowMixedContent: false },
  plugins: { CapacitorHttp: { enabled: true } },
};

export default config;
