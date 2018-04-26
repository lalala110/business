<template>
    <div class="UrbanIntersection">
      <div class="UitconT">
    <span class="UitconT_h">高速路段拥堵排名</span>
    <span class="UitconT_s">查看环比值</span>
  </div>
  <div class="UitconB">
    <table>
      <tr class="ths">
        <th>序号</th>
        <th>路名</th>
        <th>起点-终点</th>
        <th>方向</th>
        <th>拥堵时长
        <p>(min)</p></th>
        <th>车速
        <p>(km/h)</p></th>
      </tr>
      <tr v-for="(item,index) in crossing" :key="index">
       <td>{{item.lista}}</td>
       <td>{{item.listb}}</td>
       <td>{{item.listc}}</td>
       <td>{{item.listd}}</td>
       <td>{{item.liste}}</td>
       <td>{{item.listf}}</td>
      </tr>
    </table>
  </div>
    </div>
</template>
<style scoped>
  .UrbanIntersection{
    width: 1300px;
    height: 610px;
    position: relative;
  }
  .UrbanIntersection .UitconT{
    width: 100%;
    height: 80px;

  }
  .UrbanIntersection .UitconT span{
    display: inline-block;
  }
  .UrbanIntersection .UitconT .UitconT_h{
    width: 100%;
    text-align: center;
    color: #46e8ff;
    font-size: 32px;
    line-height: 80px;
  }
  .UrbanIntersection .UitconT .UitconT_s{
    color:#fff;
    font-size: 20px;
    position: absolute;
    width:100px;
    height: 40px;
    top:38px;
    right:48px;
    cursor: pointer;
    z-index: 67;
  }
  .UrbanIntersection  .UitconB{
    width: 100%;
    height: 510px;
  }
  .UrbanIntersection  .UitconB table{
    width: 100%;
    height: 100%;
    text-align: center;
    position: relative;
  }
  .UrbanIntersection  .UitconB .ths{
    color: #46E8ff;
  }
  .UrbanIntersection  .UitconB .ths th{
    border-bottom: #ffff;
  }
</style>
<script>
export default {
  data () {
    return {
      crossing: [
        {lista: 1, listb: '一二三四五六七', listc: '民族路-邵亭北路', listd: '北-南', liste: 20, listf: 10},
        {lista: 2, listb: '一二三四五六七', listc: '民族路-邵亭北路', listd: '北-南', liste: 20, listf: 10},
        {lista: 3, listb: '一二三四五六七', listc: '民族路-邵亭北路', listd: '北-南', liste: 20, listf: 10},
        {lista: 4, listb: '一二三四五六七', listc: '民族路-邵亭北路', listd: '北-南', liste: 20, listf: 10},
        {lista: 5, listb: '一二三四五六七', listc: '民族路-邵亭北路', listd: '北-南', liste: 20, listf: 10}]
    }
  }
}
</script>
