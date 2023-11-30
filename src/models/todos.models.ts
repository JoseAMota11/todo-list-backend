import { pool } from '../db/todos.db';
import type { ResultSetHeader } from 'mysql2';
import type { Todo } from '../types/todo';

const selectTodos = async () => {
  const [rows] = await pool.query('SELECT * FROM todos;');

  return rows as Todo[];
};

const selectOneTodo = async (id: string) => {
  const [rows] = await pool.execute('SELECT * FROM `todos` WHERE `id` = ?;', [
    id,
  ]);

  return rows as Todo[];
};

const insertTodo = async ({ title, description }: Todo) => {
  const [rows] = await pool.execute(
    'INSERT INTO `todos` (`title`, `description`) VALUES (?, ?);',
    [title, description]
  );

  return rows as ResultSetHeader;
};

const updateTodo = async ({ title, description }: Todo, id: Todo['id']) => {
  const [rows] = await pool.execute(
    'UPDATE `todos` SET `title` = ?, `description` = ? WHERE `id` = ?;',
    [title, description, id]
  );

  return rows as ResultSetHeader;
};

const deleteTodo = async (id: Todo['id']) => {
  const [rows] = await pool.execute('DELETE FROM `todos` WHERE `id` = ?;', [
    id,
  ]);

  return rows as ResultSetHeader;
};

export const TodoModels = {
  selectTodos,
  selectOneTodo,
  insertTodo,
  updateTodo,
  deleteTodo,
};