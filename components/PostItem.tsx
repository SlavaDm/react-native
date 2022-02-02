import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { IPost } from "../interfaces/IPost";

export const PostItem = ({ title, id, body }: IPost) => {
  return (
    <View style={styles.post}>
      <Text style={styles.title}>Title: {title}</Text>
      <Text style={styles.body}>{body}</Text>
      <Text style={styles.id}>id: {id}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  post: {
    borderRadius: 10,
    backgroundColor: 'rgba(64, 130, 245, 0.2);',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  id: {
    fontSize: 22,
  },
  title: {
    fontSize: 22,
  },
  body: {
    fontSize: 16,
  },
});
