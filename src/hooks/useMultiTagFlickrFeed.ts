import { useEffect, useState } from 'react';
import { fetchFlickrPublicFeed } from '../api/flickr';
import { FlickrFeedItem } from '../types/flickr';

export interface TagFeed {
  tag: string;
  items: FlickrFeedItem[];
  loading: boolean;
  error: string | null;
}

export function useMultiTagFlickrFeed(tags: string[]) {
  const [feeds, setFeeds] = useState<TagFeed[]>(() =>
    tags.map(tag => ({ tag, items: [], loading: true, error: null }))
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    Promise.all(
      tags.map(tag =>
        fetchFlickrPublicFeed(tag)
          .then(data => ({ tag, items: data.items, loading: false, error: null }))
          .catch(error => ({ tag, items: [], loading: false, error: error.message }))
      )
    ).then(results => {
      if (isMounted) {
        setFeeds(results);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [tags.join(',')]);

  return { feeds, loading };
} 