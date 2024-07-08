/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SignupImport } from './routes/signup'
import { Route as LoginImport } from './routes/login'
import { Route as AuthenticatedImport } from './routes/_authenticated'
import { Route as AuthenticatedIndexImport } from './routes/_authenticated/index'
import { Route as AuthenticatedTodosImport } from './routes/_authenticated/todos'
import { Route as AuthenticatedTodosCreateImport } from './routes/_authenticated/todos_/create'
import { Route as AuthenticatedTodosIdImport } from './routes/_authenticated/todos_/$id'
import { Route as AuthenticatedTodosUpdateIdImport } from './routes/_authenticated/todos_/update.$id'
import { Route as AuthenticatedTodosCreateModalImport } from './routes/_authenticated/todos/create.modal'
import { Route as AuthenticatedTodosIdModalImport } from './routes/_authenticated/todos/$id.modal'

// Create/Update Routes

const SignupRoute = SignupImport.update({
  path: '/signup',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedRoute = AuthenticatedImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedIndexRoute = AuthenticatedIndexImport.update({
  path: '/',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedTodosRoute = AuthenticatedTodosImport.update({
  path: '/todos',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedTodosCreateRoute = AuthenticatedTodosCreateImport.update({
  path: '/todos/create',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedTodosIdRoute = AuthenticatedTodosIdImport.update({
  path: '/todos/$id',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedTodosUpdateIdRoute = AuthenticatedTodosUpdateIdImport.update(
  {
    path: '/todos/update/$id',
    getParentRoute: () => AuthenticatedRoute,
  } as any,
)

const AuthenticatedTodosCreateModalRoute =
  AuthenticatedTodosCreateModalImport.update({
    path: '/create/modal',
    getParentRoute: () => AuthenticatedTodosRoute,
  } as any)

const AuthenticatedTodosIdModalRoute = AuthenticatedTodosIdModalImport.update({
  path: '/$id/modal',
  getParentRoute: () => AuthenticatedTodosRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_authenticated': {
      id: '/_authenticated'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticatedImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/signup': {
      id: '/signup'
      path: '/signup'
      fullPath: '/signup'
      preLoaderRoute: typeof SignupImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated/todos': {
      id: '/_authenticated/todos'
      path: '/todos'
      fullPath: '/todos'
      preLoaderRoute: typeof AuthenticatedTodosImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/': {
      id: '/_authenticated/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof AuthenticatedIndexImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/todos/$id': {
      id: '/_authenticated/todos/$id'
      path: '/todos/$id'
      fullPath: '/todos/$id'
      preLoaderRoute: typeof AuthenticatedTodosIdImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/todos/create': {
      id: '/_authenticated/todos/create'
      path: '/todos/create'
      fullPath: '/todos/create'
      preLoaderRoute: typeof AuthenticatedTodosCreateImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/todos/$id/modal': {
      id: '/_authenticated/todos/$id/modal'
      path: '/$id/modal'
      fullPath: '/todos/$id/modal'
      preLoaderRoute: typeof AuthenticatedTodosIdModalImport
      parentRoute: typeof AuthenticatedTodosImport
    }
    '/_authenticated/todos/create/modal': {
      id: '/_authenticated/todos/create/modal'
      path: '/create/modal'
      fullPath: '/todos/create/modal'
      preLoaderRoute: typeof AuthenticatedTodosCreateModalImport
      parentRoute: typeof AuthenticatedTodosImport
    }
    '/_authenticated/todos/update/$id': {
      id: '/_authenticated/todos/update/$id'
      path: '/todos/update/$id'
      fullPath: '/todos/update/$id'
      preLoaderRoute: typeof AuthenticatedTodosUpdateIdImport
      parentRoute: typeof AuthenticatedImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  AuthenticatedRoute: AuthenticatedRoute.addChildren({
    AuthenticatedTodosRoute: AuthenticatedTodosRoute.addChildren({
      AuthenticatedTodosIdModalRoute,
      AuthenticatedTodosCreateModalRoute,
    }),
    AuthenticatedIndexRoute,
    AuthenticatedTodosIdRoute,
    AuthenticatedTodosCreateRoute,
    AuthenticatedTodosUpdateIdRoute,
  }),
  LoginRoute,
  SignupRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_authenticated",
        "/login",
        "/signup"
      ]
    },
    "/_authenticated": {
      "filePath": "_authenticated.tsx",
      "children": [
        "/_authenticated/todos",
        "/_authenticated/",
        "/_authenticated/todos/$id",
        "/_authenticated/todos/create",
        "/_authenticated/todos/update/$id"
      ]
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/signup": {
      "filePath": "signup.tsx"
    },
    "/_authenticated/todos": {
      "filePath": "_authenticated/todos.tsx",
      "parent": "/_authenticated",
      "children": [
        "/_authenticated/todos/$id/modal",
        "/_authenticated/todos/create/modal"
      ]
    },
    "/_authenticated/": {
      "filePath": "_authenticated/index.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/todos/$id": {
      "filePath": "_authenticated/todos_/$id.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/todos/create": {
      "filePath": "_authenticated/todos_/create.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/todos/$id/modal": {
      "filePath": "_authenticated/todos/$id.modal.tsx",
      "parent": "/_authenticated/todos"
    },
    "/_authenticated/todos/create/modal": {
      "filePath": "_authenticated/todos/create.modal.tsx",
      "parent": "/_authenticated/todos"
    },
    "/_authenticated/todos/update/$id": {
      "filePath": "_authenticated/todos_/update.$id.tsx",
      "parent": "/_authenticated"
    }
  }
}
ROUTE_MANIFEST_END */
