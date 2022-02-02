import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { ITodo } from '../interfaces/ITodo';

export default function TodoItem({ todo, deleteTodo, updateTodo }: any) {
  const todoItem = todo as ITodo;

  return (
    <View style={styles.listTile}>
      <Icon
        name={todoItem.isChecked ? 'check-circle' : 'radio-button-unchecked'}
        style={styles.leading}
        size={20}
        color="#666666"
        onPress={() => updateTodo(todoItem.idForDocument, todoItem)}
      />
      <Text
        style={styles.title}
        onPress={() => updateTodo(todoItem.idForDocument, todoItem)}
      >
        {todoItem.title}
      </Text>
      <Icon
        name="delete"
        style={styles.trailing}
        size={20}
        color="#666666"
        onPress={() => deleteTodo(todoItem.idForDocument)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listTile: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#666666',
  },
  leading: {
    width: '10%',
  },
  title: {
    width: '85%',
    fontSize: 18,
  },
  trailing: {
    width: '5%',
  },
});
