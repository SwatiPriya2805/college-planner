<template>
    <div class="container">
        <router-view></router-view>
        <router-link class="text-reset text-decoration-none" :to="{ name: 'add', params: { name: this.name } }">
            <button class="btn btn-info float-right">Add event</button>
        </router-link>
        <div class="my-2" v-if="status === 'LOADING'">
            <app-alert theme="info">
                <template v-slot:title>
                    <strong>Hey there!</strong>
                </template>
                <strong>We are fetching {{clubData.name}} events... Hang on</strong>
            </app-alert>
            <app-spinner theme="info" class="align-content-center" />
        </div>
        <div class="my-2" v-else-if="status === 'ERROR'">
            <AppAlert theme="danger" >
                <strong>{{error.message}}</strong>
            </AppAlert> 
        </div>
        <div class="row my-2" v-else>
            <AppAlert theme="info" v-if="clubData.events.length===0">
                <template v-slot:title>
                <h6>Hey there!</h6>
                </template>
                <h5><i class="fas fa-user-clock"></i> No events.</h5>
              </AppAlert> 
            <h3 class="name">{{clubData.name}}</h3>
            <br/>
            <hr class="border-info"/>
            
            <div v-for="event in clubData.events" :key="event._id">
                <div class="card col-lg-12 col-md-12 col-sm-12 mb-5 club-card " >
                    <div class="card-body">
                        <h6 class="text-muted float-right">{{event.uploadDate}}</h6>
                        <h5 class="card-title">Event title : {{ event.title }}</h5>
                        <h6 class="my-1">Description : <span class="font-weight-normal">{{ event.description }}</span></h6>
                        <br/> 
                        <h6>Date : 
                        <span class="my-2 date-color" v-for="dateTime in event.dates" :key="dateTime.date">
                            {{ dateTime.date| date( 'standard' ) }} (<time>{{dateTime.startTime.hours}}</time>:<time>{{dateTime.startTime.minutes}}</time>-<time>{{dateTime.endTime.hours}}</time>:<time>{{dateTime.endTime.minutes}}</time>) &nbsp;</span>
                        </h6>
                        <h6 v-on:click.prevent="links(event.link)">Link : <span class="link"> {{event.link}}</span></h6>
                        <button class="btn btn-danger" type="button" v-on:click="descript(event._id)">Delete</button>
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
    import { fetchDelete } from '@/services/delete';
    import { fetchEventsByName } from '@/services/clubEvents';
    export default {
        name: 'Club',
        props: {
            name: {
                type: String ,
                default: 'IET'
            }
        },
        components:{
            AppAlert,
        },
        data() {
            return {
                status: 'LOADING',
                clubData: [],
                events:[],
                type: 'club',
                action:'remove_club',
                error: null
            }
        },
       
        created() {
            fetchEventsByName( this.name )
                .then(club => {
                    this.club = club;
                    this.status = 'LOADED';
                })
                .catch(error => {
                    this.error = error;
                    this.status = 'ERROR';
                });
        },
        methods:{
            links(url){
                window.open(url, "_blank");
            },
            descript(Id) {
                fetchDelete(this.type,Id,this.action)
                    .then(() => this.$router.push( { name: 'clubList' } ))
                    .then(()=>{
                        Vue.$toast.open({
                            message:'Successfully deleted the club event',
                            duration: config.toastDuration,
                            type: 'success'
                        });
                    })
                    .catch( error => {
                        Vue.$toast.open({
                            message: error.response.data.message,
                            duration: config.toastDuration,
                            type: 'error'
                        });
                    });
                    
            },
        }
    };
</script>

<style scoped>
.club-card{
    box-shadow: 5px 8px 15px #cfcece;
}
.link{
    cursor: pointer;
    color:rgb(16, 128, 233);
}
.date-color{
    color:#0996b6;
}
.name{
    text-shadow: 3px 3px 3px #ababab;
}
</style>