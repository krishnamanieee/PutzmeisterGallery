import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlickrFeedItem } from '../types/flickr';

const FAVORITES_KEY = 'favorites';
const MAX_FAVORITES = 15;

export async function getFavorites(): Promise<FlickrFeedItem[]> {
  const json = await AsyncStorage.getItem(FAVORITES_KEY);
  return json ? JSON.parse(json) : [];
}

export async function addFavorite(item: FlickrFeedItem) {
  let favs = await getFavorites();
  // Remove if already exists (by link)
  favs = favs.filter(fav => fav.link !== item.link);
  favs.push(item);
  if (favs.length > MAX_FAVORITES) {
    favs = favs.slice(favs.length - MAX_FAVORITES);
  }
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
}

export async function removeFavorite(link: string) {
  const favs = await getFavorites();
  const newFavs = favs.filter(fav => fav.link !== link);
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavs));
}

export async function isFavorite(link: string): Promise<boolean> {
  const favs = await getFavorites();
  return favs.some(fav => fav.link === link);
}
