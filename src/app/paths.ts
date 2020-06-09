export enum paths {
  podcasts = "/",
  podcastDetails = "/podcasts/:id",
  events = "/events",
  eventDetails = "/events/:type/:id",
  eventDetailsDefault = "/events/:id",
  charts = '/charts',
  releases = "/releases",
  releaseDetails = "/releases/:id",
  bio = '/biography',
  contact = '/contact',
  about = '/about'
}

export const resolvePath = (path: paths, id: string | number = '', type: string = '') =>
  path.replace(':id', id.toString()).replace(':type', type)
