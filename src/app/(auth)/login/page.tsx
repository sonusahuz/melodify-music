'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import React from 'react';
import { auth } from '../firebase';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Card, CardTitle } from '@/components/ui/card';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [password, setPassword] = React.useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success('Login successful');
        router.push('/');
        setLoading(false);
      })
      .catch((error) => {
        toast.error('username or password is incorrect');
        setLoading(false);
      })
      .finally(() => setLoading(false));
  };
  return (
    <div className="h-[63vh] lg:h-[80vh] flex items-center justify-center">
      <Card className="p-8 rounded-lg shadow-md w-96">
        <CardTitle className='mb-5'>Login</CardTitle>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="email">
              Email
            </label>
            <Input
              type="email"
              placeholder="Enter your email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2" htmlFor="password">
              Password
            </label>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              id="password"
              name="password"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            {loading ? 'Loading...' : 'Login'}
          </Button>
          <div className="mt-2">
            <small>
              Don&apos;t have an account?{' '}
              <Link href={'/register'} className="text-blue-500">
                Register
              </Link>
            </small>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Login;
