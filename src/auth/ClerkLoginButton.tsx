'use client'

import { SignInButton, useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import type { CSSProperties } from 'react'
import { useEffect } from 'react'

const wrapperStyle: CSSProperties = { marginTop: '1rem', textAlign: 'center' }

const dividerRowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  marginBottom: '1rem',
}

const dividerLineStyle: CSSProperties = {
  flex: 1,
  height: '1px',
  background: 'var(--theme-elevation-150, #ddd)',
}

const dividerTextStyle: CSSProperties = {
  color: 'var(--theme-elevation-500, #888)',
  fontSize: '0.875rem',
}

const buttonStyle: CSSProperties = {
  width: '100%',
  padding: '0.75rem 1.5rem',
  fontSize: '0.9375rem',
  fontWeight: 500,
  border: '1px solid var(--theme-elevation-150, #ddd)',
  borderRadius: '4px',
  background: 'var(--theme-bg, #fff)',
  color: 'var(--theme-text, #333)',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
}

export function ClerkLoginButton() {
  const { isSignedIn } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isSignedIn) {
      router.push('/admin')
    }
  }, [isSignedIn, router])

  return (
    <div style={wrapperStyle}>
      <div style={dividerRowStyle}>
        <div style={dividerLineStyle} />
        <span style={dividerTextStyle}>or</span>
        <div style={dividerLineStyle} />
      </div>
      <SignInButton mode="redirect" forceRedirectUrl="/admin">
        <button type="button" style={buttonStyle}>
          <GoogleIcon />
          Sign in with Google
        </button>
      </SignInButton>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
        fill="#4285F4"
      />
      <path
        d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"
        fill="#34A853"
      />
      <path
        d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.997 8.997 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
        fill="#FBBC05"
      />
      <path
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 6.29C4.672 4.163 6.656 2.58 9 3.58z"
        fill="#EA4335"
      />
    </svg>
  )
}
