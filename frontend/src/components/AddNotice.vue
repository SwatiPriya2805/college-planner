<template>
    <div class="container " id="add-notice-box">
        <h3 class="text-white">Add a new notice</h3>
        <hr>
        <!---input form for add new notice-->
        <form @submit.prevent="addNotice()" enctype="multipart/form-data">
            <div class="form-group">
                <label for="title">Title</label>
                    <input 
                        type="text"
                        class="form-control"
                        name="title"
                        id="title"
                        v-model.trim="form.title"
                        placeholder="Title" 
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
                    placeholder="Add description" 
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
                <label for="file">Upload file</label>
                <br/>
                    <input 
                        type="file"
                        name="file"
                        id="file"
                        @change="onFileSelected"
                        @blur="$v.form.file.$touch()"
                        :class="{
                            'is-invalid': shouldAppendErrorClass($v.form.file),
                            'is-valid': shouldAppendValidClass($v.form.file)
                        }"
                    />
                    <br/>
                    <br/>
                    <div v-if="this.form.file !== null">
                        File preview
                        <br/>
                        <img class="m-2 image" :src="avatar" alt="selected image" width="600" >
                    </div>
                    <div v-if="$v.form.file.$error">
                        <div v-if="!$v.form.file.checkFile" class="error-message">
                            <small>The file field is required</small>
                        </div>
                    </div> 

            </div>

            <button class="btn btn-info" type="submit" :disabled="$v.form.$invalid">Add notice</button>
            <button class="btn btn-danger ml-5" type="submit" @click="cancel()">Cancel</button>
        </form>
    </div>    
</template>

<script>

    import Vue from 'vue';
    import { required, minLength } from 'vuelidate/lib/validators'
    import { addNotice } from '@/services/addNotice';
    import config from '@/config';

    export default {
        name: 'AddNotice',
        data() {
            return {
                processing: false,
                form: {
                    date: new Date().toDateString(),
                    title: '',
                    description: '',
                    file:null,
                },
                avatar:null
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
                file:{
                    checkFile: function(){
                         if(this.form.file === null){
                            return false;
                        }
                        else{
                            return true;
                        }
                    },
                }
            }
        },
        methods: {
            cancel(){
                window.location.href="/notice";
            },
            onFileSelected(event){

                this.form.file = event.target.files[0];
                let reader = new FileReader();
                reader.readAsDataURL(this.form.file);
                reader.onload = event => {
                    this.avatar = event.target.result
                }
            },
            addNotice() {
                
                this.$v.form.$touch();

                if( !this.$v.form.$invalid ) {
                    addNotice( this.form )
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
#add-notice-box{
  background-color:rgba(101, 215, 230, 0.801);
  border-radius: 4px;
  padding: 25px;
  border-top: 1px solid rgb(172, 171, 171) !important;
}
@media screen and (min-width: 300px) and (max-width:500px) {
    .image{
        width:300px !important; 
    }
}
</style>