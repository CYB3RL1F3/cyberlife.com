import ReactHtmlParser from 'react-html-parser';
import * as sanitizeHtml from 'sanitize-html';

export const getSanitizedHtml = (html: string): string =>
  sanitizeHtml(html, {
    allowedTags: [
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'blockquote',
      'p',
      'a',
      'ul',
      'ol',
      'nl',
      'li',
      'b',
      'i',
      'strong',
      'em',
      'strike',
      'code',
      'hr',
      'br',
      'div',
      'table',
      'thead',
      'caption',
      'tbody',
      'tr',
      'th',
      'td',
      'pre',
      'cite',
      'video',
      'source',
      'img'
    ],
    allowedAttributes: {
      a: ['href', 'name', 'target', 'style'],
      img: ['src', 'alt', 'width', 'height', 'style'],
      video: ['src', 'controls', 'width', 'height', 'muted', 'style'],
      source: ['src', 'type']
    },
    allowedSchemesAppliedToAttributes: ['href', 'src', 'cite'],
    allowedSchemes: ['http', 'https', 'ftp', 'mailto']
  });

export const parseHtml = (html: string) =>
  ReactHtmlParser(getSanitizedHtml(html));
