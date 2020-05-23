export const config = {
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

export default config;