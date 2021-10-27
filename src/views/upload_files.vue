<template>
    <div id=main_container>
        <div id=upload_container>
            <el-upload class="upload-demo" ref="upload" accept="" :http-request="customUpload" action="https://jsonplaceholder.typicode.com/posts/" :on-remove="upload_remove" :file-list="fileList" :auto-upload="false" :limit=3 :on-success="upload_success" :on-error="upload_failed" list-type="picture" multiple :on-exceed="upload_exceed" :on-change="upload_change">
                <el-button slot="trigger"  type="primary">選取文件</el-button>
                <el-button style="margin-left: 10px; margin-right: 0px" type="success" @click="submitUpload">上傳檔案</el-button>
            </el-upload>
        </div>
        <upload_table :key="rerender"/>
    </div>
</template>

<script>
import upload_table from '@/components/upload_table.vue'
import axios from 'axios'

export default {
    name: 'upload_files',
    components: {
        upload_table,
    },
    data() {
        return {
            fileList: [],
            dialogVisible: false,
            rerender: 0,
        }
    },
    methods:{
        upload_remove(file, fileList) {
            console.log(file, fileList)
        },
        upload_success(response, file, fileList) {
            this.alert_success(file)
            console.log('success')
            console.log(response, file, fileList)
            fileList
            // this.fileList.append(file)
        },
        upload_failed(err, file, fileList) {
            this.alert_failed(file)
            console.log(err, fileList)
        },
        upload_exceed() {
            this.alert_exceed()
        }, 
        upload_change(file, fileList) {
            if(file.name.slice(-3) == 'CSV' || file.name.slice(-3) == 'csv') {
                file.url = 'https://i.imgur.com/0xHERe0.png'
            }
            console.log(fileList)
        },
        submitUpload() {
            this.rerender += 1
            this.$refs.upload.submit();
            this.fileList = []
        },
        customUpload(file){
            axios.post("http://127.0.0.1:8000/api/v1/swallows/data", file).then((res)=>{
				console.log("成功")
				console.log(res)
			})
            console.log('customUpload activate')
            console.log(file)
        },	
        alert_success(file) {
            this.$message({
                message: '成功上傳' + file.name + '!',
                type: 'success'
            });
        },
        alert_exceed() {
            this.$message({
                message: '個數超過限制!',
                type: 'warning'
            });
        },
        alert_failed(file) {
            this.$message.error(file.name + ' 上傳失敗!');
        },
    }
}
</script>

<style scoped>
#main_container {
    margin-left: 20%;
    margin-top: 40px;
    width: 60%;
    text-align: center;
}

#upload_container {
    width: 40%;
    margin-bottom: 50px;
    margin-left: 30%;
    margin-top: 70px;
}
#upload_btn {
    margin-top: 20px;
    margin-bottom: 50px;
}
</style>