<template>
        <div class="container" id="add-event-box">
            <h3 class="text-white">Add a new club event for {{this.name}}</h3>
            <hr>
            <!---input form for add new event-->
            <form @submit.prevent="addEvent()" enctype="multipart/form-data">
                <div class="form-group">
                    <label for="title">Title</label>
                        <input 
                            type="text"
                            class="form-control"
                            name="title"
                            id="title"
                            v-model.trim="form.title"
                            placeholder="Event name" 
                            @blur="$v.form.title.$touch()"
                            :class="{
                                'is-invalid': shouldAppendErrorClass($v.form.title),
                                'is-valid': shouldAppendValidClass($v.form.title)
                            }"
                        />
                        <div v-if="$v.form.title.$error">
                            <div v-if="!$v.form.title.required" class="error-message">
                                <small>The title field is required</small>
                            </div>
                            <div v-if="!$v.form.title.minLength" class="error-message">
                                <small>The title must have at least 8 characters</small>
                            </div>
                        </div>
                </div>

                <div class="form-group">
                  <label for="description">Description</label>
                    <textarea 
                        name="description" 
                        id="description" 
                        class="form-control"
                        v-model="form.description" 
                        placeholder="Add event description" 
                        rows="2"
                        @blur="$v.form.description.$touch()"
                        :class="{
                            'is-invalid': shouldAppendErrorClass($v.form.description),
                            'is-valid': shouldAppendValidClass($v.form.description)
                        }"
                    >
                    </textarea>
                    <div v-if="$v.form.description.$error">
                        <div v-if="!$v.form.description.required" class="error-message">
                            <small>The description field is required</small>
                        </div>
                        <div v-if="!$v.form.description.minLength" class="error-message">
                            <small>The description must have at least 12 characters</small>
                        </div>
                    </div> 
                </div>

                <div class="form-group">
                  <label for="link">Link</label>
                    <input 
                        name="link" 
                        id="link" 
                        class="form-control"
                        v-model.trim="form.link"
                        placeholder="https://lnkd.in/gJaxw8A"
                        @blur="$v.form.link.$touch()"
                        :class="{
                            'is-invalid': shouldAppendErrorClass($v.form.link),
                            'is-valid': shouldAppendValidClass($v.form.link)
                        }"
                    />
                    
                    <div v-if="$v.form.link.$error">
                        <div v-if="!$v.form.link.required" class="error-message">
                            <small>The link field is required</small>
                        </div>
                    </div> 
                </div>
                
                <div class="form-group">
                    <label >Dates</label>
                    <div v-for="(input,k) in form.dates" :key="k" class="borders">  
                        <div class="form-group">
                            <label for="date">Date : </label>
                            <input 
                                type="date" 
                                class="date"     
                                name="date" 
                                id="date"
                                v-model="input.date"
                                placeholder="yyyy/mm/dd"  
                            />
                        </div>

                        <div class="form-group">
                            <label for="startTime">Start Time(hh:mm) : </label>
                            <input v-model="input.startTime.hours" 
                                class="startTime"
                                min="0" max="23" 
                                placeholder="0"  
                            />
                                <strong> : </strong>
                            <input v-model="input.startTime.minutes"
                                class="startTime" 
                                min="0" max="59"
                                placeholder="0" 
                            />
                        </div>    

                        <div class="form-group">
                            <label for="endTime">End Time(hh:mm) : </label>
                            <input v-model="input.endTime.hours" 
                                class="endTime"
                                min="0" max="23" 
                                placeholder="0"  
                            />
                                <strong> : </strong>
                            <input v-model="input.endTime.minutes"
                                class="endTime" 
                                min="0" max="59"
                                placeholder="0" 
                            />
                        </div>    
                        
                        
                        <span>
                            <i class="fas fa-minus-circle text-danger mx-2" @click="remove(k)" v-show="k || ( !k && form.dates.length > 1)"></i>
                            <i class="fas fa-plus-circle text-info mx-2" @click="add(k)" v-show="k == form.dates.length-1"></i>
                        </span>
                    </div>
                </div>

                <button class="btn btn-info" type="submit" :disabled="$v.form.$invalid">Add event</button>
                <button class="btn btn-danger ml-5" type="submit" @click="cancel()">Cancel</button>
            </form>
        </div>
      
