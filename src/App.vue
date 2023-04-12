<template>
  
  <div id="app" style="text-align: left">
    <el-table></el-table>
	  <button @click='getToken'>获取Token</button>
    <HelloWorld v-bind:msg="msg"/>	
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import qs from 'qs'
import axios from 'axios'

export default {
  data() {
    return { msg : "欢迎来到我的Vue Demo App!!!"}
  },
  name: 'App',
  components: {
    HelloWorld
  },
  mounted () {
    axios
      .get('/api/users/checkstatus',{
		headers: {
			'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsib3JkZXJzIiwidXNlcnMiXSwidXNlcl9uYW1lIjoi5byg5LiJIiwic2NvcGUiOlsiYWxsIl0sImV4cCI6MTY4MDg2Mzk3OCwidXNlcmlkIjoxLCJhdXRob3JpdGllcyI6WyJwcm9kdWN0cy5kZWR1Y2UiLCJvcmRlcnMucXVlcnkiLCJzZWN1cml0eV9wMSIsInNlY3VyaXR5X3AyIiwib3JkZXJzLmNhbmNlbCIsInJvb3QiLCJvcmRlcnMuY3JlYXRlIiwiUk9MRV9BZG1pbiIsInVzZXJzLnBvc3RtZXNzYWdlIiwidXNlcnMiLCJwcm9kdWN0cyJdLCJqdGkiOiJlNjMxNzA3YS1mMDNhLTRiYmItODg3Ny00MmQ4NjllMjZhYjEiLCJjbGllbnRfaWQiOiJjbGllbnRJZCJ9.auFfVdjpgIU36wZD2kYZEwKc7YGooJ23Ft3IBqhpGis'
		}
	  })
      .then(response => (this.msg = response.data)
	  
	  )
      .catch(function (error) { // 请求失败处理
        console.log(error);
    });

    
  },
  methods: {
	  getToken() {

			axios({
        url: '/api/security/oauth/token',
        method: 'POST',
			  data: qs.stringify({
						'username': '1',
						'password': '123456',
            'client_id': 'clientId',
            'client_secret': '123',
						'grant_type': 'password'
					}),
				headers: { 
          'Accept': '*/*',
          'Content-Type': 'application/x-www-form-urlencoded'
          //'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsib3JkZXJzIiwidXNlcnMiXSwidXNlcl9uYW1lIjoi5byg5LiJIiwic2NvcGUiOlsiYWxsIl0sImV4cCI6MTY4MDg0MjQwNSwidXNlcmlkIjoxLCJhdXRob3JpdGllcyI6WyJwcm9kdWN0cy5kZWR1Y2UiLCJvcmRlcnMucXVlcnkiLCJzZWN1cml0eV9wMSIsInNlY3VyaXR5X3AyIiwib3JkZXJzLmNhbmNlbCIsIm9yZGVycy5jcmVhdGUiLCJST0xFX0FkbWluIiwidXNlcnMucG9zdG1lc3NhZ2UiLCJ1c2VycyIsInByb2R1Y3RzIl0sImp0aSI6ImU1NTQyNmEyLTFhNDUtNGZhZS1hMmJhLTMwYjIyZTEzNTFmMSIsImNsaWVudF9pZCI6ImNsaWVudElkIn0.AzsqdVaE1tnqztVsM2D87scRLY1wuw1s3qFpxyQ8NSY'
        },
        timeout: 6000
			})
			.then(response => (this.msg = response))
			.catch(function (error) { // 请求失败处理
				console.log(error);
			});
      axios.interceptors.request.use((request) => {
        if (request.data && request.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
            //request.data = qs.stringify(request.data);
            console.log(request.data);
        }

        return request;
      });


	  }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
