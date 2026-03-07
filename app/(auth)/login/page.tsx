import Link from 'next/link';
import { login } from './actions';

export default async function LoginPage(props: { searchParams: Promise<{ message: string }> }) {
  const searchParams = await props.searchParams;

  return (
    <div className="w-full max-w-md space-y-8 animate-in fade-in duration-500">
      <div className="text-center">
        <h2 className="mt-6 text-3xl font-display font-black tracking-tighter text-sole-white uppercase">
          Welcome Back
        </h2>
        <p className="mt-2 text-sm text-sole-grey font-light">
          Sign in to your account
        </p>
      </div>

      <form className="mt-8 space-y-6" action={login}>
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="sr-only">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-4 py-4 border border-sole-border placeholder-sole-grey text-sole-white bg-sole-surface focus:outline-none focus:ring-1 focus:ring-sole-red focus:border-sole-red sm:text-sm font-light transition-colors"
              placeholder="Email form"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block w-full px-4 py-4 border border-sole-border placeholder-sole-grey text-sole-white bg-sole-surface focus:outline-none focus:ring-1 focus:ring-sole-red focus:border-sole-red sm:text-sm font-light transition-colors"
              placeholder="Password"
            />
          </div>
        </div>

        {searchParams?.message && (
          <p className="text-sm text-sole-red bg-sole-red-glow p-4 border border-sole-red">
            {searchParams.message}
          </p>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-sole-red focus:ring-sole-red border-sole-border rounded-none bg-sole-surface cursor-pointer ring-offset-sole-black"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-sole-grey">
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <Link href="/forgot-password" className="font-mono text-sole-red hover:text-sole-white transition-colors text-[11px] tracking-[1px] uppercase">
              Forgot password?
            </Link>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full btn-primary"
          >
            Sign In
          </button>
        </div>

        <div className="text-center mt-4 pb-4">
          <p className="text-sm text-sole-grey">
            Don't have an account?{' '}
            <Link href="/signup" className="font-mono font-bold text-sole-red hover:text-sole-white transition-colors text-[11px] tracking-[1px] uppercase ml-2 border-b border-transparent hover:border-sole-red">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
