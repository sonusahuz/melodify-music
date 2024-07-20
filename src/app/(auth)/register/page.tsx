'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import React from 'react';
import toast from 'react-hot-toast';
import { auth } from '../firebase';
import { useRouter } from 'next/navigation';
import { Card, CardTitle } from '@/components/ui/card';

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success('Registration successful');
        router.push('/login');
        setLoading(false);
      })
      .catch((error) => {
        toast.error('email id already exists');
        setLoading(false);
      })
      .finally(() => setLoading(false));
  };
  return (
    <div className="h-[65vh] flex items-center justify-center">
      <Card className="p-8 rounded-lg shadow-md w-96">
        <CardTitle className="mb-5">Register</CardTitle>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="username">
              Username
            </label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              id="username"
              name="username"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="email">
              Email
            </label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              id="email"
              name="email"
              required
            />
          </div>
          <div className="mb-4">
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
          <Button className="w-full" type="submit">
            {loading ? 'Loading...' : 'Register'}
          </Button>
          <div className="mt-2">
            <small>
              Already have an account?{' '}
              <Link href={'/login'} className="text-blue-500">
                Login
              </Link>
            </small>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Register;
