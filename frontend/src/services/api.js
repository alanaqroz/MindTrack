const BASE = 'http://localhost:8080'

export const subjectAPI = {
  getAll: () =>
    fetch(`${BASE}/subjects`).then((r) => r.json()),

  create: (name) =>
    fetch(`${BASE}/subjects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    }).then((r) => r.json()),

  update: (id, name) =>
    fetch(`${BASE}/subjects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    }).then((r) => r.json()),

  delete: (id) =>
    fetch(`${BASE}/subjects/${id}`, { method: 'DELETE' }),
}

export const taskAPI = {
  getAll: () =>
    fetch(`${BASE}/tasks`).then((r) => r.json()),

  create: (title, subjectId) =>
    fetch(`${BASE}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, subject: { id: subjectId } }),
    }).then((r) => r.json()),

  complete: (id) =>
    fetch(`${BASE}/tasks/${id}/complete`, { method: 'PUT' }).then((r) => r.json()),

  delete: (id) =>
    fetch(`${BASE}/tasks/${id}`, { method: 'DELETE' }),
}
