/* eslint-disable */
// prettier-ignore
export const pagesPath = {
  events: {
    $url: (url?: { hash?: string }) => ({ pathname: '/events' as const, hash: url?.hash })
  },
  signin: {
    $url: (url?: { hash?: string }) => ({ pathname: '/signin' as const, hash: url?.hash })
  },
  signup: {
    $url: (url?: { hash?: string }) => ({ pathname: '/signup' as const, hash: url?.hash })
  },
  top: {
    $url: (url?: { hash?: string }) => ({ pathname: '/top' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

// prettier-ignore
export type PagesPath = typeof pagesPath
