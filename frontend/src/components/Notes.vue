<template>
    <div class="container">
        <div  v-if="status === 'LOADING'">
            <AppAlert theme="info">
                <template v-slot:title>
                    <strong>Hey there!</strong>
                </template>
                <strong>We are fetching notes... Hang on</strong>
            </AppAlert> 
            <app-spinner theme="info" />
        </div>
        <div v-else-if="status === 'ERROR'">
            <AppAlert theme="danger" >
                <strong>{{error.message}}</strong>
            </AppAlert> 
        </div>    

        <div class="mt-4" v-else>
            <AppAlert theme="info" v-if="notesData.length===0">
            <template v-slot:title>
            <h6>Hey there!</h6>
            </template>
            <h5><i class="fas fa-user-clock"></i> No notes available.</h5>
            <h6>Please contact the admin to add notes</h6>
            </AppAlert> 
            <div class="row">
                <div class="card col-lg-12 col-md-12 col-sm-12 mb-5 mx-2" v-for="notes in notesData" :key="notes.id">
                    <div class="card-body">
                        <h6 class="text-muted float-right">{{notes.uploadDate}}</h6>
                        <h5 class="card-title mt-2">Subject - {{ notes.subject }}</h5>
                        <h6>Description - {{ notes.description }}</h6>
                        <h6>Link - <span class="link font-weight-normal" @click="link(notes.link)">{{notes.link}}</span></h6>
                        <button class="btn btn-danger p-1" type="button" v-on:click="descript(notes._id)" v-if="role === 'admin'">Delete</button>
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
    import { fetchNotesData } from '@/services/notesData';
    import { fetchDelete } from '@/services/delete';
    export default{
        name:'Notes',
        components:{
            AppAlert,
        },
        data(){
            return {
                status: 'LOADING',
                description:null,
                notesData: [],
                type: 'department/notes',
                action:'remove_notes',
                error: null,
            }
        },
        computed: {
            role() {
                return this.$store.state.auth.role;
            },
        },
        methods:{
            link(url){
                window.open(url, "_blank");
            },
            descript(notesId) {
                fetchDelete(this.type,notesId,this.action)
                    // .then(()=>{
                    //     Vue.$toast.open({
                    //         message:'Successfully deleted the notes',
                    //         duration: config.toastDuration,
                    //         type: 'success'
                    //     });
                    //     window.location.href="/department/notes";
                    // })
                    // .catch( error => {
                    //     Vue.$toast.open({
                    //         message: error.response.data.message,
                    //         duration: config.toastDuration,
                    //         type: 'error'
                    //     });
                    // });
                    
            },
        },
        created() { // when component instance is created and its data is available
            this.status = 'LOADING';
            
            fetchNotesData()
                .then( notesData => {
                    this.notesData = notesData;
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