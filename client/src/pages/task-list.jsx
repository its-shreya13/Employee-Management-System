import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";


export default function TaskListPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [taskUpdates, setTaskUpdates] = useState({});
  const [updatingTaskId, setUpdatingTaskId] = useState(null); 
  
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/tasks");
        if (!response.ok) throw new Error("Failed to fetch tasks");
        const data = await response.json();
        setTasks(data);

        const updates = {};
        data.forEach((task) => {
          updates[task._id] = {
            status: task.status || "Pending",
            review: task.review || "",
          };
        });
        setTaskUpdates(updates);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleInputChange = (taskId, field, value) => {
    setTaskUpdates((prev) => ({
      ...prev,
      [taskId]: {
        ...prev[taskId],
        [field]: value,
      },
    }));
  };

  const handleUpdateTask = async (taskId) => {
    const updatedData = taskUpdates[taskId];
    setUpdatingTaskId(taskId); 
    // to update the tasks and save 
    try {
      const response = await fetch(`http://localhost:5000/api/auth/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) throw new Error("Failed to update task");

      const updatedTask = await response.json();
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, ...updatedTask.task } : task
        )
      );
    } catch (err) {
      alert(err.message);
    } finally {
      setUpdatingTaskId(null); 
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/auth/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete task");

      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p className="text-center mt-8">Loading tasks...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="mb-8 text-4xl font-bold text-center">Task List</h1>

      <Table className="employee-table">
        <TableHeader>
          <TableRow>
            <TableHead>Employee ID</TableHead>
            <TableHead>Employee Name</TableHead>
            <TableHead>Task</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Review</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task._id}>
              <TableCell>{task.employee?.empId}</TableCell>
              <TableCell>{task.employee?.fullName}</TableCell>
              <TableCell>
                <Popover>
                  <PopoverTrigger>
                    <span className="cursor-pointer text-black-500">View Description</span>
                  </PopoverTrigger>
                  <PopoverContent>{task.taskDescription}</PopoverContent>
                </Popover>
              </TableCell>
              <TableCell>{new Date(task.startDate).toDateString()}</TableCell>
              <TableCell>{new Date(task.dueDate).toDateString()}</TableCell>
              <TableCell>
                <select
                  value={taskUpdates[task._id]?.status || "Pending"}
                  onChange={(e) => handleInputChange(task._id, "status", e.target.value)}
                  onBlur={() => handleUpdateTask(task._id)} 
                  disabled={updatingTaskId === task._id} 
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </TableCell>
              <TableCell>
                <textarea
                  value={taskUpdates[task._id]?.review || ""}
                  onChange={(e) => handleInputChange(task._id, "review", e.target.value)}
                  onBlur={() => handleUpdateTask(task._id)} 
                  disabled={updatingTaskId === task._id} 
                  placeholder="Write a review..."
                  className="w-full resize-none"
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteTask(task._id)}
                  disabled={updatingTaskId === task._id} 
                >
                  {updatingTaskId === task._id ? "Deleting..." : "Delete"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
