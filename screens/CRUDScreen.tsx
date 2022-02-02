import React from 'react';

import { StyleSheet, View, TextInput, Button, ScrollView } from 'react-native';

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

  React.useEffect(() => {
    onSnapshot(collection(db, 'todos'), (snapshot: any) => {
      setTodos(
        snapshot.docs.map(
          (item: QueryDocumentSnapshot) =>
            ({
              ...item.data(),
              idForDocument: item.id,
            } as ITodo)
        )
      );
    });
  }, []);

  const addTodo = async (): Promise<void> => {
    if (title.length > 0) {
      try {
        await addDoc(collection(db, 'todos'), {
          isChecked: false,
          title: title,
          id: Date.now(),
        });
        setTitle('');
      } catch (e) {
        setTitle('');
      }
    }
  };

  const updateTodo = async (id: string, todo: ITodo): Promise<void> => {
    const newTodos = { ...todo, isChecked: !todo.isChecked };

    await setDoc(doc(db, 'todos', id), newTodos);
  };

  const deleteTodo = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, 'todos', id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.todo}>
        <TextInput
          placeholder="Add a todo"
          value={title}
          onChangeText={(value) => setTitle(value)}
          style={styles.textbox}
        />
        <Button title="Add" color="#4082f5" onPress={() => addTodo()} />
      </View>
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
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textbox: {
    borderWidth: 1,
    borderColor: '#4082f5',
    borderRadius: 8,
    padding: 10,
    margin: 10,
    width: '80%',
  },
});
