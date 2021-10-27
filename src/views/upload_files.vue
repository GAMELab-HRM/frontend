<template>
    <div id=main_container>
        <div id=upload_container>
            <el-upload class="upload-demo" ref="upload" accept="" :http-request="customUpload" action="https://jsonplaceholder.typicode.com/posts/" :on-remove="upload_remove" :file-list="fileList" :auto-upload="false" :limit=3 :on-success="upload_success" list-type="picture-card" :before-upload="upload_preview" :on-exceed="upload_exceed">
                <i class="el-icon-plus"></i>
            </el-upload>
            <div id=upload_btn>
                <el-button style="margin-left: 10px; margin-right: 0px"  type="success" @click="submitUpload">上傳檔案</el-button>
            </div>
        </div>
        <upload_table/>
    </div>
</template>

<script>
import upload_table from '@/components/upload_table.vue'


export default {
    name: 'upload_files',


    components: {
        upload_table,
    },
    data(){
        return {
            fileList:[]
        }
    },
    methods:{
        upload_preview(file) {
            console.log(file)
            console.log(123)
        },
        upload_remove(file, fileList) {
            console.log(file, fileList)
        },
        upload_success(response, file, fileList) {
            console.log('success')
            console.log(response, file, fileList)
        },
        upload_exceed() {
            alert('error')
        }, 
        submitUpload() {
            this.$refs.upload.submit();
        },
        customUpload(item){
			const file = item.file 
			//const size = file.size / 1024 / 1024
			this.forms = new FormData()
			this.forms.append("files", file)
        }
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
    width: 60%;
    margin-bottom: 50px;
    margin-left: 20%;
    margin-top: 70px;
}
#upload_btn {
    margin-top: 20px;
    margin-bottom: 50px;
}
</style>