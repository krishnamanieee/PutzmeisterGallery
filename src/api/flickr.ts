import { FlickrFeedResponse } from '../types/flickr';

const FLICKR_PUBLIC_FEED_URL =
  'https://www.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1';

export async function fetchFlickrPublicFeed(tags?: string): Promise<FlickrFeedResponse> {
  let url = FLICKR_PUBLIC_FEED_URL;
  if (tags) {
    url += `&tags=${encodeURIComponent(tags)}`;
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch Flickr feed');
  }
  return response.json();
} 