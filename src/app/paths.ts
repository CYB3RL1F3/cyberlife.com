export enum paths {
  podcasts = "/",
  podcastDetails = "/podcast/:id",
  events = "/events",
  eventDetails = "/events/:type/:id",
  eventDetailsDefault = "/events/:id",
  charts = '/charts',
  releases = "/releases",
  releaseDetails = "/releases/:id",
  bio = '/biography',
  contact = '/contact'
}

export const resolvePath = (path: paths, id: string | number = '', type: string = '') =>
  path.replace(':id', id.toString()).replace(':type', type)
