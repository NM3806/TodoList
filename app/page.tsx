import React from "react";
import TodoList from "@/_components/TodoList";

const HomePage: React.FC = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center pt-12 bg-black text-white">
      <h1 className="text-3xl mb-2 font-bold"> Todo List </h1>
      <TodoList/>
    </div>
  );
};

export default HomePage;