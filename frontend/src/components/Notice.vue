<template>
    <div class="container">
        <h3>Notice</h3>
        <hr class="border-info">
        <router-view></router-view>
        <router-link class="text-reset text-decoration-none" :to="{ name: 'addNotice'}" exact>
            <button class="btn btn-info float-right mt-4">Add Notice</button>
        </router-link>
        
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

        <div class="mt-4" v-else>
            <form @submit.prevent="fetchSearch()" enctype="multipart/form-data">
                <div class="form-group">
                    <textarea class="search" name="search-for" id="search-for" v-model="description" 
                        placeholder="Search for notice" rows="1" required></textarea>
                </div>    
                <button class="btn btn-info" type="submit">Search</button>
            </form>   
            
            <div class="row">
                <div class="card col-lg-12 col-md-12 col-sm-12 mb-5 mx-2" v-for="notice in noticeData" :key="notice.id">
                    <div class="card-body">
                        <h6 class="float-right text-muted">{{ notice.date }}</h6>
                        <h5 class="card-title">{{ notice.title }}</h5>
                        <h6 class="font-weight-normal my-3">{{ notice.description }}</h6>
                        <button class="btn btn-danger" type="button" v-on:click="descript(notice._id)">Delete</button>
                        <hr/>
                        <div class="filesList">
                            {{ notice.file }}
                        </div>    
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import config from '@/config';
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
        methods:{
            descript(noticeId) {
                fetchDelete(this.type,noticeId,this.action)
                    .then(()=>{
                        Vue.$toast.open({
                            message:'Successfully deleted the notice',
                            duration: config.toastDuration,
                            type: 'success'
                        });
                        window.location.href="/notice";
                    })
                    .catch( error => {
                        Vue.$toast.open({
                            message: error.response.data.message,
                            duration: config.toastDuration,
                            type: 'error'
                        });
                    });
                    
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
            
            fetchNoticeData()
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
    width:50%;
    padding: 6px;
    border: 1px solid #04b1da;
    border-radius: 4px;
}

</style>