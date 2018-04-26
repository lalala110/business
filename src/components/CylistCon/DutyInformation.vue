<template>
    <div class="DutyInformation">
      <div class="DutyInformation_h">
        <span>值班信息</span>
      </div>
      <div class="DutyInformation_t">
        <table>
          <tr>
            <th>单位</th>
            <th>姓名</th>
            <th>电话</th>
          </tr>
          <tr v-for="(item,index) in inforL" :key="index">
            <td>{{item.company}}</td>
            <td>{{item.name}}</td>
            <td>{{item.telephone}}</td>
          </tr>
        </table>
      </div>
    </div>
</template>
<style scoped>

</style>
<script>
   export default{
        data(){
            return{
                inforL: [{company: '高速三', name: '张三', telephone:'13989123558'},
                         {company: '高速三', name: '张三', telephone:'13989123558'},
                         {company: '高速三', name: '张三', telephone:'13989123558'}]
            }
        },
        //创建
        created:{},
        //载入
        mounted:{},
        //更新
        updated:{},
        //销毁
        destroyed:{},
        components:{}
    }
</script>
