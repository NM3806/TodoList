"use client";
import React, { useState } from "react";
import { supabase } from "@/providers/db";

const TaskForm: React.FC = () => {
    const [taskText, setTaskText] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskText(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!taskText.trim()) return;

        try {
            const { data, error } = await supabase
                .from("todos")
                .insert([{ text: taskText, completed: false }]);

            if (error) throw error;

            setTaskText("");
        } catch (error) {
            console.error("Error creating todo: ", (error as Error).message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-3 p-3">
            <input
                type="text"
                value={taskText}
                onChange={handleInputChange}
                placeholder="Enter a task..."
                className="flex-1 bg-gray-700 text-white p-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
                Add
            </button>
        </form>
    );
};

export default TaskForm;
