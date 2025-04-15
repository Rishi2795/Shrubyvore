import { SignUp } from '@clerk/clerk-react';

const SignUpPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50 px-4 py-12">
      <div className="max-w-md w-full">
        <SignUp path="/signup" routing="path" signInUrl="/login" />
      </div>
    </div>
  );
};

export default SignUpPage;
