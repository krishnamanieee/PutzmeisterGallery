import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Share, Image as RNImage } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import Text from '../components/atoms/Text';
import Image from '../components/atoms/Image';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { addFavorite, removeFavorite, isFavorite as checkIsFavorite } from '../utils/favorites';
import GalleryTemplate from '../components/templates/GalleryTemplate';

const DetailScreen: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Detail'>>();
  const { item } = route.params;
  const [isFavorite, setIsFavorite] = useState(false); // TODO: wire up to real favorites
  const [imageHeight, setImageHeight] = useState(200); // default height
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (item.media.m) {
      RNImage.getSize(item.media.m, (width, height) => {
        if (containerWidth > 0) {
          const ratio = height / width;
          setImageHeight(containerWidth * ratio);
        }
      });
    }
  }, [item.media.m, containerWidth]);

  useEffect(() => {
    // Check if this image is a favorite on mount
    checkIsFavorite(item.link).then(setIsFavorite);
  }, [item.link]);

  const handleToggleFavorite = async () => {
    if (isFavorite) {
      await removeFavorite(item.link);
      setIsFavorite(false);
    } else {
      await addFavorite(item);
      setIsFavorite(true);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: item.link,
        url: item.media.m,
        title: item.title,
      });
    } catch (e) {
      // handle error
    }
  };
  const truncatedTitle = (item.title.length > 10 ? item.title.slice(0, 10) + '...' : item.title) || "Details";


  return (
    <GalleryTemplate title={truncatedTitle} showBackButton>
    <ScrollView contentContainerStyle={styles.container}>
      <View
        style={{ width: '100%' }}
        onLayout={e => setContainerWidth(e.nativeEvent.layout.width)}
      >
        <Image
          source={{ uri: item.media.m }}
          style={[styles.image, { height: imageHeight }]}
          resizeMode="contain"
        />
      </View>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{item.title || 'Untitled'}</Text>
        <TouchableOpacity onPress={handleToggleFavorite}>
          <Icon
            name={isFavorite ? 'heart' : 'heart'}
            size={28}
            color={isFavorite ? '#e74c3c' : '#888'}
            style={{ marginLeft: 12 }}
            solid={isFavorite}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShare}>
          <Icon name="share-nodes" size={28} color="#007aff" style={{ marginLeft: 12 }} />
        </TouchableOpacity>
      </View>
      <Text style={styles.meta}>By: {item.author}</Text>
      <Text style={styles.meta}>Published: {new Date(item.published).toLocaleDateString()}</Text>
      {item.tags && item.tags.trim() !== '' && (
        <Text style={styles.tags}>Tags: {item.tags}</Text>
      )}
      <Text style={styles.description}>{item.description.replace(/<[^>]+>/g, '')}</Text>
    </ScrollView>
    </GalleryTemplate>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 320,
    borderRadius: 18,
    marginBottom: 18,
    backgroundColor: '#eee',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    width: '100%',
  },
  title: {
    flex: 1,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
  },
  meta: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
    width: '100%',
  },
  tags: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
    width: '100%',
  },
  description: {
    fontSize: 15,
    color: '#444',
    marginTop: 12,
    width: '100%',
  },
});

export default DetailScreen; 