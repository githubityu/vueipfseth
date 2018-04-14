<template>
  <div class="hello">
    <el-row>
      <el-col :span="10"><el-input v-model="input" placeholder="请输入内容"></el-input></el-col>
      <el-col :span="3"><el-button type="primary" @click="sumitData()">提交到IPFS</el-button></el-col>
    </el-row>
    <div><h1>{{ipfshash}}</h1></div>
    <el-row>
      <el-col :span="10"><el-input v-model="ipfshash" placeholder="请输入hash"></el-input></el-col>
      <el-col :span="3"><el-button type="primary" @click="getData()">从ipfs读取数据</el-button></el-col>
    </el-row>
    <div><h1>{{msg}}</h1></div>
    <input type="file" ref="file" id="file" name="file" multiple="multiple"/>
    <el-button type="primary" @click="sumitFile()">上传图片</el-button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      ipfshash: '00000',
      input:"1111"
    }
  },
  methods:{
    sumitData(){
      let that = this;
      new Promise(function (resolve,reject) {
         const desc = Buffer.from(that.msg,'utf-8');
         that.ipfsapi.add(desc).then((response) => {
           console.log(response);
           resolve(response[0].hash)
         }).catch((err) =>{
            console.error(err)
             reject(err);
         })
      }).then((hash) => {
        that.ipfshash = hash;
      })
    },getData(){
        this.ipfsapi.cat(this.ipfshash).then((stream => {
            console.log(stream)

        }));
    },sumitFile(){
      let that = this;
       console.log(this.$refs.file.files);
        let file = this.$refs.file.files[0];
        let reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = (e) => {
           console.log(reader);
           new Promise(function (resolve, reject) {
              const buffer = Buffer.from(reader.result);
              that.ipfsapi.add(buffer).then((response) => {
               console.log(response);
               resolve(response[0].hash)
             }).catch((err) =>{
               console.error(err)
               reject(err);
             })
           })
        }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.el-row{
    margin-top: 10px;
}
</style>
