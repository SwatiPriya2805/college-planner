<template>
    <div class="container mt-5 pt-5">
        <h3>Notice</h3>
        <hr class="border-info">
        <div class="my-2" v-if="status === 'LOADING'">
            <AppAlert theme="info">
                <template v-slot:title>
                    <strong>Hey there!</strong>
                </template>
                <strong>We are fetching notice... Hang on</strong>
            </AppAlert> 
            <app-spinner theme="info" />
        </div>
        <div class="my-2" v-else-if="status === 'ERROR'">
            <AppAlert theme="danger" >
                <strong>{{error.message}}</strong>
            </AppAlert> 
        </div>     

        <div class="mt-3" v-else>
            
            <router-view></router-view>
            <router-link class="text-reset text-decoration-none" :to="{ name: 'addNotice'}" exact v-if="role === 'admin'">
                <button class="btn btn-info float-right ">Add Notice</button>
            </router-link>
            <form  @submit.prevent="fetchSearch()" enctype="multipart/form-data">
                <div class="form-group">
                    <textarea class="search " name="search-for" id="search-for" v-model="description" 
                        placeholder="Search for notice" rows="1" required></textarea>
                </div>    
                <button class="btn btn-info mb-3" type="submit">Search</button>
            </form>   
            <AppAlert class="mt-3" theme="info" v-if="noticeData.length===0">
                <template v-slot:title>
                <h6>Hey there!</h6>
                </template>
                <h5><i class="fas fa-user-clock"></i> No notice available.</h5>
                <h6>Please contact the admin to add notice</h6>
            </AppAlert> 

            
            <div class="row">
                <div class="card col-lg-12 col-md-12 col-sm-12 mb-5 mx-2" v-for="notice in noticeData" :key="notice.id">
                    <div class="card-body">
                        <h6 class="float-right text-muted">{{ notice.date }}</h6>
                        <h5 class="card-title mt-2">Title - {{ notice.title }}</h5>
                        <h6 class="my-3">Description - {{ notice.description }}</h6>
                        <button class="btn btn-danger float-lg-right mb-2" type="button" v-on:click="descript(notice._id)" v-if="role === 'admin'">Delete</button>
                        <img
                            :src="`${notice.image}`" 
                            :alt="notice.title"
                            class="image float-left pr-4 pb-2"
                            width="600"        
                        />  
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
    // import Vue from 'vue';
    // import config from '@/config';
    import AppAlert from '@/components/utils/AppAlert';
    import { fetchNoticeData } from '@/services/noticeData';
    import { fetchDelete } from '@/services/delete';
    export default{
        name:'Notice',
        components:{
            AppAlert,
        },
        data(){
            return {
                status: 'LOADING',
                description:null,
                noticeData: [],
                type: 'notice',
                action:'remove_notice',
                error: null,
            }
        },
        computed: {
            role() {
                return this.$store.state.auth.role;
            },
        },
        methods:{
            descript(noticeId) {
                fetchDelete(this.type,noticeId,this.action)
                    // .then(()=>{
                    //     Vue.$toast.open({
                    //         message:'Successfully deleted the notice',
                    //         duration: config.toastDuration,
                    //         type: 'success'
                    //     });
                    //     window.location.href="/notice";
                    // })
                    // .catch( error => {
                    //     Vue.$toast.open({
                    //         message: error.response.data.message,
                    //         duration: config.toastDuration,
                    //         type: 'error'
                    //     });
                    // });
                    
            },
            fetchSearch(){
                fetchNoticeData(this.description)
                    .then( noticeData => {
                        this.noticeData = noticeData;
                        this.status = 'LOADED';
                    })
                    .catch( error => {
                        this.error = error;
                        this.status = 'ERROR'
                    })
            },
        },
        created() { // when component instance is created and its data is available
            this.status = 'LOADING';
            
            fetchNoticeData(this.description)
                .then( noticeData => {
                    this.noticeData = noticeData;
                    this.status = 'LOADED';
                })
                .catch( error => {
                    this.error = error;
                    this.status = 'ERROR'
                })

        },
    }

</script>

<style scoped>

.card{
    box-shadow: 5px 8px 15px #888888;
}
.card-body{
    padding: 0.7rem 0.3rem;
}
.card-plus{
    min-height: 330px;
}
.add-more {
  font-size: xx-large;
  text-align: center;
  position: absolute;
  top: 40%;
  left: 45%;
  cursor: pointer;
}
.search{
    width:40%;
    padding: 6px;
    border: 1px solid #04b1da;
    border-radius: 4px;
}
@media screen and (min-width: 300px) and (max-width:500px) {
    .image{
        width:300px !important; 
    }
}
</style>