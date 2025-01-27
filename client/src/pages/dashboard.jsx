import { useContext, useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AuthContext } from "../contexts/AuthContext";

export default function DashBoard() {
  const { user } = useContext(AuthContext); 
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalDepartments, setTotalDepartments] = useState(0);

  useEffect(() => {
    
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/employee-list");
        const data = await response.json();

        if (response.ok) {
         
          const employeeCount = data.length;
          const uniqueDepartments = new Set(data.map((employee) => employee.department));
          setTotalEmployees(employeeCount);
          setTotalDepartments(uniqueDepartments.size);
        } else {
          console.error("Failed to fetch employee data:", data.message || "Unknown error");
        }
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployeeData();
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="mr-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-10 p-10">
          
          <div className="rounded-xl bg-muted/50 p-6 text-lg font-semibold">
            OnBoardPro:
            <br />
            <span className="text-sm font-normal">An Employee Management System</span>
          </div>

          
          <div className="rounded-xl bg-muted/50 p-6">
            <p>
              {user?.role === "admin"
                ? "Welcome, your logged in as Admin"
                : user?.role === "user"
                ? "Welcome, your logged in as User"
                : "Loading..."}
            </p>
          </div>

       
          <div className="rounded-xl bg-muted/50 h-48 flex items-center justify-center">
            <div className="image-container">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUAAkvkLy8FevuRZtO6fHxHG_iZzOqUaDktA&s"
                alt="photo"
              />
            </div>
          </div>

          
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 justify-center items-center">
            <div className="rounded-xl bg-muted/50 p-6 text-center">
              No of Employees: <br />
              <span className="text-lg font-bold">{totalEmployees}</span>
            </div>
            <div className="rounded-xl bg-muted/50 p-6 text-center">
              No of Departments: <br />
              <span className="text-lg font-bold">{totalDepartments}</span>
            </div>
          </div>

          
          <footer className="rounded-xl bg-muted/50 p-4 text-center">
          &copy; OnboardPro. All rights reserved.
          </footer>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
