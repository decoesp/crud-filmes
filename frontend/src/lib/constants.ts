export const COLORS = {
  primary: '#8E4EC6',
  soft: '#B744F714',
  background: {
    base: '#121113',
    ui: '#232225',
    hover: '#1A191B',
  },
  border: {
    default: '#49474E',
    light: '#6F6D78',
  },
  text: {
    white: '#FFFFFF',
    gray: {
      300: '#D1D1D1',
      400: '#9CA3AF',
      500: '#6B7280',
    },
  },
  status: {
    success: '#10b981',
    warning: '#FFE000',
    error: '#ef4444',
  },
} as const;

export const DIMENSIONS = {
  button: {
    height: 44,
    minHeight: 44,
    borderRadius: 2,
    padding: '12px 20px',
  },
  input: {
    height: 44,
    borderRadius: 4,
    padding: 16,
  },
  card: {
    borderRadius: 4,
    padding: 16,
    gap: 8,
  },
  movieCard: {
    mobile: {
      width: 183,
      height: 241,
    },
    desktop: {
      width: 235,
      height: 355,
    },
  },
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export const RATING = {
  excellent: 70,
  good: 40,
} as const;
