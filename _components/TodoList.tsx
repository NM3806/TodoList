"use client";
import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import TodoItem from "./TodoItem";
import { supabase } from "@/providers/db";

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<any[]>([]);

    const fetchTodos = async () => {
        try {
            let { data: todos, error } = await supabase
                .from("todos")
                .select("*")
                .order("id", { ascending: true });

            if (error) throw error;
            setTodos(todos || []);
        } catch (error) {
            console.error("Error fetching todos:", (error as Error).message);
        }
    };

    useEffect(() => {
        let timerId: NodeJS.Timeout;

        const fetchAndSchedule = async () => {
            await fetchTodos();
            timerId = setTimeout(fetchAndSchedule, 5000);
        };

        fetchAndSchedule();

        return () => clearTimeout(timerId);
    }, []);

    const handleDelete = async (id: number) => {
        try {
            const { error } = await supabase.from("todos").delete().eq("id", id);
            if (error) throw error;
        } catch (error) {
            console.error("Error deleting todo:", (error as Error).message);
        }

        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };

    const handleComplete = async (id: number, completed: boolean) => {
        try {
            const { error } = await supabase
                .from("todos")
                .update({ completed: !completed })
                .eq("id", id);
            if (error) throw error;
        } catch (error) {
            console.error("Error toggling todo completion:", (error as Error).message);
        }

        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, completed: !completed } : todo
            )
        );
    };

    return (
        <div className="max-w-lg mx-auto p-5 mt-5 bg-gray-900 text-white shadow-xl rounded-xl">
            <h2 className="text-center text-2xl font-bold mb-4">📝 My Todo List</h2>
            <TaskForm />
            <div className="space-y-2">
                {todos.length === 0 ? (
                    <p className="text-center text-gray-400">No todos yet!</p>
                ) : (
                    todos.map((todo) => (
                        <TodoItem
                            key={todo.id}
                            id={todo.id}
                            text={todo.text}
                            completed={todo.completed}
                            onDelete={() => handleDelete(todo.id)}
                            onComplete={() => handleComplete(todo.id, todo.completed)}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default TodoList;
