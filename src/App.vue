<template>
  <div id="app">

    <header id="header">
			
			<div class="inner">
				
        <a href="/" class="med_knights"><span>med<strong>Knights <i class="fas fa-chess-knight"></i></strong></span></a>

				<a href="/" class="logo"><span>by med<strong>Castle </i><i class="fab fa-fort-awesome magnify"></i></strong></span></a>

        <a href="https://www.facebook.com/groups/252411336109045/" class="facebook_link"><span><strong><i class="fab fa-facebook magnify"></i>-Gruppe!</strong></span></a>
				
			</div>
			
		</header>
    
    <Header />
    <fileChooser />
    <infoSection />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import fileChooser from './components/fileChooser.vue'
import infoSection from './components/infoSection.vue'

export default {
  name: 'App',
  components: {
    Header,
    fileChooser,
    infoSection
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
