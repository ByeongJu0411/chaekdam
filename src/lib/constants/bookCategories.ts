export const BOOK_CATEGORIES = [
  { value: 'humanities', label: '인문융합콘텐츠' },
  { value: 'business', label: '경영' },
  { value: 'social', label: '사회융합' },
  { value: 'media', label: '미디어콘텐츠융합' },
  { value: 'future', label: '미래융합' },
  { value: 'software', label: '소프트웨어융합' },
  { value: 'international', label: '국제' },
  { value: 'humanities-free', label: '인문융합자율' },
  { value: 'social-free', label: '사회융합자율' },
  { value: 'media-free', label: '미디어콘텐츠융합자율' },
  { value: 'it-free', label: 'IT융합자율' },
] as const

export type BookCategory = (typeof BOOK_CATEGORIES)[number]['value']
