import { FaTrash } from "react-icons/fa";

interface TodoItemProps {
    id: string;
    text: string;
    completed: boolean;
    onDelete: (id: string) => void;
    onComplete: (id: string, completed: boolean) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, text, completed, onDelete, onComplete }) => {
    return (
        <div className="flex items-center justify-between bg-gray-800 p-3 rounded-xl shadow-md transition-transform duration-200 hover:scale-105">
            <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={() => onComplete(id, completed)}
                    className="h-5 w-5 accent-blue-500 cursor-pointer"
                />
                <p className={`text-lg ${completed ? "line-through text-gray-400" : ""}`}>
                    {text}
                </p>
            </div>
            <button
                onClick={() => onDelete(id)}
                className="bg-red-600 hover:bg-red-500 text-white p-2 rounded-lg"
            >
                <FaTrash />
            </button>
        </div>
    );
};

export default TodoItem;
