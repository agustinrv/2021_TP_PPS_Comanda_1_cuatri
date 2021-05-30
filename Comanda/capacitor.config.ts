import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'comanda.app',
  appName: 'Comanda',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 2950
    }
  },
};

export default config;
