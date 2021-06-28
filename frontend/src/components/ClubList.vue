<!-- List of clubs at bit mesra
    card -> logo about social media links (pass all clubs data as props) pure frontend
    fetch and display data (use id iet ieee) fetch data accordingly
-->
<template>
    <div class="container">
        <h3>Notice</h3>
        <hr class="border-info">
        <div  v-if="status === 'LOADING'">
        <AppAlert theme="info">
            <template v-slot:title>
                <strong>Hey there!</strong>
            </template>
            <strong>We are fetching list of clubs... Hang on</strong>
        </AppAlert> 
        <app-spinner theme="info" class="align-content-center" />
        </div>
        <div v-else-if="status === 'ERROR'">
            <AppAlert theme="danger" >
                <strong>{{error.message}}</strong>
            </AppAlert> 
        </div>    

        <div class="row" v-else>
            <div class="card col-lg-12 col-md-12 col-sm-12 mb-5 club-card " v-for="club in clubData" :key="club.id">
                <router-link class="text-reset text-decoration-none" :to="{ name: 'club', params: { name: club.name } }">
                    <div class="card-body row">
                        <div class="col col-lg-3 col-md-4 col-sm-9">
                            <img
                            :src="require(`../assets/${club.img}`)" 
                            :alt="club.name"
                            class="image float-left pr-4 pb-2"
                            height="200"        
                            />
                            <h5 class="my-1">Contact : 
                                <span v-on:click.prevent="links(club.linkdin)" class="link px-2 icon1"><i class="fab fa-linkedin"></i></span>
                                <span v-on:click.prevent="links(club.facebook)" class="link px-2 icon2"><i class="fab fa-facebook-square"></i></span>
                            </h5>
                        </div>
                        <div class="col-lg-9 col-md-8 col-sm-12">
                            <h3 class="card-title name ">{{ club.name }}</h3>
                            <h5 class="my-2 font-weight-normal">{{ club.description }}</h5>
                        </div>     
                    </div>
                </router-link>    
            </div>
                
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import config from '@/config';
    import { fetchClubs } from '@/services/clubs';
    export default {
        name: 'ClubList',
        data(){
            return {
                status: 'LOADING',
                error: null,
                clubData: [],   
            };
        },
        created() {
                fetchClubs()
                    .then(clubs => {
                        this.clubs = clubs;
                        this.status = 'LOADED';
                    })
                    .then(()=>{
                            Vue.$toast.open({
                                message:'Click on any club to view events',
                                duration: config.toastDuration,
                                type: 'success'
                            });
                        })
                    .catch(error => {
                        this.error = error;
                        this.status = 'ERROR';
                    });
            },
        methods:{
            links(url){
                window.open(url, "_blank");
            }
        }  
    }

</script>

<style scoped>
    .club-card{
        box-shadow: 5px 8px 15px #888888;
    }
    .card{
        cursor: pointer;
    }
    .link-color{
        color:rgb(19, 137, 247);
    }
    .icon1{
        font-size: medium;
        font-size:25px;
        color:#027bb8;
    }
    .icon2{
        font-size: medium;
        font-size:25px;
        color:#4267B2;
    }
    .name{
        text-shadow: 3px 3px 3px #ababab;
    }
    .image{
        width:100%;
    }
    @media screen and (min-width: 300px) and (max-width:500px) {
        .image{
            width: 100%;
        }
    }
</style>
            
       