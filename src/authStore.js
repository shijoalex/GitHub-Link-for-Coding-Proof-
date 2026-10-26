import { useSyncExternalStore } from 'react'

let username = ''
const listeners = new Set()

function notify() {
  listeners.forEach((listener) => listener())
}

export function login(name) {
  username = name
  notify()
}

export function logout() {
  username = ''
  notify()
}

export function useUsername() {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    () => username,
    () => '',
  )
}
