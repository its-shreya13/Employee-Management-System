import * as React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DateInput } from "@/components/DateInput";

export default function CreateEmployee() {
  const { register, handleSubmit, reset, watch } = useForm();
  const [photo, setPhoto] = useState("");
  const [dob, setDob] = useState("");
  const [dateOfJoining, setJoining] = useState("");
  const [age, setAge] = useState("");
  const [fullName, setFullName] = useState("");
  const [sex, setSex] = useState("");
  const [emailId, setEmail] = useState("");

  const watchFirstName = watch("firstName", "");
  const watchMiddleName = watch("middleName", "");
  const watchLastName = watch("lastName", "");

  useEffect(() => {
    setFullName(`${watchFirstName} ${watchMiddleName} ${watchLastName}`.trim());
  }, [watchFirstName, watchMiddleName, watchLastName]);

  useEffect(() => {
    if (dob) {
      const birthDate = new Date(dob);
      const today = new Date();
      const calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        setAge(calculatedAge - 1);
      } else {
        setAge(calculatedAge);
      }
    } else {
      setAge("");
    }
  }, [dob]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    if (photo) {
      formData.append("photo", photo);
    }
    formData.append("dob", dob);
    formData.append("dateOfJoining", dateOfJoining);
    formData.append("age", age);
    formData.append("fullName", fullName);
    

    try {
      const response = await fetch("http://localhost:5000/api/auth/employees", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Failed to create employee: ${response.statusText}`);
      }

      const result = await response.json();
      console.log(result);

      reset({
        empId: "",
        firstName: "",
        middleName: "",
        lastName: "",
        emailId: "",
        phoneNo: "",
        panCardNo: "",
        department: "",
        gender: "",
      });
      setPhoto(null);
      setDob("");
      setJoining("");
      setAge("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 w-full max-w-5xl rounded-md shadow-lg flex">
        <div className="w-1/3 flex justify-center items-center flex-col">
          <label htmlFor="photo" className="cursor-pointer">
            <img
              src={photo ? URL.createObjectURL(photo) : "/placeholder.jpg"}
              alt="Upload"
              className="w-40 h-40 rounded-full object-cover border mb-4"
            />
          </label>
          <input id="photo" type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
          <button type="button" className="mt-4 w-32 p-2 bg-blue-500 text-white rounded" onClick={() => document.getElementById("photo").click()}>
            Upload Photo
          </button>
        </div>

        <div className="w-2/3 pl-8 space-y-6">
          <h1 className="mb-8 text-4xl font-bold text-center">Create Employee</h1>

          <div className="flex flex-col">
            <label htmlFor="empId" className="text-sm font-medium">Employee ID</label>
            <input id="empId" {...register("empId", { required: true })} placeholder="Enter employee ID" className="w-full p-2 border rounded" />
          </div>

         
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col">
              <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
              <input
                id="firstName"
                placeholder="Enter first name"
                {...register("firstName", { required: true })}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="middleName" className="text-sm font-medium">Middle Name</label>
              <input
                id="middleName"
                placeholder="Enter middle name"
                {...register("middleName")}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
              <input
                id="lastName"
                placeholder="Enter last name"
                {...register("lastName", { required: true })}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
                      <div className="flex flex-col">
                         <Label htmlFor="fullName">Full Name</Label>
                         <Input id="fullName" placeholder="Full name" value={fullName} readOnly />
                       </div>
          
         
          <div className="flex flex-col">
            <label htmlFor="sex" className="text-sm font-medium">Gender</label>
            <select
              id="sex"
              className="w-full p-2 border rounded"
              {...register("sex", { required: true })}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          
          <div className="flex flex-col">
            <label htmlFor="dob" className="text-sm font-medium">Date of Birth</label>
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

        
          <div className="flex flex-col">
            <label htmlFor="age" className="text-sm font-medium">Age</label>
            <input
              id="age"
              value={age}
              readOnly
              className="w-full p-2 border rounded"
            />
          </div>

        

        
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="emailId" className="text-sm font-medium">Email</label>
              <input
                id="emailId"
                placeholder="Enter Email Id"
                {...register("emailId", { required: true, pattern: /^[^@]+@[^@]+\.[^@]+$/ })}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="phoneNo" className="text-sm font-medium">Phone Number</label>
              <input
                id="phoneNo"
                placeholder="Enter phone number"
                {...register("phoneNo", { required: true })}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="panCardNo" className="text-sm font-medium">PAN Card Number</label>
              <input
                id="panCardNo"
                placeholder="Enter PAN card number"
                {...register("panCardNo", { required: true })}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="dateOfJoining" className="text-sm font-medium">Date of Joining</label>
              <input
                type="date"
                id="dateOfJoining"
                value={dateOfJoining}
                onChange={(e) => setJoining(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <div className="flex flex-col">
              <label htmlFor="department" className="text-sm font-medium">Department</label>
              <input
                id="department"
                placeholder="Enter department"
                {...register("department", { required: true })}
                className="w-full p-2 border rounded"
              />
            </div>

          
          <div className="flex justify-center mt-6">
            <button type="submit" className="w-full max-w-xs p-3 bg-blue-500 text-white rounded">
              Create Employee
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
