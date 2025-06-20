import React from 'react';
import { StyleSheet } from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import { FlickrFeedItem } from '../../types/flickr';
import ImageCard from '../molecules/ImageCard';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

interface GalleryProps {
  items: FlickrFeedItem[];
  onRefresh?: () => void;
  refreshing?: boolean;
}

const Gallery: React.FC<GalleryProps> = ({ items, onRefresh, refreshing }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <MasonryList
      data={items}
      keyExtractor={(_, idx) => idx.toString()}
      renderItem={({ item }) => (
        <ImageCard
          item={item as FlickrFeedItem}
          onPress={() => navigation.navigate('Detail', { item })}
        />
      )}
      numColumns={2}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      refreshing={!!refreshing}
      onRefresh={onRefresh}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
});

export default Gallery; 