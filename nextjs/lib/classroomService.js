// Minimal client-side mock using localStorage.
// Replace functions with real API calls later.

const KEY = 'mock_classrooms'
const MEMBERS_KEY = 'mock_memberships' // { [userId]: string[] }

function read(key, fallback) {
  if (typeof window === 'undefined') return fallback
  try {
    const v = localStorage.getItem(key)
    return v ? JSON.parse(v) : fallback
  } catch {
    return fallback
  }
}
function write(key, value) {
  if (typeof window === 'undefined') return
  localStorage.setItem(key, JSON.stringify(value))
}

export async function getUserClassrooms(userId) {
  const all = read(KEY, [])
  const memberships = read(MEMBERS_KEY, {})
  const ids = memberships[userId] || []
  return all.filter((c) => ids.includes(c.id))
}

export async function createClassroom(userId, name) {
  const all = read(KEY, [])
  const newClassroom = {
    id: cryptoRandomId(),
    code: codeFromName(name),
    name,
    createdAt: Date.now(),
  }
  all.push(newClassroom)
  write(KEY, all)
  // add membership
  const memberships = read(MEMBERS_KEY, {})
  memberships[userId] = Array.from(new Set([...(memberships[userId] || []), newClassroom.id]))
  write(MEMBERS_KEY, memberships)
  return newClassroom
}

export async function joinClassroom(userId, codeOrId) {
  const all = read(KEY, [])
  const found =
    all.find((c) => c.code.toLowerCase() === codeOrId.toLowerCase()) ||
    all.find((c) => c.id === codeOrId)
  if (!found) {
    // optionally auto-create for demo
    throw new Error('Invalid classroom code')
  }
  const memberships = read(MEMBERS_KEY, {})
  memberships[userId] = Array.from(new Set([...(memberships[userId] || []), found.id]))
  write(MEMBERS_KEY, memberships)
  return found
}

function cryptoRandomId() {
  if (typeof window !== 'undefined' && window.crypto?.randomUUID) return crypto.randomUUID()
  return 'id-' + Math.random().toString(36).slice(2, 10)
}
function codeFromName(name) {
  return name.replace(/\s+/g, '-').slice(0, 10).toLowerCase() + '-' + Math.random().toString(36).slice(2, 6)
}
