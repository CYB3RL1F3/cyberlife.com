import React, { FC, useMemo, memo } from "react";
import { Helmet } from "react-helmet";
import config from 'app/config';

interface HeadsProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  conglomerateTitle?: boolean;
  ogType?: string;
  twitterCard?: string;
}

export const Heads: FC<HeadsProps> = ({ title, description, url, image, conglomerateTitle, ogType, twitterCard }) => {
  const finalTitle = useMemo(() => conglomerateTitle ? `Cyberlife - ${title}` : title, [conglomerateTitle, title]);
  const meta = useMemo(() => ({
    'charset': 'utf-8',
    'robots': 'all',
    'theme-color': '#36595C',
    'viewport': 'width=device-width, initial-scale=1.0, minimal-ui',
    'description': description,
    'og:description': description,
    'twitter:description': description,
    'title': finalTitle,
    'og:title': finalTitle,
    'twitter:title': finalTitle,
    'og:image:title': finalTitle,
    'og:type': ogType,
    'og:url': `${url}`,
    'image': image,
    'og:image': image,
    'og:image:secure_url': image,
    'twitter:image': image,
    'twitter:card': twitterCard,
    'og:site_name': "Cyberlife music",
    'twitter:site': '@cyberlife_music',
    'fb:app_id': config.fb.appId,
    'fb:page_id': config.fb.pageId
  }), [finalTitle, description, image, url]);

  return (
    <Helmet>
      <title>{finalTitle}</title>
      {Object.keys(meta).map(name => {
        const content = meta[name];
        if (name.indexOf('og:') > -1 || name.indexOf('fb:') > -1) return <meta property={name} content={content} data-react-helmet="true" />;
        if (name === "Content-Type") return <meta http-equiv={name} content={content} data-react-helmet="true" />;
        return <meta name={name} content={content} data-react-helmet="true" />
      })}
    </Helmet>
  )
} 

Heads.defaultProps = {
  title: 'Cyberlife',
  url: 'https://cyberlife-music.com',
  image: "https://res.cloudinary.com/hw2jydiif/image/upload/v1592758419/android-icon-512x512_rd0xq8.png",
  description: "Inspired by a wide range of electronic genres, between dub techno, IDM, drum and bass, dubstep, tribalistic world music, ambient, trip hop, psychedelic rock & goa trance, Cyberlife, who got rooted years ago in the techno culture, brings the ambition to shape a very personal style, surfing on forward thinking, psychedelic, hypnotic and melancholic vibes. By applying layers of effects on stretched field recordings or destructured analog synths jams on a large scale of tempos, the exploration of the meanders of the matrix of electronic music defines his director line, with an aim to find transcendance and reveal a futuristic and organic universe. As both DJ and producer, he gets a natural attraction for modern and organic sounds, mixing with old school influences. Don't look for the nerd behind this name, keep the mystery and unpredictability, and share a musical mindtrip.",
  ogType: 'website',
  twitterCard: 'summary'
}

export default memo(Heads);