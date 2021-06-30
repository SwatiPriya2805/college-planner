<template>
  <div class="mb-5  mt-5 pt-5">
    <div class="w-100 col-12">
      <div class="row ml-1">
        <div class="col col-sm-12 col-md-12 col-lg-6 mt-5 float-lg-left back">
            <br />
            
            <h2 class="text-info">LEARN . GROW . EXCEL</h2>
            <br/>
            <h4>
            College planner helps you to keep a track of college notice, notes, timetable, club events.
            Just login with your college email id and get your college planner ready.
            </h4>
            <br/>
            <button type="button" class="btn btn-info button" @click="login">Get started</button>
        </div>

        <div class="col col-sm-12 col-md-12 col-lg-6 mt-5 image">
            <img
                src="../assets/home-img.svg"
                alt="Sign-Up image"
                class="image backimage"
                height="300"        
            />
        </div> 
      </div>
    </div>
  </div>
</template>

<script>

    export default {
        name:'Home',
        methods:{
            login(){
                this.$router.push( { name: 'login' } )
            }
        }
    }
</script>

<style scoped>
.backimage{
    background-image: url('../assets/Pattern-Randomized.svg');
    z-index: -1;
    background-position:center; 
    background-repeat: no-repeat; 
    background-size: cover;
}
h4{
    font-family: Times, serif;
}
.image {
  z-index: 1;
  text-align: center;
}
@media screen and (min-width: 300px) and (max-width:500px) {
    .image{
        width:320px !important; 
    }
}
.btn{
    border-radius: 0.25rem;
}
@media screen and (min-width: 770px) and (max-width:2044px) {
    .back{
        margin-top:80px !important; 
    }
}
</style>
