import dynamic from 'next/dynamic';

// Dynamically import the Login component with SSR disabled
const Login = dynamic(() => import('@/components/login'), { ssr: false });

export default function LoginPage() {
  return <Login />;
}

