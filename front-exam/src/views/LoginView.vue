<script setup>
// récupérer le store utilisateur

// déclarer les variables email et password

// fonction pour soumettre le formulaire

// dans la fonction appeler la fonction login du store

import { useCurrentUserStore } from '@/stores/currentUser'
import { ref } from 'vue'

// Retrieve the user store
const currentUserStore = useCurrentUserStore()

// Declare variables for email and password
const email = ref('')
const password = ref('')

// Function to submit the form
const submitForm = async () => {
  try {
    email.value = document.getElementById('email').value
    password.value = document.getElementById('password').value

    await currentUserStore.login(email.value, password.value)
  } catch (error) {
    console.error('Error submitting form:', error)
  }
}
</script>

<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div class="text-center lg:text-left">
        <h1 class="text-5xl font-bold">Login now!</h1>
        <p class="py-6">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
          exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
        </p>
      </div>
      <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form class="card-body" @submit.prevent="submitForm">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input
              name="email"
              id="email"
              type="email"
              placeholder="email"
              class="input input-bordered"
              required
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input
              name="password"
              id="password"
              type="password"
              placeholder="password"
              class="input input-bordered"
              required
            />
          </div>
          <div class="form-control mt-6">
            <button class="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
