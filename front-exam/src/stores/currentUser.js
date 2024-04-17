import { defineStore } from 'pinia'
import router from '@/router'

export const useCurrentUserStore = defineStore('currentUser', {
  state: () => ({
    user: {},
    token: null
  }),

  getters: {},

  actions: {
    async inscription(username, email, password) {
      try {
        const response = await fetch('http://localhost:3000/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username,
            email,
            password
          })
        })

        if (!response.ok) {
          throw new Error('Failed to create user')
        }

        router.push('/login')

      } catch (error) {
        console.error('Error creating user:', error)
      }
    },
    async login(email, password) {
      try {
        console.log('Attempting login...')
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email,
            password
          })
        })
    
        console.log('Login response:', response)
    
        if (!response.ok) {
          console.error('Login failed:', response.statusText)
          throw new Error('Failed to login')
        }
    
        const data = await response.json()
    
        // Set current user data
        this.setCurrentUser({ user: data.user, token: data.token })
    
        // Redirect the user to the dashboard or any other desired route
        router.push('/home')
    
      } catch (error) {
        console.error('Error logging in:', error)
      }
    },
    setCurrentUser(data) {
      this.user = data.user
      this.token = data.token
    },
    updateInfo(data) {
      // exemple de requete avec le token
      fetch('http://localhost:3000/users/' + this.user.id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.token
        },
        body: data
      })
        .then((res) => res.json())
        .then((data) => {
          this.user = data.user
        })
        .catch((err) => {
          console.error(err)
        })
    },
    logout() {
      this.user = {}
      this.token = null
    }
  },

  persist: true
})
