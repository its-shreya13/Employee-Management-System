import { LoginForm } from "@/components/login-form"

export default function Page() {
  return (
    (<div className="flex min-h  items-center justify-center p-6 md:p-4">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>)
  );
}
