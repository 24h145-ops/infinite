import Link from 'next/link';
import { signup } from './actions';

export default async function SignupPage(props: { searchParams: Promise<{ message: string }> }) {
  const searchParams = await props.searchParams;

  return (
    <div className="w-full max-w-md space-y-8 animate-in fade-in duration-500">
      <div className="text-center">
        <h2 className="mt-6 text-3xl font-display font-black tracking-tighter text-sole-white uppercase">
          Join SOLE
        </h2>
        <p className="mt-2 text-sm text-sole-grey font-light">
          Create your account
        </p>
      </div>

      <form className="mt-8 space-y-4" action={signup}>
        <div>
          <label htmlFor="full_name" className="sr-only">Full Name</label>
          <input
            id="full_name"
            name="full_name"
            type="text"
            required
            className="appearance-none rounded-none block w-full px-4 py-4 border border-sole-border placeholder-sole-grey text-sole-white bg-sole-surface focus:outline-none focus:ring-1 focus:ring-sole-red focus:border-sole-red sm:text-sm font-light transition-colors"
            placeholder="Full Name"
          />
        </div>
        <div>
          <label htmlFor="username" className="sr-only">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            required
            className="appearance-none rounded-none block w-full px-4 py-4 border border-sole-border placeholder-sole-grey text-sole-white bg-sole-surface focus:outline-none focus:ring-1 focus:ring-sole-red focus:border-sole-red sm:text-sm font-light transition-colors"
            placeholder="Username"
          />
        </div>
        <div>
          <label htmlFor="email" className="sr-only">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="appearance-none rounded-none block w-full px-4 py-4 border border-sole-border placeholder-sole-grey text-sole-white bg-sole-surface focus:outline-none focus:ring-1 focus:ring-sole-red focus:border-sole-red sm:text-sm font-light transition-colors"
            placeholder="Email address"
          />
        </div>
        <div>
          <label htmlFor="phone" className="sr-only">Phone Number (Optional)</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="appearance-none rounded-none block w-full px-4 py-4 border border-sole-border placeholder-sole-grey text-sole-white bg-sole-surface focus:outline-none focus:ring-1 focus:ring-sole-red focus:border-sole-red sm:text-sm font-light transition-colors"
            placeholder="Phone Number (Optional for UPI)"
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            className="appearance-none rounded-none block w-full px-4 py-4 border border-sole-border placeholder-sole-grey text-sole-white bg-sole-surface focus:outline-none focus:ring-1 focus:ring-sole-red focus:border-sole-red sm:text-sm font-light transition-colors"
            placeholder="Password"
          />
        </div>

        {searchParams?.message && (
          <p className="text-sm text-sole-red bg-sole-red-glow p-4 border border-sole-red">
            {searchParams.message}
          </p>
        )}

        <div className="flex items-center mt-6">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            required
            className="h-4 w-4 text-sole-red focus:ring-sole-red border-sole-border rounded-none bg-sole-surface cursor-pointer ring-offset-sole-black"
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-sole-grey">
            I agree to the <Link href="#" className="text-sole-red hover:text-sole-white transition-colors">Terms & Conditions</Link>
          </label>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full btn-primary"
          >
            Create Account
          </button>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-sole-grey">
            Already have an account?{' '}
            <Link href="/login" className="font-mono font-bold text-sole-red hover:text-sole-white transition-colors text-[11px] tracking-[1px] uppercase ml-2 border-b border-transparent hover:border-sole-red">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
