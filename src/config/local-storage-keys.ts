const prefix = 'trello-clone-'

function createKey(key: string) {
  return `${prefix}${key}`
}

const localStorageKeys = {
  sidebarState: createKey('sidebar-state'),
  mobileSidebarState: createKey('mobile-sidebar-state'),
}

export { localStorageKeys }
