import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import ImageCard from '../molecules/ImageCard';
import { FlickrFeedItem } from '../../types/flickr';

interface HorizontalGalleryProps {
  items: FlickrFeedItem[];
  onItemPress?: (item: FlickrFeedItem) => void;
}

const HorizontalGallery: React.FC<HorizontalGalleryProps> = ({ items, onItemPress }) => (
  <FlatList
    data={items}
    horizontal
    keyExtractor={(_, idx) => idx.toString()}
    renderItem={({ item }) => (
      <View style={styles.card}>
        <ImageCard item={item} onPress={() => onItemPress?.(item)} compact />
      </View>
    )}
    showsHorizontalScrollIndicator={false}
  />
);

const styles = StyleSheet.create({
  card: {
    width: 140,
    marginRight: 0,
    alignItems: 'center',
  },
});

export default HorizontalGallery; 