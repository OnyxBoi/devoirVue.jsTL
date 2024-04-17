import { defineStore } from 'pinia'
import { useCurrentUserStore } from '@/stores/currentUser.js'
import { storeToRefs } from 'pinia'

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: []
  }),

  getters: {},

  actions: {
    getAllNotes() {
      const { token, user } = storeToRefs(useCurrentUserStore())

      return fetch(`http://localhost:3000/users/${user.value.id}/notes`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token.value}`
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch notes')
          }
          return response.json()
        })
        .then(notes => {
          this.notes = notes
        })
        .catch(error => {
          console.error('Error fetching notes:', error)
        })
    },
    createNote(note) {
      const store = useCurrentUserStore()
      const { token, user } = storeToRefs(store)

      if (!user.value.id || !token.value) {
        throw new Error('User ID or token is missing')
      }

      fetch(`http://localhost:3000/users/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token.value
        },
        body: JSON.stringify({
          userId: user.value.id,
          title: note.title,
          content: note.content
        })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to create note')
          }
          this.getAllNotes()
          return response.json()
        })
        .then(data => {
          console.log('Note created successfully:', data)
          this.notes.push(data)
        })
        .catch(error => {
          console.error('Error creating note:', error)
        })
    },
    updateNote(note) {
      console.log(note.title, note.content)
      const { token, user } = storeToRefs(useCurrentUserStore())

      return fetch(`http://localhost:3000/users/${user.value.id}/notes/${note.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token.value
        },
        body: JSON.stringify({
          title: note.title,
          content: note.content
        })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to update note')
          }
          return response.json()
        })
        .then(updatedNote => {
          const index = this.notes.findIndex(n => n.id === note.id)
          if (index !== -1) {
            this.notes[index] = updatedNote
          }
          return updatedNote
        })
        .catch(error => {
          console.error('Error updating note:', error)
        })
    },
    deleteNote(note) {
      const { token , user } = storeToRefs(useCurrentUserStore())
    
      if (!token.value) {
        throw new Error('Token is missing')
      }
    
      fetch(`http://localhost:3000/users/${user.value.id}/notes/${note.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token.value}`
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to delete note')
          }
          console.log('Note deleted successfully')
          this.notes = this.notes.filter(n => n.id !== note.id)
        })
        .catch(error => {
          console.error('Error deleting note:', error)
        })
    }
    
  },

  persist: true
})
