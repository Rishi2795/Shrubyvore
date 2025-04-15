import { SignIn } from '@clerk/clerk-react';

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50 px-4 py-12">
      <div className="max-w-md w-full">
        <SignIn path="/login" routing="path" signUpUrl="/signup" />
      </div>
    </div>
  );
};

export default Login;
