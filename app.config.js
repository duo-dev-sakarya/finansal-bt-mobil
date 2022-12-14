module.exports = {
  name: "finansal-bt-mc-y",
  slug: "finansal-bt-mc-y",
  scheme:"com.deonsky.finansalbtmcy",
  version: '1.0.3',
  orientation: "portrait",
  icon: "./assets/shopping-list.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/shopping-list.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff"
  },
  updates: {
    "fallbackToCacheTimeout": 0
  },
  assetBundlePatterns: [
    "**/*"
  ],
  extra: {
    csApiKey: process.env.CS_API_KEY,
    cx: process.env.CX,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN:process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
    eas: {
      projectId: "a967e2d5-d4b5-48ba-83bf-9f834bccb38c"
    }

  },
  ios: {
    supportsTablet: true
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/shopping-list.png",
      backgroundColor: "#FFFFFF",
    },
    googleServicesFile: "./google-services.json",
    package: "com.deonsky.finansalbtmcy",
    versionCode: 3,
  },
  packagerOpts: {
    sourceExts: ["cjs"]
  },
  plugins: [
    [
      "expo-build-properties",
      {
        android: {
          enableProguardInReleaseBuilds: true,
          extraProguardRules: "-keep public class com.horcrux.svg.** {*;}",
          allowBackup: false
        }
      }
    ]
  ],
};