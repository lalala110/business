<template>
    <div class="UrbanIntersection">
      <div class="UitconT">
    <span class="UitconT_h">城区路口过车情况</span>
    <span class="UitconT_s">详情</span>
  </div>
  <div class="UitconB">
    <table>
      <span class="span_s">相位&nbsp;(辆/h)</span>
      <span class="span_x"></span>
      <tr class="ths tss">
        <th class="thss">交叉口名称</th>
        <th>北直</th>
        <th>北左</th>
        <th>东直</th>
        <th>东左</th>
        <th>西直</th>
        <th>西左</th>
        <th>南直</th>
        <th>南左</th>
        <th>累计(辆)</th>
      </tr>
      <tr v-for="(item,index) in crossing" :key="index" class="tss">
        <td @mouseover="handleFold(index)" @mouseout="hangleFole(index)"><span :class="index == showAll?'active':''">{{item.lista}}</span></td>
       <td>{{item.listb}}</td>
       <td>{{item.listc}}</td>
       <td>{{item.listd}}</td>
       <td>{{item.liste}}</td>
       <td>{{item.listf}}</td>
       <td>{{item.listg}}</td>
       <td>{{item.listh}}</td>
       <td>{{item.listi}}</td>
       <td>{{item.listj}}</td>
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
    color:#46E8ff;
    font-size: 20px;
    position: absolute;
    width:40px;
    height: 40px;
    top:38px;
    right:48px;
    cursor: pointer;
    z-index: 67;
  }
  .UrbanIntersection  .UitconB{
    width: 100%;
    height: 510px;
    /*overflow: scroll;*/
  }
  .UrbanIntersection  .UitconB table{
    width: 100%;
    height: 100%;
    text-align: center;
    position: relative;
    /*overflow: hidden;*/
    /*overflow-y: scroll;*/
  }
  .UrbanIntersection  .UitconB table .span_s{
    position: absolute;
    top: -14px;
    left: 573px;
    color: #46E8ff;
    font-size: 30px;
  }
  .UrbanIntersection  .UitconB table .span_x{
    position: absolute;
    top:73px;
    left: 66px;
    width: 1200px;
    height: 1px;
    background-color: #555555;
  }
  .UrbanIntersection  .UitconB .ths{
    color: #46E8ff;
  }
  .tss span{
    width: 200px;
    display: inline-block;
    text-overflow:ellipsis;
    white-space:nowrap;
    overflow:hidden;
  }
  .active{
    display: inline-block;
    width: 300px!important;
  }
  .UrbanIntersection  .UitconB .ths .thss{
    width: 300px;
  }
  .UrbanIntersection  .UitconB .tss{
    /*width: 200px;*/
    height: 85px;
  }
  .UrbanIntersection  .UitconB .ths th{
    border-bottom: #ffff;
  }
</style>
<script>
export default {
  data () {
    return {
      maxLen: [],
      maxLex: [],
      showAll: 99999,
      show: 0,
      crossing: [
        {lista: '一二三四五六七八', listb: 80, listc: 60, listd: 20, liste: 80, listf: 60, listg: 20, listh: 20, listi: 20, listj: 1000},
        {lista: '一二三四五六七八', listb: 80, listc: 60, listd: 20, liste: 80, listf: 60, listg: 20, listh: 20, listi: 20, listj: 1000},
        {lista: '一二三四五六七八', listb: 80, listc: 60, listd: 20, liste: 80, listf: 60, listg: 20, listh: 20, listi: 20, listj: 1000},
        {lista: '一二三四五六七八', listb: 80, listc: 60, listd: 20, liste: 80, listf: 60, listg: 20, listh: 20, listi: 20, listj: 1000},
        {lista: '一二三四五六七八', listb: 80, listc: 60, listd: 20, liste: 80, listf: 60, listg: 20, listh: 20, listi: 20, listj: 1000},
        {lista: '一二三四五六七八', listb: 80, listc: 60, listd: 20, liste: 80, listf: 60, listg: 20, listh: 20, listi: 20, listj: 1000}]
    }
  },
  methods: {
    handleFold (index) {
      this.showAll = index
    },
    hangleFole () {
      this.showAll = 99999
    }
  }
}
</script>
