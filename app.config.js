module.exports = {
  name: "finansal-bt-mc-y",
  slug: "finansal-bt-mc-y",
  version: '1.0.0',
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
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
  },
  ios: {
    supportsTablet: true
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#FFFFFF",
    },
    googleServicesFile: "./google-services.json",
    package: "com.deonsky.finansalbtmcy"
  },
  packagerOpts: {
    sourceExts: ["cjs"]
  }
};