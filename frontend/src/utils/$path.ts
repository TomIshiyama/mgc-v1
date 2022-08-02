/* eslint-disable */
// prettier-ignore
export const pagesPath = {
  error: {
    forbidden: {
      $url: (url?: { hash?: string }) => ({ pathname: '/error/forbidden' as const, hash: url?.hash })
    }
  },
  event: {
    list: {
      $url: (url?: { hash?: string }) => ({ pathname: '/event/list' as const, hash: url?.hash })
    }
  },
  manage: {
    user: {
      _userId: (userId: string | number) => ({
        $url: (url?: { hash?: string }) => ({ pathname: '/manage/user/[userId]' as const, query: { userId }, hash: url?.hash })
      }),
      list: {
        $url: (url?: { hash?: string }) => ({ pathname: '/manage/user/list' as const, hash: url?.hash })
      }
    }
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
  user: {
    _userId: (userId: string | number) => ({
      $url: (url?: { hash?: string }) => ({ pathname: '/user/[userId]' as const, query: { userId }, hash: url?.hash })
    })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

// prettier-ignore
export type PagesPath = typeof pagesPath
