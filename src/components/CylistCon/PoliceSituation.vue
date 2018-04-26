<template>
    <div class="PoliceSituation">
      <div class="PoliceSituation_h">
        <span>关注警情</span>
      </div>
      <div class="PoliceSituation_l">
        <ul>
          <li v-for="item in Police"><span>{{item.date++item.time}}</span>{{item.con}}</li>
        </ul>
      </div>
    </div>
</template>
<style scoped>

</style>
<script>
   export default{
        data(){
            return{
              Police: [{date: '2018/01/25', time: '15:38:57', con: '报警人称: 在xx高速往xx方向17公里,大货车撞了小汽车后逃逸,无人受伤'},
                {date: '2018/01/25', time: '15:38:57', con: '报警人称: 在锦江之星路口,大众撞上了护栏'}]
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
