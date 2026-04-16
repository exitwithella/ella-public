'use client'

import { useCallback, useState } from 'react'

export function RevalidateAllButton() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleClick = useCallback(async () => {
    setStatus('loading')
    try {
      const res = await fetch('/api/revalidate-all', { method: 'POST' })
      if (res.ok) {
        setStatus('success')
        setTimeout(() => setStatus('idle'), 3000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 3000)
      }
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }, [])

  const label =
    status === 'loading'
      ? 'Invalidating...'
      : status === 'success'
        ? 'All caches cleared!'
        : status === 'error'
          ? 'Failed — try again'
          : 'Invalidate All Caches'

  return (
    <div style={{ marginTop: 8 }}>
      <button
        type="button"
        onClick={handleClick}
        disabled={status === 'loading'}
        style={{
          padding: '8px 16px',
          borderRadius: 6,
          border: 'none',
          cursor: status === 'loading' ? 'wait' : 'pointer',
          backgroundColor: status === 'success' ? '#5A6B4A' : status === 'error' ? '#c44' : '#333',
          color: '#fff',
          fontSize: 13,
          fontWeight: 500,
        }}
      >
        {label}
      </button>
      <p style={{ fontSize: 12, color: '#666', marginTop: 6 }}>
        Clears all cached page and data responses. Content will be re-fetched on the next request.
      </p>
    </div>
  )
}
