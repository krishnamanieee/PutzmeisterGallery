import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ImageCard from '../ImageCard';
import { FlickrFeedItem } from '../../../types/flickr';

describe('ImageCard', () => {
  const mockItem: FlickrFeedItem = {
    title: 'Test Title',
    link: 'https://example.com',
    media: { m: 'https://example.com/image.jpg' },
    date_taken: '2023-01-01T00:00:00Z',
    description: 'desc',
    published: '2023-01-01T00:00:00Z',
    author: 'John Doe',
    author_id: '123',
    tags: 'tag1 tag2',
  };

  it('renders title and image', () => {
    const { getByText } = render(<ImageCard item={mockItem} />);
    expect(getByText('Test Title')).toBeTruthy();
  });

  it('renders compact style', () => {
    const { getByText } = render(<ImageCard item={mockItem} compact />);
    expect(getByText('Test Title')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(<ImageCard item={mockItem} onPress={onPress} />);
    fireEvent.press(getByTestId('image-card-touchable'));
    expect(onPress).toHaveBeenCalled();
  });

  it('shows author, published date, and tags when not compact', () => {
    const { getByText } = render(<ImageCard item={mockItem} />);
    expect(getByText(/By: John Doe/)).toBeTruthy();
    expect(getByText(/Published:/)).toBeTruthy();
    expect(getByText(/Tags: tag1 tag2/)).toBeTruthy();
  });

  it('does not show author, published date, or tags when compact', () => {
    const { queryByText } = render(<ImageCard item={mockItem} compact />);
    expect(queryByText(/By:/)).toBeNull();
    expect(queryByText(/Published:/)).toBeNull();
    expect(queryByText(/Tags:/)).toBeNull();
  });
});
