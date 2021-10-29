<template>
    <div id=main_container>
        <div id=upload_container>
            <el-upload class="upload-demo" ref="upload" accept="" :http-request="customUpload" action="https://jsonplaceholder.typicode.com/posts/" :on-remove="upload_remove" :file-list="fileList" :auto-upload="false" :limit=3 list-type="picture" multiple :on-exceed="upload_exceed" :on-change="upload_change">
                <el-button slot="trigger"  type="primary">選取文件</el-button>
                <el-button style="margin-left: 10px; margin-right: 0px" type="success" @click="submitUpload">上傳檔案</el-button>
            </el-upload>
        </div>
        <upload_table :key="rerender"/>
    </div>
</template>

<script>
import upload_table from '@/components/upload_table.vue'
import {uploadFileDemo} from '@/apis/file.js'
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
        customUpload(item){
			const file = item.file 
            let filename = file['name']
			this.forms = new FormData()
			this.forms.append("files", file)

			/* 這個api的內容寫在 /src/apis/file.js  */
            uploadFileDemo(this.forms).then((res)=>{
                this.$message({message: filename + ' 上傳成功',type: 'success'});
                console.log("Call upload API successed!")
                console.log(res)
            }).catch((err)=>{
                this.$message.error(filename + ' 上傳失敗!');
                console.log("Call upload API failed!")
                console.log(err)
            })
        },	
        alert_exceed() {
            this.$message({
                message: '個數超過限制!',
                type: 'warning'
            });
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