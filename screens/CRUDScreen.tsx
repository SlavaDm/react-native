import React from 'react';

import {
  StyleSheet,
  View,
  TextInput,
  Button,
  ScrollView,
  Text,
} from 'react-native';

import { db } from '../firebase';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  QueryDocumentSnapshot,
  setDoc,
} from 'firebase/firestore';

import TodoItem from '../components/TodoItem';

import { ITodo } from '../interfaces/ITodo';

export default function CRUDScreen() {
  const [title, setTitle] = React.useState<string>('');

  const [todos, setTodos] = React.useState<ITodo[]>([]);

  const [days, setDays] = React.useState<string>('');

  const [countOfCompletedTasks, setCountOfCompletedTasks] =
    React.useState<number>(0);

  React.useEffect(() => {
    const count = todos.reduce((acc: number, item: ITodo) => {
      if (item.isChecked) {
        return acc + 1;
      }

      return acc;
    }, 0);

    setCountOfCompletedTasks(count);

    return () => {
      setCountOfCompletedTasks(0);
    };
  }, [todos]);

  React.useEffect(() => {
    onSnapshot(collection(db, 'todos'), (snapshot: any) => {
      setTodos(
        snapshot.docs
          .map(
            (item: QueryDocumentSnapshot) =>
              ({
                ...item.data(),
                idForDocument: item.id,
              } as ITodo)
          )
          .sort((first: ITodo, second: ITodo) =>
            first.addingTime > second.addingTime ? 1 : -1
          )
      );
    });
  }, []);

  const addTodo = async (): Promise<void> => {
    if (
      title.length > 0 &&
      days.length > 0 &&
      Number.isInteger(Number(days)) &&
      Number(days) > 0
    ) {
      try {
        await addDoc(collection(db, 'todos'), {
          isChecked: false,
          title: title,
          id: Date.now(),
          days: Number(days),
          addingTime: Date.now(),
        } as ITodo);
        setTitle('');
        setDays('');
      } catch (e) {
        setTitle('');
        setDays('');
      }
    }
  };

  const updateTodo = async (
    idForDocument: string,
    todo: ITodo
  ): Promise<void> => {
    const newTodos = { ...todo, isChecked: !todo.isChecked };

    await setDoc(doc(db, 'todos', idForDocument), newTodos);
  };

  const deleteTodo = async (idForDocument: string): Promise<void> => {
    await deleteDoc(doc(db, 'todos', idForDocument));
  };

  return (
    <View style={styles.container}>
      <View style={styles.todo}>
        <View style={styles.searchContainer}>
          <View style={styles.firstLine}>
            <TextInput
              placeholder="Add a todo"
              value={title}
              onChangeText={(value) => setTitle(value)}
              style={styles.textbox}
            />
          </View>
          <View style={styles.secondLine}>
            {<Text style={styles.daysText}>Days for this task:</Text>}
            <TextInput
              placeholder="days"
              value={days}
              onChangeText={(value) => setDays(value.replace(/[^0-9]/g, ''))}
              style={styles.daysInput}
            />
            <View style={styles.addButton}>
              <Button title="Add" color="#4082f5" onPress={() => addTodo()} />
            </View>
          </View>
        </View>
      </View>
      {todos.length > 0 && (
        <View>
          <Text>
            Tasks completed {countOfCompletedTasks + '/' + todos.length}
          </Text>
        </View>
      )}
      <ScrollView>
        {todos.map((todo: ITodo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo={() => deleteTodo(todo.idForDocument)}
            updateTodo={() => updateTodo(todo.idForDocument, todo)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  todo: {
    flexDirection: 'column',
    width: '100%',
    marginBottom: 5,
    marginTop: 5,
  },
  searchContainer: {
    width: '90%',
    padding: 5,
    borderWidth: 1,
    borderColor: '#4082f5',
    borderRadius: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  textbox: {
    borderWidth: 1,
    borderColor: '#4082f5',
    borderRadius: 8,
    padding: 10,
    width: '100%',
  },
  daysText: {
    marginRight: 5,
  },
  firstLine: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  secondLine: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 10,
    marginTop: 3,
  },
  daysInput: {
    borderWidth: 1,
    borderColor: '#4082f5',
    borderRadius: 3,
    padding: 3,
  },
  addButton: {
    marginLeft: 'auto',
  },
});
