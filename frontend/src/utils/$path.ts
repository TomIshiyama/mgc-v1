/* eslint-disable */
// prettier-ignore
export const pagesPath = {
  login: {
    $url: (url?: { hash?: string }) => ({ pathname: '/login' as const, hash: url?.hash })
  },
  top: {
    $url: (url?: { hash?: string }) => ({ pathname: '/top' as const, hash: url?.hash })
  },
  userregistration: {
    $url: (url?: { hash?: string }) => ({ pathname: '/userregistration' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

// prettier-ignore
export type PagesPath = typeof pagesPath
