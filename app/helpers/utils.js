export function formatDuck (text, { name, avatar, uid }) {
  return { text, name, avatar, uid, timestamp: Date.now() }
}

export function formatUserInfo (name, avatar, uid) {
  return { name, avatar, uid }
}

export function formatTimestamp (timestamp) {
  const date = new Date(timestamp)
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
}
