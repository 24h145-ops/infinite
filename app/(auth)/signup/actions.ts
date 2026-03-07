'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const fullName = formData.get('full_name') as string;
  const username = formData.get('username') as string;
  const phone = formData.get('phone') as string;

  const data = {
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        username: username,
        phone: phone || null,
      }
    }
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect(`/signup?message=${encodeURIComponent(error.message)}`)
  }

  // Usually requires email verification. We'll simply redirect with a message.
  redirect('/login?message=Check your email to continue sign in process')
}
