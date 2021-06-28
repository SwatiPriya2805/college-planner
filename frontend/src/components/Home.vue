<template>
  <div class="my-4 ">
    <div class="w-100 col-12">
      <div class="row ml-1">
        <div class="col col-sm-12 col-md-12 col-lg-6 mt-5 float-lg-left back">
            <br />
            
            <h2>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid</h2>
            <h4>
            optio, ad incidunt eum beatae laudantium Quae soluta illum delectus
            consequuntur non quibusdam veritatis, rerum, nesciunt ratione autem
            dolor, perspiciatis totam
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid
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
