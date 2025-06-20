import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text as RNText } from 'react-native';
import GalleryTemplate from '../components/templates/GalleryTemplate';
import ImageCard from '../components/molecules/ImageCard';
import { getFavorites } from '../utils/favorites';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { FlickrFeedItem } from '../types/flickr';
import Text from '../components/atoms/Text';

const FavoritesScreen: React.FC = () => {
  const [items, setItems] = useState<FlickrFeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const fetchFavorites = async () => {
    setLoading(true);
    const favItems = await getFavorites();
    setItems(favItems);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchFavorites();
    }, [])
  );

  const handleItemPress = (item: FlickrFeedItem) => {
    navigation.navigate('Detail', { item });
  };

  console.log('items', items);

  return (
    <GalleryTemplate title="#Favorites" description="Your favorited images." showBackButton>
      {loading ? (
        <ActivityIndicator style={{ marginTop: 100 }} />
      ) : (
        <FlatList
          data={items}
          keyExtractor={(_, idx) => idx.toString()}
          numColumns={3}
          renderItem={({ item }) => {
            const truncatedTitle = item.title.length > 10 ? item.title.slice(0, 10) + '...' : item.title;
            return (
              <View style={styles.cardContainer}>
                <ImageCard item={{ ...item, title: truncatedTitle }} onPress={() => handleItemPress(item)} compact />
              </View>
            );
          }}
          contentContainerStyle={styles.grid}
          ListEmptyComponent={
            <View style={{ marginTop: 60 }}>
              <RNText style={styles.emptyText}>You haven't added any favorites yet.</RNText>
            </View>
          }
        />
      )}
    </GalleryTemplate>
  );
};

const styles = StyleSheet.create({
  grid: {
    padding: 8,
  },
  cardContainer: {
    flex: 1,
    margin: 4,
    alignItems: 'flex-start',
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
  },
});

export default FavoritesScreen; 