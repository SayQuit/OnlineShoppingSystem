<template>
  <div class="list">
    <div class="list-item">
      <input type="checkbox" class="TBmid" />
      <img src="../assets/good.jpg" />
      <div class="list-item-detail TBmid">
        OLAY玉兰油OLAY玉兰油OLAY玉兰油OLAY玉兰油OLAY玉兰油OLAY玉兰油OLAY玉兰油OLAY玉兰油OLAY玉兰油OLAY玉兰油OLAY玉兰油OLAY玉兰油
      </div>
      <div class="main-detail-cont-num TBmid">
        <div @click="handleChangeNum(-1)">-</div>
        <input type="number" value="1" ref="num" min="1" />
        <div @click="handleChangeNum(1)">+</div>
      </div>

      <div class="list-item-info TBmid">
        <div class="list-item-info-price">￥180</div>
        <div class="list-item-info-opration">删除订单</div>
      </div>
    </div>
    <div class="list-item">
      <input type="checkbox" class="TBmid" />
      <img src="../assets/good.jpg" />
      <div class="list-item-detail TBmid">
        OLAY玉兰油OLAY玉兰油OLAY玉兰油OLAY玉兰油OLAY玉兰油OLAY玉兰油OLAY玉兰油OLAY玉兰油OLAY玉兰油OLAY玉兰油OLAY玉兰油OLAY玉兰油
      </div>
      <div class="main-detail-cont-num TBmid">
        <div @click="handleChangeNum(-1)">-</div>
        <input type="number" value="1" ref="num" min="1" />
        <div @click="handleChangeNum(1)">+</div>
      </div>

      <div class="list-item-info TBmid">
        <div class="list-item-info-price">￥180</div>
        <div class="list-item-info-opration">删除订单</div>
      </div>
    </div>
    <div class="list-item">
      <input type="checkbox" class="TBmid" />
      <img src="../assets/good.jpg" />
      <div class="list-item-detail TBmid">
        OLAY玉兰油OLAY玉兰油OLAY玉兰油OLAY玉兰油OLAY玉兰油OLAY玉兰油OLAY玉兰油OLAY玉兰油OLAY玉兰油OLAY玉兰油OLAY玉兰油OLAY玉兰油
      </div>
      <div class="main-detail-cont-num TBmid">
        <div @click="handleChangeNum(-1)">-</div>
        <input type="number" value="1" ref="num" min="1" />
        <div @click="handleChangeNum(1)">+</div>
      </div>

      <div class="list-item-info TBmid">
        <div class="list-item-info-price">￥180</div>
        <div class="list-item-info-opration">删除订单</div>
      </div>
    </div>

  </div>
</template>

<script>
export default {};
</script>

<style>
.list {
  width: 90%;
  margin: 0 auto;
  border-top: 1px solid black;
  /* height: 500px; */
}
.list-item {
  border-bottom: 1px solid black;
  width: 100%;
  height: 250px;
  position: relative;
}
.list-item img {
  width: 200px;
  height: 200px;
  margin-top: 25px;
  margin-left: 15%;
}
.list-item div {
  display: inline-block;
  vertical-align: top;
}
.list-item input {
  left: 3%;

  width: 50px;
  height: 50px;
}
.list-item-detail {
  width: 300px;
  height: fit-content;
  font-size: 18px;
  position: absolute;
  left: 40%;
}
.list-item-order {
  font-size: 18px;
}
.LRmid {
  left: 50%;
  transform: translateX(-50%);
  position: absolute;
}

.TBmid {
  top: 50%;
  transform: translateY(-50%);
  position: absolute;
}

.mid {
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  position: absolute;
}

.main-detail-cont-num {
  left: 65%;
}
.main-detail-cont-num > div {
  display: inline-block;
  width: 50px;
  text-align: center;
  height: 50px;
  vertical-align: top;
  background-color: #fff;
  line-height: 50px;
  cursor: pointer;
  border: 1px solid;
}
.main-detail-cont-num > input {
  vertical-align: top;
  border: none;
  padding-left: 10px;
  margin: 0 5px;
  background-color: #fff;
  width: 50px;
  text-align: center;
  height: 50px;
  border: 1px solid;
  padding: 0;
}
.list-item-info{
    left: 90%;
}
.list-item-info .list-item-info-price{
    font-size: 26px;
    color: #CE0000;
    display: block;
    margin-bottom: 20px;
}
.list-item-info-opration{
    width: 100%;
    text-align: center;
}
</style>