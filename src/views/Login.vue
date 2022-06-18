<template>
    <section class="text-center">

        <main class="form-signin w-100 m-auto">

            <img class="mb-4" src="../assets/images/logo.svg" alt="" width="100">
            <h1 class="h3 mb-3 fw-normal">Please Login</h1>

            <div class="form-floating">
                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"
                    v-model="this.email">
                <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating">
                <input type="password" class="form-control" id="floatingPassword" placeholder="Password"
                    v-model="this.password">
                <label for="floatingPassword">Password</label>
            </div>

            <div class="checkbox mb-3">

            </div>
            <button class="login-button" type="submit" v-on:click="login()">Login</button>

        </main>
    </section>
</template>

<script>
import axios from 'axios'
export default {
    name: 'MainLogin',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        async login() {
            let result = await axios.get(
                `https://udoylabapi.redhalozenn.xyz/user?email=${this.email}&password=${this.password}`
            );
            console.log(result)
            if (result.status === 200 & result.data.length > 0) {
                localStorage.setItem("userdata", JSON.stringify(result.data[0]))
                this.$router.push({ name: "Cpanel" });
            }
        },
    },
    mounted() {
        let redirect = localStorage.getItem("userdata")
        if (redirect) {
            this.$router.push({ name: 'Cpanel' })
        }
    }

}
</script>

 <style>
 .bd-placeholder-img {
     font-size: 1.125rem;
     text-anchor: middle;
     -webkit-user-select: none;
     -moz-user-select: none;
     user-select: none;
 }
 
 @media (min-width: 768px) {
     .bd-placeholder-img-lg {
         font-size: 3.5rem;
     }
 }
 
 .b-example-divider {
     height: 3rem;
     background-color: rgba(0, 0, 0, .1);
     border: solid rgba(0, 0, 0, .15);
     border-width: 1px 0;
     box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
 }
 
 .b-example-vr {
     flex-shrink: 0;
     width: 1.5rem;
     height: 100vh;
 }
 
 .bi {
     vertical-align: -.125em;
     fill: currentColor;
 }
 
 .nav-scroller {
     position: relative;
     z-index: 2;
     height: 2.75rem;
     overflow-y: hidden;
 }
 
 .nav-scroller .nav {
     display: flex;
     flex-wrap: nowrap;
     padding-bottom: 1rem;
     margin-top: -1px;
     overflow-x: auto;
     text-align: center;
     white-space: nowrap;
     -webkit-overflow-scrolling: touch;
 }
 </style>