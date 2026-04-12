'use client'

import { FieldLabel, useField } from '@payloadcms/ui'
import type { TextFieldClientComponent } from 'payload'
import type { ComponentType } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'

import manifest from './icon-manifest.json'

import './IconPickerField.scss'

interface IconEntry {
  name: string
  pascalName: string
  tags: string[]
  categories: string[]
}

const ICONS: IconEntry[] = manifest as IconEntry[]

// Module-level map to hold lazily loaded Phosphor icon components
let phosphorIcons: Record<string, ComponentType<{ size?: number; weight?: string }>> | null = null

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return debounced
}

function IconGrid({
  icons: iconsToRender,
  selected,
  onSelect,
  loadedIcons,
}: {
  icons: IconEntry[]
  selected: string
  onSelect: (name: string) => void
  loadedIcons: typeof phosphorIcons
}) {
  return (
    <div className="icon-picker__grid" role="listbox" aria-label="Icon options">
      {iconsToRender.map((icon) => {
        const IconComponent = loadedIcons?.[icon.pascalName]
        const isSelected = selected === icon.pascalName
        return (
          <button
            key={icon.pascalName}
            type="button"
            role="option"
            aria-selected={isSelected}
            aria-label={icon.name}
            title={icon.name}
            onClick={() => onSelect(icon.pascalName)}
            className={`icon-picker__grid-item${isSelected ? ' icon-picker__grid-item--selected' : ''}`}
          >
            {IconComponent ? (
              <IconComponent size={20} weight="regular" />
            ) : (
              <span className="icon-picker__grid-placeholder" aria-hidden="true" />
            )}
          </button>
        )
      })}
    </div>
  )
}

const IconPickerField: TextFieldClientComponent = ({ field, path: pathFromProps }) => {
  const path = pathFromProps ?? field.name
  const { value, setValue, showError } = useField<string>({ path })

  const [modalOpen, setModalOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [loadedIcons, setLoadedIcons] = useState<typeof phosphorIcons>(phosphorIcons)
  const searchRef = useRef<HTMLInputElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const debouncedQuery = useDebounce(query, 150)

  // Load Phosphor icons when modal opens for the first time
  useEffect(() => {
    if (modalOpen && !phosphorIcons) {
      import('@phosphor-icons/react').then((mod) => {
        phosphorIcons = mod as unknown as Record<
          string,
          ComponentType<{ size?: number; weight?: string }>
        >
        setLoadedIcons(phosphorIcons)
        return phosphorIcons
      })
    } else if (modalOpen && phosphorIcons) {
      setLoadedIcons(phosphorIcons)
    }
  }, [modalOpen])

  // Auto-focus search when modal opens
  useEffect(() => {
    if (modalOpen) {
      setTimeout(() => searchRef.current?.focus(), 50)
    }
  }, [modalOpen])

  // Close on ESC
  useEffect(() => {
    if (!modalOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalOpen(false)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [modalOpen])

  // Close on click outside
  useEffect(() => {
    if (!modalOpen) return
    const handler = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setModalOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [modalOpen])

  const filteredIcons = debouncedQuery.trim()
    ? ICONS.filter((icon) => {
        const q = debouncedQuery.toLowerCase()
        return (
          icon.pascalName.toLowerCase().includes(q) ||
          icon.name.includes(q) ||
          icon.tags.some((t) => t.includes(q))
        )
      }).slice(0, 200)
    : ICONS.slice(0, 200)

  const handleSelect = useCallback(
    (iconName: string) => {
      setValue(iconName)
      setModalOpen(false)
      setQuery('')
    },
    [setValue],
  )

  const handleClear = useCallback(() => {
    setValue('')
  }, [setValue])

  const SelectedIcon = value && loadedIcons ? loadedIcons[value] : null

  return (
    <div className={`icon-picker-field${showError ? ' icon-picker-field--error' : ''}`}>
      <FieldLabel label={field.label ?? field.name} required={field.required} />

      <div className="icon-picker-field__control">
        <div className="icon-picker-field__preview">
          {value ? (
            <>
              {SelectedIcon ? (
                <span className="icon-picker-field__preview-icon">
                  <SelectedIcon size={18} weight="regular" />
                </span>
              ) : (
                <span className="icon-picker-field__preview-icon icon-picker-field__preview-icon--loading" />
              )}
              <span className="icon-picker-field__preview-name">{value}</span>
            </>
          ) : (
            <span className="icon-picker-field__preview-empty">No icon selected</span>
          )}
        </div>

        <div className="icon-picker-field__actions">
          <button
            type="button"
            onClick={() => {
              setModalOpen(true)
              if (!loadedIcons && phosphorIcons) setLoadedIcons(phosphorIcons)
            }}
            className="icon-picker-field__btn icon-picker-field__btn--primary"
          >
            {value ? 'Change' : 'Choose icon'}
          </button>
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="icon-picker-field__btn icon-picker-field__btn--ghost"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {modalOpen && (
        <div
          className="icon-picker__overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Icon picker"
        >
          <div className="icon-picker__modal" ref={modalRef}>
            <div className="icon-picker__header">
              <input
                ref={searchRef}
                type="search"
                placeholder="Search icons…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="icon-picker__search"
                aria-label="Search icons"
              />
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="icon-picker__close"
                aria-label="Close icon picker"
              >
                ✕
              </button>
            </div>

            <div className="icon-picker__body">
              {!loadedIcons ? (
                <div className="icon-picker__loading">Loading icons…</div>
              ) : (
                <>
                  <p className="icon-picker__count">
                    {debouncedQuery.trim()
                      ? `${filteredIcons.length} result${filteredIcons.length !== 1 ? 's' : ''}`
                      : `Showing 200 of ${ICONS.length} icons — search to filter`}
                  </p>
                  <IconGrid
                    icons={filteredIcons}
                    selected={value ?? ''}
                    onSelect={handleSelect}
                    loadedIcons={loadedIcons}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default IconPickerField
