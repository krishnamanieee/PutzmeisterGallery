import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Image from '../atoms/Image';
import Text from '../atoms/Text';
import { FlickrFeedItem } from '../../types/flickr';

interface ImageCardProps {
  item: FlickrFeedItem;
  onPress?: () => void;
  compact?: boolean;
}

const ImageCard: React.FC<ImageCardProps> = ({ item, onPress, compact }) => {
  const showTags = item.tags && item.tags.trim().toLowerCase() !== 'none';
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={styles.touchable}
      testID="image-card-touchable">
      <View style={styles.card}>
        <Image source={{ uri: item.media.m }} style={compact ? styles.compactImage : styles.image} resizeMode="cover" />
        <Text style={compact ? styles.compactTitle : styles.title} numberOfLines={1}>{item.title || 'Untitled'}</Text>
        {!compact && <Text style={styles.meta}>By: {item.author}</Text>}
        {!compact && <Text style={styles.meta}>Published: {new Date(item.published).toLocaleDateString()}</Text>}
        {!compact && showTags && (
          <Text style={styles.tags}>Tags: {item.tags}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
  },
  card: {
    flex: 1,
    margin: 2,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: '100%',
    height: 200,
  },
  compactImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
    backgroundColor: '#eee',
    marginBottom: 6,
    alignSelf: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    margin: 4,
  },
  compactTitle: {
    fontSize: 13,
    color: '#333',
    textAlign: 'center',
    width: 90,
    alignSelf: 'center',
    marginBottom: 4,
  },
  meta: {
    fontSize: 12,
    color: '#555',
    marginHorizontal: 8,
    marginBottom: 2,
  },
  tags: {
    fontSize: 12,
    color: '#888',
    margin: 8,
  },
});

export default ImageCard; 