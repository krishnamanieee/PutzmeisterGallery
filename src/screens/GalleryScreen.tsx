import React, { useState } from 'react';
import { Text as RNText, StyleSheet, SectionList, ActivityIndicator, TouchableOpacity, View } from 'react-native';
import GalleryTemplate from '../components/templates/GalleryTemplate';
import HorizontalGallery from '../components/organisms/HorizontalGallery';
import { useMultiTagFlickrFeed } from '../hooks/useMultiTagFlickrFeed';
import { TAGS } from '../constants/tags';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { FlickrFeedItem } from '../types/flickr';
import Icon from 'react-native-vector-icons/FontAwesome6';

const GalleryScreen: React.FC = () => {
  const { feeds, loading, refetch } = useMultiTagFlickrFeed(TAGS);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [refreshing, setRefreshing] = useState(false);

  const handleItemPress = (item: FlickrFeedItem) => {
    navigation.navigate('Detail', { item });
  };

  const onRefresh = async () => {
    setRefreshing(true);
    if (typeof refetch === 'function') {
      await refetch();
    }
    setRefreshing(false);
  };

  if (loading) {
    // Show a full-page loader while fetching all tags
    return <ActivityIndicator style={{ flex: 1, alignSelf: 'center', marginTop: 100 }} />;
  }

  const sections = feeds.map(feed => ({
    title: feed.tag,
    data: [feed.items],
    loading: feed.loading,
    error: feed.error ?? undefined,
  }));

  return (
    <GalleryTemplate title="#Gallery" description="Browse by tag." showFav>
      <SectionList
        sections={sections}
        keyExtractor={(_, idx) => idx.toString()}
        renderSectionHeader={({ section }) => (
          <RNText style={styles.sectionTitle}>{section.title}</RNText>
        )}
        renderItem={({ item, section }) =>
          section.loading ? (
            <ActivityIndicator style={{ marginVertical: 16 }} />
          ) : section.error ? (
            <RNText style={{ color: 'red', margin: 16 }}>{section.error}</RNText>
          ) : (
            <HorizontalGallery items={item} onItemPress={handleItemPress} />
          )
        }
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </GalleryTemplate>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 18,
    color: '#222',
    paddingLeft: 4,
  },
  loading: {
    textAlign: 'center',
    marginTop: 32,
    color: '#888',
    fontSize: 16,
  },
});

export default GalleryScreen; 