import React from 'react';

import { SafeAreaView, FlatList } from 'react-native';

import { PostItem } from '../components/PostItem';

import { IPost } from '../interfaces/IPost';

export default function APIScreen() {
  const [postItems, setPostsItems] = React.useState<IPost[]>([]);

  React.useEffect(() => {
    (async (): Promise<void> => {
      const posts = await fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((res) => res.slice(0, 10));

      setPostsItems(posts);
    })();
  }, []);

  const renderItem = ({ item }: any) => {
    const post = item as IPost;

    return <PostItem title={post.title} id={post.id} body={post.body} />;
  };

  return (
    <SafeAreaView>
      <FlatList
        data={postItems}
        renderItem={renderItem}
        keyExtractor={(post: any) => post.id}
      />
    </SafeAreaView>
  );
}
