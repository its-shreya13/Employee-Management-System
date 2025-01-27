import * as React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToastProvider, Toast, ToastTitle, ToastDescription, ToastClose } from "@/components/ui/toast"; 
import { DateInput } from "@/components/DateInput";

export default function TaskAssignPage() {
  const { register, handleSubmit, setValue, reset } = useForm();
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleIdChange = async (e) => {
    const id = e.target.value;

    if (id) {
      try {
        const response = await fetch(`http://localhost:5000/api/auth/employee/${id}`);
        const employee = await response.json();

        if (employee) {
          setValue("employeeName", employee.fullName);
        } else {
          setValue("employeeName", "");
        }
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    }
  };

  const onSubmit = async (data) => {
    try {
      const payload = {
        empId: data.employeeId,
        taskDescription: data.taskDescription,
        startDate: startDate ,        
        dueDate: dueDate,
      };
  
      const response = await fetch("http://localhost:5000/api/auth/save-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        const result = await response.json();
  
        reset({
          employeeName: "",
          employeeId: "",
          taskDescription: "",
        });
        setStartDate("");
        setDueDate("");
      } else {
        const error = await response.json();
        throw new Error(error.message || "Failed to assign task");
      }
    } catch (error) {
      console.error("Error in onSubmit:", error);
      
    }
  };

  return (
    <div className="flex flex-col items-center justify-center  bg-gray-100 p-4 text-center text-1xl pt-5">
      <h1 className="mb-8 text-4xl font-bold text-center">Assign a Task!!</h1>
      <div className="w-screen  flex justify-center items-center">

      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Task Assignment Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div>
              <Label htmlFor="employeeId">Employee ID</Label>
              <Input
                id="employeeId"
                type="text"
                placeholder="Enter Employee ID"
                {...register("employeeId", { required: "Employee ID is required" })}
                onChange={handleIdChange}
              />
            </div>

            <div>
              <Label htmlFor="employeeName">Employee Name</Label>
              <Input
                id="employeeName"
                type="text"
                placeholder="Auto-filled"
                {...register("employeeName", { required: "Employee name is required" })}
                readOnly
              />
            </div>

            <div>
              <Label htmlFor="taskDescription">Task Description</Label>
              <Input
                id="taskDescription"
                type="text"
                placeholder="Enter task description..."
                {...register("taskDescription", { required: "Task description is required" })}
              />
            </div>

            <div>
              <Label>Start Date</Label>
              <DateInput
                value={startDate}
                onChange={setStartDate}
              />
            </div>

            <div>
              <Label>Due Date</Label>
              <DateInput
                value={dueDate}
                onChange={setDueDate}
              />
            </div>

            <Button type="submit" className="w-full">
              Assign Task
            </Button>
          </form>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
