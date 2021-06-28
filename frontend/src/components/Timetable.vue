<template>
    <div class="container">
        <div  v-if="status === 'LOADING'">
            <AppAlert theme="info">
                <template v-slot:title>
                    <strong>Hey there!</strong>
                </template>
                <strong>We are fetching timetable... Hang on</strong>
            </AppAlert> 
            <app-spinner theme="info" />
        </div>
        <div v-else-if="status === 'ERROR'">
            <AppAlert theme="danger" >
                <strong>{{error.message}}</strong>
            </AppAlert> 
        </div>    

        <div class="mt-4" v-else>
            <div class="row">
                <div class="card col-lg-12 col-md-12 col-sm-12 mb-5 mx-2" v-for="table in timetableData" :key="table.id">
                    <div class="card-body">
                        <h6 class="text-muted float-right">{{notes.uploadDate}}</h6>
                        <h6 class="float-right text-muted">Semester- {{table.semester}}</h6>
                        <button class="btn btn-danger" type="button" v-on:click="descript(table._id)">Delete</button>
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
    import { fetchTimetableData } from '@/services/timetableData';
    import { fetchDelete } from '@/services/delete';
    export default{
        name:'Notes',
        components:{
            AppAlert,
        },
        data(){
            return {
                status: 'LOADING',
                timetableData: [],
                type: 'timetable',
                action:'remove_timetable',
                error: null,
            }
        },
        methods:{
            descript(Id) {
                fetchDelete(this.type,Id,this.action)
                    .then(()=>{
                        Vue.$toast.open({
                            message:'Successfully deleted the timetable',
                            duration: config.toastDuration,
                            type: 'success'
                        });
                        window.location.href="/department/timetable";
                    })
                    .catch( error => {
                        Vue.$toast.open({
                            message: error.response.data.message,
                            duration: config.toastDuration,
                            type: 'error'
                        });
                    });
                    
            }
        },
        created() { // when component instance is created and its data is available
            this.status = 'LOADING';
            
            fetchTimetableData()
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
.link{
    cursor: pointer;
    color:rgb(16, 128, 233);
}
</style>