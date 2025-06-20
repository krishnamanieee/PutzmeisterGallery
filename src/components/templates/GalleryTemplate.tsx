import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Text from '../atoms/Text';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import Icon from 'react-native-vector-icons/FontAwesome6';

interface GalleryTemplateProps {
  title: string;
  description?: string;
  showFav?: boolean;
  children: React.ReactNode;
  showBackButton?: boolean;
}

const GalleryTemplate: React.FC<GalleryTemplateProps> = ({ title, description, children, showFav, showBackButton }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.outerContainer}>
      <View style={styles.card}>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {showBackButton && (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
              >
                <Icon name="arrow-left" size={26} color="#222" />
              </TouchableOpacity> 
            )}
            <View style={{ marginLeft: showBackButton ? 16 : 0 }}>
              <Text style={styles.title}>{title}</Text>
              {description ? <Text style={styles.description}>{description}</Text> : null}
            </View>
          </View>
          {showFav && <View >
            <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
              <Icon name="heart" size={26} color="#e74c3c" solid />
            </TouchableOpacity>
          </View>}
        </View><View style={styles.galleryContainer}>{children}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#444',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  card: {
    flex: 1,
    width: '96%',
    backgroundColor: '#fff',
    borderRadius: 36,
    paddingHorizontal: 18,
    paddingTop: 32,
    paddingBottom: 16,
    marginVertical: 16,
    // Subtle shadow for iOS, elevation for Android
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#222',
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  galleryContainer: {
    flex: 1,
  },
});

export default GalleryTemplate; 