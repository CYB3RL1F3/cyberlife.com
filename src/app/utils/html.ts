import ReactHtmlParser from 'react-html-parser';
import DOMPurify from 'dompurify';

export const getSanitizedHtml = (html: string, strict: boolean = false): string =>
  DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'blockquote',
      'p',
      !strict ? 'a' : null,
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
      strict ? 'video' : null,
      strict ? 'source' : null,
      strict ? 'img' : null
    ].filter(d => !!d),
    ALLOWED_ATTR: {
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
