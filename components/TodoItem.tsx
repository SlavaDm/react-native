import React from 'react';

import { StyleSheet, Text, TextInput, View } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { ITodo } from '../interfaces/ITodo';

export default function TodoItem({ todo, deleteTodo, updateTodo }: any) {
  const todoItem = todo as ITodo;

  return (
    <View style={styles.listTile}>
      <View style={styles.lineFirst}>
        <Icon
          name={todoItem.isChecked ? 'check-circle' : 'radio-button-unchecked'}
          style={styles.checkIcon}
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
          style={styles.deleteIcon}
          size={20}
          color="#666666"
          onPress={() => deleteTodo(todoItem.idForDocument)}
        />
      </View>
      {!todoItem.isChecked && (
        <View style={styles.lineSecond}>
          {Date.now() <=
          todoItem.addingTime + Number(todoItem.days) * 3600 * 1000 * 24 ? (
            <Text style={(styles.deadline, styles.haveTime)}>
              Days for ending task:{' '}
              {Math.ceil(
                (todoItem.addingTime +
                  Number(todoItem.days) * 3600 * 1000 * 24 -
                  Date.now()) /
                  (3600 * 1000 * 24)
              )}
            </Text>
          ) : (
            <Text style={(styles.deadline, styles.haveNotTime)}>
              Days overdue:{' '}
              {Math.ceil(
                (Date.now() -
                  (todoItem.addingTime +
                    Number(todoItem.days) * 3600 * 1000 * 24)) /
                  (3600 * 1000 * 24)
              )}
            </Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  listTile: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#666666',
  },
  lineFirst: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  lineSecond: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingLeft: '10%',
  },
  deadline: {
    fontSize: 10,
  },
  haveTime: {
    color: 'green',
  },
  haveNotTime: {
    color: 'red',
  },
  textbox: {
    borderWidth: 1,
    borderColor: '#4082f5',
    borderRadius: 3,
    paddingLeft: 3,
    paddingRight: 3,
    fontSize: 10,
    paddingBottom: -10,
    marginLeft: 5,
  },
  checkIcon: {
    width: '10%',
  },
  title: {
    width: '85%',
    fontSize: 18,
  },
  deleteIcon: {
    width: '5%',
  },
});
