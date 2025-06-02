import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, CheckCircle } from "lucide-react";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

export default function TodoPlanner() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage when tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  interface RemoveTask {
    (id: number): void;
  }

  const removeTask: RemoveTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  interface ToggleComplete {
    (id: number): void;
  }

  const toggleComplete: ToggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="max-w-md p-4 mx-auto mt-10">
      <h1 className="mb-4 text-2xl font-bold">Planer / TODO</h1>
      <div className="flex mb-4 space-x-2">
        <Input
          placeholder="Dodaj nowe zadanie"
          value={newTask}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTask(e.target.value)}
          className="flex-1"
        />
        <Button onClick={addTask}>Dodaj</Button>
      </div>
      <div className="space-y-2">
        {tasks.map((task) => (
          <Card
            key={task.id}
            className={`flex justify-between items-center p-2 ${
              task.completed ? "opacity-50 line-through" : ""
            }`}
          >
            <CardContent
              className="flex-1 p-0 cursor-pointer"
              onClick={() => toggleComplete(task.id)}
            >
              {task.text}
            </CardContent>
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => toggleComplete(task.id)}
              >
                <CheckCircle
                  className={`w-4 h-4 ${
                    task.completed ? "text-green-500" : "text-gray-400"
                  }`}
                />
              </Button>
              <Button
                onClick={() => removeTask(task.id)}
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
