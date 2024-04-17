<script setup>

import { useCurrentUserStore } from '@/stores/currentUser'
import { ref } from 'vue'

const username = ref('')
const email = ref('')
const password = ref('')

const currentUserStore = useCurrentUserStore()

const submitForm = async () => {
  try {
    username.value = document.getElementById('username').value;
    email.value = document.getElementById('email').value;
    password.value = document.getElementById('password').value;
    await currentUserStore.inscription(username.value, email.value, password.value)
  } catch (error) {
    console.error('Error submitting form:', error)
  }
}


</script>

<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div class="text-center lg:text-left">
        <h1 class="text-5xl font-bold">Inscription now!</h1>
        <p class="py-6">Inscrivez vous pour accéder à notre plateforme</p>
      </div>
      <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form class="card-body">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Username</span>
            </label>
            <input
              type="username"
              placeholder="username"
              name="username"
              id="username"
              class="input input-bordered"
              required
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              name="email"
              id="email"
              class="input input-bordered"
              required
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              name="password"
              id="password"
              class="input input-bordered"
              required
            />
          </div>
          <div class="form-control mt-6">
            <button class="btn btn-primary" @click="submitForm">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
