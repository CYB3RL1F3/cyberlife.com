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
  }
}

export const isProduction = () => config.mode === "production";

export default config;