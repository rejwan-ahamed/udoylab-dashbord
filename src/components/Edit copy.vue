<template>
    <!-- <h1>text</h1> -->

    <!-- header section start here -->
    <header>
        <div class="header-main">
            <div class="herder-left"><img src="../assets/images/udoylab-b.svg" alt="logo" srcset=""></div>
            <div class="header-right">
                <ul>
                    <li><router-link to="/" class="header-links-main">Home</router-link></li>
                    <li>     <router-link to="/add" class="header-links-main">Add post</router-link></li>
                </ul>
            </div>
        </div>
    </header>
    <!-- header section start end -->

    <div class="error-warning" id="error-warning">

    </div>

    <section class="text-editor-main">
        <div class="row g-5">
            <div class="col-md-5 col-lg-4 order-md-last">


                <div class="form-group form-img-main">
                    <label for="exampleFormControlFile1" class="py-3">Choose Post Thumbnail url</label>
                    <input type="url" class="form-control mb-5" id="exampleFormControlFile1"
                        enctype="multipart/form-data" v-model="this.dataup.img1" />
                </div>

                <div class="form-group form-img-main">
                    <label for="exampleFormControlFile1" class="py-3">Choose Thambnail url</label>
                    <input type="url" class="form-control mb-4" id="exampleFormControlFile1"
                        v-model="this.dataup.img2">
                </div>


                <div class="form-group main-form-title-area py-3">
                    <label for="exampleFormControlTextarea1" class="py-2">Post Title</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="this.dataup.title"></textarea>
                </div>
                <div class="form-group main-form-title-area py-3">
                    <label for="exampleFormControlTextarea1" class="py-2">Short Description</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                        v-model="this.dataup.description"></textarea>
                </div>

                <div class="col-md-5 form-tags">
                    <label for="country" class="form-label">Choose tag</label>
                    <select class="form-select" id="country" required="" v-model="this.dataup.tag">
                        <option value="">Choose...</option>
                        <option>Research paper</option>
                        <option>Project</option>
                    </select>
                </div>
            </div>


            <div class="col-md-7 col-lg-8">

                <QuillEditor v-model="this.dataup.content" v-html="this.dataup.content" theme="snow" toolbar="full" />
                <!-- <input type="text" v-model="test" > -->

                <div class="editor-button-main">
                    <button class="post-sub-button-main" v-on:click="update()">Submit</button>
                     <button class="cancel-sub-button-main" data-bs-toggle="modal"
                        data-bs-target="#exampleModal">Cancel</button>
                </div>

                   <!-- Modal -->
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                Do yoy want to discard the post
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-danger" v-on:click="cancel()">Discard</button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    </section>

</template>

<script>
import axios from "axios";
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
export default {
    name: 'UpdateMain',
    components: {
        QuillEditor
    },
    data() {
        return {
            dataup:{
                img1:'',
                img2:'',
                title:'',
                description:'',
                tag:'',
                content:'',
            },
          
        }
    },
    methods: {
        async update() {
            if (this.dataup.img1 == "" || this.dataup.img2 == "" || this.dataup.title == "" || this.dataup.tag == "" || this.dataup.description == "" || this.dataup.content == "") {
                document.getElementById("error-warning").innerHTML = "<div class='px-5 pt-5'><div class='alert alert-warning alert-dismissible fade show'  role='alert'><strong>All fields required!</strong> You should check in on some of those fields below.<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button</div><div/>"
            }
                else {
                let upresults = await axios.put("https://udoylabapi.redhalozenn.xyz/project/"+this.$route.params.id, {
                    "img1": this.dataup.img1,
                    "img2": this.dataup.img2,
                    "title": this.dataup.title,
                    "description": this.dataup.description,
                    "tag": this.dataup.tag,
                    "content": this.dataup.content
                })

                document.getElementById("error-warning").innerHTML = "<div class='p-5'><div class='alert alert-success' role='alert'> post upload successfull</div ></div>"

                console.log(upresults)
            }
        },

          cancel() {
            this.$router.push({ name: 'Cpanel' })
        }

    },
    
  async  mounted(){
        // console.log(this.$route.params.id)
        let uspated = await axios.get("https://udoylabapi.redhalozenn.xyz/project/"+this.$route.params.id)
        //  console.log(uspated.data)
         this.dataup = uspated.data
    }
}
</script>

<style>
@font-face {
    font-family: 'neue1';
    src: url(../assets/fonts/NeueMachina-Light.otf);
}

@font-face {
    font-family: 'neue2';
    src: url(../assets/fonts/NeueMachina-Regular.otf);
}

@font-face {
    font-family: 'neue3';
    src: url(../assets/fonts/NeueMachina-Ultrabold.otf);
}

.text-editor-main {
    padding: 4rem 4rem;
}

.form-img-main {
    display: flex;
    flex-direction: column;
    font-family: 'neue2';
    margin-top: -1rem !important;
}

.main-form-title-area {
    font-family: 'neue2';
}

.form-tags {
    font-family: 'neue2';
}

.post-sub-button-main {
    padding: 0.7rem 2.5rem;
    background-color: #115cfa;
    border: 1px solid #115cfa;
    border-radius: 4px;
    margin-top: 2rem;
    color: white;
    font-family: 'neue1';
    transition: .4s;
}

.post-sub-button-main:hover {
    padding: 0.7rem 2.5rem;
    background-color: #ffffff;
    border: 1px solid #115cfa;
    border-radius: 4px;
    margin-top: 2rem;
    color: #115cfa;
    font-family: 'neue1';
}

.cancel-sub-button-main {
    padding: 0.7rem 2.5rem;
    background-color: #fac711;
    border: 1px solid #fac711;
    border-radius: 4px;
    margin-top: 2rem;
    color: black;
    font-family: 'neue1';
    transition: .4s;
    margin-left: 1rem;
}

.cancel-sub-button-main:hover {
    padding: 0.7rem 2.5rem;
    background-color: #ffffff;
    border: 1px solid #fac711;
    border-radius: 4px;
    margin-top: 2rem;
    color: black;
    font-family: 'neue1';
}

.editor-button-main {
    padding-bottom: 10rem;
}

.ql-toolbar.ql-snow {
    border: 2px solid #115bfa48;
    box-sizing: border-box;
    font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    padding: 8px;
}

.ql-container.ql-snow {
    border: 1.5px solid #115bfa48;
}

textarea#exampleFormControlTextarea1 {
    border: 1.5px solid #115bfa48;
}

select#country {
    border: 1.5px solid #115bfa48;
}

input#exampleFormControlFile1 {
    border: 1.5px solid #115bfa48;
}


@media (min-width: 1008px) and (max-width: 1300px) {
    .text-editor-main {
        padding: 4rem 2rem;


    }
}
</style>