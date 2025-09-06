import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.37720a9730324dd9a1712f98885a9932',
  appName: 'ignite-quiz-time',
  webDir: 'dist',
  server: {
    url: 'https://37720a97-3032-4dd9-a171-2f98885a9932.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
      backgroundColor: "#f8fafc",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true
    }
  }
};

export default config;