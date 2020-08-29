export const config = {
  mode: process.env.MODE,
  api: process.env.API_URL,
  mapbox: {
    url: process.env.MAPBOX_URL,
    accessToken: process.env.MAPBOX_ACCESS_TOKEN
  },
  captcha: {
    url: process.env.CAPTCHA_URL,
    siteKey: process.env.CAPTCHA_SITEKEY
  },
  notifications: {
    applicationServerPublicKey: process.env.APPLICATION_SERVER_PUBLIC_KEY,
    pool: process.env.NOTIFICATION_POOL
  },
  fb: {
    appId: process.env.FB_APP_ID
  }
}

export const isProduction = () => config.mode === "production";

export default config;