import Link from 'next/link';
import { forgotPassword } from './actions';

export default async function ForgotPasswordPage(props: { searchParams: Promise<{ message: string }> }) {
  const searchParams = await props.searchParams;

  return (
    <div className="w-full max-w-md space-y-8 animate-in fade-in duration-500">
      <div className="text-center">
        <h2 className="mt-6 text-3xl font-display font-black tracking-tighter text-sole-white uppercase">
          Reset Password
        </h2>
        <p className="mt-2 text-sm text-sole-grey font-light">
          Enter your email to receive a reset link
        </p>
      </div>

      <form className="mt-8 space-y-6" action={forgotPassword}>
        <div>
          <label htmlFor="email" className="sr-only">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="appearance-none rounded-none relative block w-full px-4 py-4 border border-sole-border placeholder-sole-grey text-sole-white bg-sole-surface focus:outline-none focus:ring-1 focus:ring-sole-red focus:border-sole-red sm:text-sm font-light transition-colors"
            placeholder="Email address"
          />
        </div>

        {searchParams?.message && (
          <p className="text-sm text-sole-red bg-sole-red-glow p-4 border border-sole-red">
            {searchParams.message}
          </p>
        )}

        <div>
          <button
            type="submit"
            className="w-full btn-primary"
          >
            Send Reset Link
          </button>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-sole-grey">
            Remember your password?{' '}
            <Link href="/login" className="font-mono font-bold text-sole-red hover:text-sole-white transition-colors text-[11px] tracking-[1px] uppercase ml-2 border-b border-transparent hover:border-sole-red">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
