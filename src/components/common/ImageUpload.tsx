'use client'
import { useRef, useState } from 'react'

interface ImageUploadProps {
  value: string[]
  onChange: (urls: string[]) => void
  max?: number
}

export function ImageUpload({ value, onChange, max = 5 }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)

  function processFiles(files: FileList | null) {
    if (!files) return
    const remaining = max - value.length
    const toAdd = Array.from(files).slice(0, remaining)
    toAdd.forEach((file) => {
      if (!file.type.startsWith('image/')) return
      const reader = new FileReader()
      reader.onload = (e) => {
        const url = e.target?.result as string
        onChange([...value, url])
      }
      reader.readAsDataURL(file)
    })
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragging(false)
    processFiles(e.dataTransfer.files)
  }

  function remove(index: number) {
    onChange(value.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-3">
      {/* Upload zone */}
      {value.length < max && (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed py-10 transition-all ${
            dragging
              ? 'border-blue-400 bg-blue-50'
              : 'border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-blue-50/50'
          }`}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 text-2xl">
            📷
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-slate-700">
              클릭하거나 이미지를 끌어다 놓으세요
            </p>
            <p className="mt-0.5 text-xs text-slate-400">
              JPG, PNG, WEBP · 최대 {max}장 ({value.length}/{max})
            </p>
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => processFiles(e.target.files)}
      />

      {/* Preview grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
          {value.map((url, i) => (
            <div key={i} className="group relative aspect-square overflow-hidden rounded-xl">
              <img src={url} alt={`이미지 ${i + 1}`} className="h-full w-full object-cover" />
              {/* Overlay on hover */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow transition-transform hover:scale-110"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {/* First image badge */}
              {i === 0 && (
                <div className="absolute bottom-1.5 left-1.5 rounded-md bg-black/60 px-1.5 py-0.5 text-[9px] font-bold text-white backdrop-blur-sm">
                  대표
                </div>
              )}
            </div>
          ))}

          {/* Add more button */}
          {value.length < max && (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex aspect-square items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 text-2xl text-slate-300 transition-all hover:border-blue-300 hover:bg-blue-50/50 hover:text-blue-400"
            >
              +
            </button>
          )}
        </div>
      )}
    </div>
  )
}
