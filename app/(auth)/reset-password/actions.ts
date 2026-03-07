'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function resetPassword(formData: FormData) {
  const supabase = await createClient()

  const password = formData.get('password') as string

  const { error } = await supabase.auth.updateUser({
    password: password,
  })

  if (error) {
    redirect(`/reset-password?message=${encodeURIComponent(error.message)}`)
  }

  redirect('/login?message=Password updated successfully, please sign in')
}
