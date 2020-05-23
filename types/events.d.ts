export interface Time {
  begin: string;
  end: string;
}

export interface Links {
  event: string;
  venue: string;
}

export interface Flyer {
  front: string | null;
  back: string | null;
  list: string | null;
}