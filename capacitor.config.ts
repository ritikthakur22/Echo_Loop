import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.echoloop.daf',
  appName: 'EchoLoop',
  webDir: 'dist',
  server: { androidScheme: 'https' },
};

export default config;
