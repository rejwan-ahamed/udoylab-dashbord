<template>
    <!-- header section start here -->
    <header>
        <div class="header-main">
            <div class="herder-left"><img src="../assets/images/udoylab-b.svg" alt="logo" srcset=""></div>
            <div class="header-right">
                <ul>
                    <li><a href="" class="header-links-main">Home</a></li>
                    <li>
                        <router-link to="/add" class="header-links-main">App post</router-link>
                    </li>
                    <li><a href="" class="header-links-main" v-on:click="logout()">Logout</a></li>
                </ul>
            </div>
        </div>
    </header>
    <!-- header section start end -->


    <!-- post section start here -->
    <section class="dashbord-post">
        <div v-for="item in postdata" :key="item.id">
            <div class="post-main">
                <div class="post-img">
                    <img :src="item.img1" srcset="">
                </div>
                <div class="post-title-main">
                    <div class="post-title">{{ item.title }}</div>
                </div>

                <div class="post-button-main">
                    <div class="post-update">
                        <router-link class="update-button" :to="'/update/' + item._id">Update</router-link>
                    </div>
                    <div class="post-delete">
                        <a href="#" class="delete-button" v-on:click="del(item._id)">Delete</a>
                    </div>
                </div>
            </div>
            <div class="hr-bottom"></div>
        </div>
       

    </section>
    <!-- post section end here here -->

</template>

<script>
import axios from 'axios'
export default {
    name: "MainDashbord",

    data() {
        return {
            postdata: ''
        }
    },

    mounted() {
        // let redirect = localStorage.getItem("userdata")
        // if (!redirect) {
        //     this.$router.push({ name: 'Login' })
        // }

        // let posts = await axios.get("http://localhost:3000/post");
        // // console.log(posts.data)
        // this.postdata = posts.data

        this.loaddata()
    },



    methods: {

        logout() {
            localStorage.removeItem("userdata")
            this.$router.push({ name: 'Login' })
        },



        async del(id) {
            console.log(id)
            let delresutl = await axios.delete("https://udoylabapi.redhalozenn.xyz/project/" + id);
            if (delresutl.status == 200) {
                this.loaddata()
            }
            else {
                alert("error")
            }
        },
        async loaddata() {
            let redirect = localStorage.getItem("userdata")
            if (!redirect) {
                this.$router.push({ name: 'Login' })
            }

            let posts = await axios.get("https://udoylabapi.redhalozenn.xyz/project");
            // console.log(posts.data)
            this.postdata = posts.data
        }
    },


}
</script>

<style>
</style>