</template>

<script>

    import Vue from 'vue';
    import { required, minLength } from 'vuelidate/lib/validators'
    import { addEvent } from '@/services/addEvent';
    import config from '@/config';

    export default {
        name: 'Add',
        props: {
            name: {
                type: String ,
                default: ''
            }
        },
        data() {
            return {
                processing: false,
                // datestest:[
                //     {
                //         startTime:{
                //             hours:'',
                //             minutes:''
                //         },
                //         endTime:{
                //             hours:'',
                //             minutes:''
                //         }
                //     }
                // ],
                
                form: {
                    uploadDate: new Date().toDateString(),
                    title: '',
                    description: '',
                    link:'',
                    dates:[
                        {
                            date:'',
                            startTime:{
                                hours:'',
                                minutes:''
                            },
                            endTime:{
                                hours:'',
                                minutes:''
                            }
                        }
                    ]
                }
            };
        },
        validations: {
            form: {
                title: {
                    required,
                    minLength: minLength(8)
                },
                description:{
                    required,
                    minLength:minLength(12)
                },
                link:{
                    required
                },
            },
            // input:{
            //     startTime:{
            //         hours:{
            //             checkHours: function(value) {
            //                 if(value>=0 && value<=23){
            //                     return true;
            //                 }
            //                 else{
            //                     return false;
            //                 }
            //             },
            //         },
            //         minutes:{
            //             checkMin: function(value) {
            //                 if(value>=0 && value<=59){
            //                     return true;
            //                 }
            //                 else{
            //                     return false;
            //                 }
            //             },
            //         }
            //     },  
            //     endTime:{
            //         hours:{
            //             checkHours: function(value) {
            //                 if(value>=0 && value<=23){
            //                     return true;
            //                 }
            //                 else{
            //                     return false;
            //                 }
            //             },
            //         },
            //         minutes:{
            //             checkMin: function(value) {
            //                 if(value>=0 && value<=59){
            //                     return true;
            //                 }
            //                 else{
            //                     return false;
            //                 }
                                
            //             },
            //         }
            //     },
            // }
        },
        methods: {
            cancel(){
                window.location.href="/club";
            },
            add() {
            this.form.dates.push(
                { 
                    date:'',
                    startTime:{
                        hours:'',
                        minutes:''
                    },
                    endTime:{
                        hours:'',
                        minutes:''
                    }
                }
            );
            },
            remove(index) {
                this.form.dates.splice(index, 1);
            },

            addEvent() {
                this.$v.form.$touch();
                if( !this.$v.form.$invalid ) {
                    addEvent( this.form, this.name )
                        .then(() => this.$router.push( { name: 'notice' } ))
                        .then(()=>{
                            Vue.$toast.open({
                                message:'New notice added',
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
                } else {
                    console.log( 'invalid input values' );
                }
            },
            shouldAppendValidClass( field ) {
                console.log( field );
                return !field.$invalid && field.$model && field.$dirty;
            },
            shouldAppendErrorClass( field ) {
                return field.$error;
            }
        }
    }
</script>
    
<style scoped>
#add-event-box{
  background-color:rgba(101, 215, 230, 0.801);
  border-radius: 4px;
  padding: 25px;
  border-top: 1px solid rgb(172, 171, 171) !important;
}
.startTime,
.endTime,
.date
{
    margin:3px;
    padding:3px;
    border: 0px solid black;
    border-radius: 4px;
}
.borders{
    padding: 8px;
    border:2px solid whitesmoke;
    border-radius: 8px;
    margin:8px 20px;
}
</style>