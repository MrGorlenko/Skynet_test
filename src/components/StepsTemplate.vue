<template>
  <div>
    <h3>Тип подлключения:</h3>
    <div class="info info__standart">
      <p class="info__name">
        {{this.Steps[0].variants[0].title}}
      </p>
      <p class="info__cost">
        {{this.standartConnection.reduce((a, b) => a + b, 0)}} ₽
      </p>
      <p  class="info__description" pre>
        {{this.Steps[0].variants[0].description}}
      </p>
      <div class="info__selecting">
        <div class='info__option' 
        v-for='option in this.Steps[0].variants[0].options' 
        :key='option.title'
        >
        <input type="checkbox"
        v-bind:value="option.price"
        v-model="standartConnection"
        v-if="!standartConnectionSelected && !luxConnectionSelected"
        >
        <input type="checkbox"
        v-bind:value="option.price"
        v-model="standartConnection"
        v-else
        disabled
        >
        <label v-if="!standartConnectionSelected && !luxConnectionSelected"
          class='info__label info__label_active'
          for="">{{option.title}}</label>
        <label v-else
          class='info__label info__label_disabled'
          for="">{{option.title}}</label>
        <div class="empty"></div>
        </div>
        <button v-if="!luxConnectionSelected" 
        :class="{'info__button_active':standartConnectionSelected}" 
        class='info__button info__button_hover' @click=touchStandart()>
          <span v-if=!standartConnectionSelected>Выбрать</span> 
          <span v-else>Выбрано</span>
        </button>
        <button 
        :class="{'info__button_active':standartConnectionSelected}" 
        class='info__button'
        v-else
        disabled
        @click=touchStandart()>
          <span v-if=!standartConnectionSelected>Выбрать</span> 
          <span v-else>Выбрано</span>
        </button>
      </div>
    </div>

    <div class="info info__lux">
      <p class="info__name">
        {{this.Steps[0].variants[1].title}}
      </p>
      <p class="info__cost">
        {{this.LuxConnection}} ₽

      </p>
      <p  class="info__description" pre>
        {{this.Steps[0].variants[1].description}}
      </p>
      <div class="info__selecting">
        <p>{{this.Steps[0].variants[1].select[0].title}}</p>
        <select class='info__select' v-model='LuxConnection'
        v-if="!standartConnectionSelected && !luxConnectionSelected">
          <option 
          v-for='option in this.Steps[0].variants[1].select[0].items.slice().reverse()' 
          :key=option.title
          v-bind:value='option.price'
          >{{option.title}}
          </option>
        </select>

        <select class='info__select' v-model='LuxConnection' v-else disabled>
          <option 
          v-for='option in this.Steps[0].variants[1].select[0].items.slice().reverse()' 
          :key=option.title
          v-bind:value='option.price'
          >{{option.title}}
          </option>
        </select>
        <button v-if="!standartConnectionSelected" 
        :class="{'info__button_active':luxConnectionSelected}" 
        class='info__button info__button_hover' @click=touchLux()>
          <span v-if=!luxConnectionSelected>Выбрать</span> 
          <span v-else>Выбрано</span>
        </button>
        <button 
        :class="{'info__button_active':luxConnectionSelected}" 
        class='info__button'
        v-else
        disabled
        @click=touchLux()>
          <span v-if=!luxConnectionSelected>Выбрать</span> 
          <span v-else>Выбрано</span>
        </button>
      </div>
    </div>

    <h3>{{this.Steps[1].title}}</h3>

    <div class="routers">

      <div v-for='(router, index) in this.Steps[1].variants' 
      :key=router.title
      class="routers__block"
      :id=index
      :style="{'border-left': '6px solid'+router.color}">
      
        <h4>{{router.title}}</h4>
        <p class='routers__description'>{{router.description}}</p>
        <p>{{router.price_default}}</p>
        <button
        class='routers__button routers__button_hover '
        @click='touchRouter(router.price_default, index)'
        v-if='ConnectionTypeSelected'
        >
        Выбрать
        </button>

        <button
        class='routers__button'
        @click='touchRouter(router.price_default, index)'
        v-else
        disabled
        >
        Выбрать
        </button>

      </div>

    </div>
    
    <button class='final_price'>
     <span>Итого к оплате:</span> <span>{{overall}} ₽</span>  
    </button>
  </div>
</template>

<script lang="js">
import {mapState} from 'vuex'
import Vue from 'vue'

export default Vue.extend({
  name: 'StepsTemplate',
  data() {
    return{

      standartConnection:[], //массив, который вбирает в себя все выбранные услуги
                             //стандартного подключения
      LuxConnection:0,//цена Подключения класса Люкс
      // routerSum:0,  
      
      standartConnectionSelected: false,  //Выбрано ли стандартное/люкс подключение
      luxConnectionSelected: false,

      ConnectionTypeSelected: false, //Выбрано ли подключение в целом

      // secondStep: false, //
      router_selected: false, // Выбран ли какой-либо из роутеров
      router_price:0, //Цена выбранного роутера

      overall: 0, //Итоговая цена
    }
  },
  computed: {
    ...mapState({
      Steps:state => state.Steps.steps
    })
  },
  methods:{
    touchStandart: function(){  //метод, который отвечает за выбор или отмету стандартного подключения
      if (!this.ConnectionTypeSelected){ // если не выбрано никакое из подключений, то
        this.overall = 0; //прежде всего обнуляется сумма, если была отмена
        this.overall +=this.standartConnection.reduce((a, b) => a + b, 0) 
        //суммируется массив выбранных стандартных услуг

        if (this.overall != 0){ //нельзя ничего не выбрать в стандартных услугах
          this.standartConnectionSelected = true;
          this.ConnectionTypeSelected = true;
          this.LuxConnection = 0;
        } 
        else {
          alert('Выберите какую-то из услуг, пожалуйста!')
        }
      } else {
        //Если произвелась отмена стандартных услуг, то извлекается сумма стандартных услуг 
        //из всей суммы к Оплате
        this.overall -= this.standartConnection.reduce((a, b) => a + b, 0);
        this.ConnectionTypeSelected = !this.ConnectionTypeSelected;
        this.standartConnectionSelected = !this.standartConnectionSelected;
      }
    },
    touchLux: function(){ //метод, который отвечает за выбор или отмету люкс подключения
      //Принцип действия как со стандартными услугами, но вместо массива - одно значение
      if (!this.ConnectionTypeSelected){
        this.overall = 0;
        this.overall += this.LuxConnection;
        this.luxConnectionSelected = true;
        this.ConnectionTypeSelected = true;
      } else {
        this.overall -= this.LuxConnection;
        this.luxConnectionSelected = !this.luxConnectionSelected;
        this.ConnectionTypeSelected = !this.ConnectionTypeSelected;
      }
    },
    touchRouter: function(x,index){ //Метод, определяющий выбор роутера
      //Определение сколько роутеров есть в целом
      let listLen = document.getElementsByClassName('routers')[0].childNodes.length;
      if (this.ConnectionTypeSelected){ //метод работает, если выбран тип подключения - Люкс или Стандарт
        if (!this.router_selected){ //Далее работает, если НЕ выбран ни один из роутеров
          this.router_selected = true
          this.router_price = x //цена роутера становится равна первому аргументу 
          this.overall += this.router_price

          //По выбранному индексу, меняется состояние кнопки
          document.getElementsByClassName('routers')[0]
          .children[index]
          .children[3].innerHTML='Выбрано'

          document.getElementsByClassName('routers')[0]
          .children[index]
          .children[3].classList.add('routers__button_active')

          //Меняется состояние соседних кнопок, условия нужны для исключения выхода за массив 
          if (index == 0){
            for (let i = 1; i < listLen; i++){

              document.getElementsByClassName('routers')[0]
              .children[index+i]
              .children[3].disabled = true

              document.getElementsByClassName('routers')[0]
              .children[index+i]
              .children[3].classList.remove('routers__button_hover')
            }
          } else if (index == listLen-1){
            for (let i = 1; i < listLen/2+1; i++){

              document.getElementsByClassName('routers')[0]
              .children[index-i]
              .children[3].disabled = true

              document.getElementsByClassName('routers')[0]
              .children[index-i]
              .children[3].classList.remove('routers__button_hover')
            }
          } else {
            for (let i = 1; i < listLen/2; i++){

              document.getElementsByClassName('routers')[0]
              .children[index-i]
              .children[3].disabled = true

              document.getElementsByClassName('routers')[0]
              .children[index-i]
              .children[3].classList.remove('routers__button_hover')

              document.getElementsByClassName('routers')[0]
              .children[index+i]
              .children[3].disabled = true

              document.getElementsByClassName('routers')[0]
              .children[index+i]
              .children[3].classList.remove('routers__button_hover')
            }            
          }

        //Условие срабатывает, если роутер выбран, но нужно сделать отмену выбора. Алгоритм схож с условием "Роутер не выбран"
        } else {
          this.router_selected = !this.router_selected
          this.overall -= this.router_price
          this.router_price = 0

          document.getElementsByClassName('routers')[0]
          .children[index]
          .children[3].innerHTML='Выбрать'

          document.getElementsByClassName('routers')[0]
          .children[index]
          .children[3].classList.remove('routers__button_active')


         if (index == 0){
            for (let i = 1; i < listLen; i++){

              document.getElementsByClassName('routers')[0]
              .children[index+i]
              .children[3].disabled = false

              document.getElementsByClassName('routers')[0]
              .children[index+i]
              .children[3].classList.add('routers__button_hover')
            }
          } else if (index == listLen-1){
            for (let i = 1; i < listLen/2+1; i++){

              document.getElementsByClassName('routers')[0]
              .children[index-i]
              .children[3].disabled = false

              document.getElementsByClassName('routers')[0]
              .children[index-i]
              .children[3].classList.add('routers__button_hover')
            }
          } else {
            for (let i = 1; i < listLen/2; i++){

              document.getElementsByClassName('routers')[0]
              .children[index-i]
              .children[3].disabled = false

              document.getElementsByClassName('routers')[0]
              .children[index-i]
              .children[3].classList.add('routers__button_hover')

              document.getElementsByClassName('routers')[0]
              .children[index+i]
              .children[3].disabled = false

              document.getElementsByClassName('routers')[0]
              .children[index+i]
              .children[3].classList.add('routers__button_hover')
            }            
          }
        }
      } 
    }
  }
})
</script>

<style lang="scss" scoped>

  $infoMarginTop: 30px;
  $greyBorder: #ececec;
  $greyBG: #f8f8f8;
  $green: #2fcb5a;
  $borderRadius: 5px;
  $textColor: #6f6f6f;
  h3{
    text-align: start;
  }

  .info{
    display: flex;
    flex-wrap:wrap;
    justify-content: space-between;
    padding: 16px 16px 14px 15px;
    background: #f8f8f8;
    border-radius: $borderRadius;
    margin-bottom: 17px;
    &__standart{
      border-left: 6px solid #cccccc;
    }

    &__lux{
      border-left: 6px solid $green;
    }

    &__active{
      border-left: 6px solid  $green;
    }

    &__name{
      text-align: start;
      font-weight: 600;
      font-size: 21px;
      height: auto;
    }

    &__cost{
      text-align:end;
    }
    &__description{
      text-align: start;
      display: block;
      white-space: pre-line;
      margin-top: $infoMarginTop;
      margin-bottom: 0;
      color: $textColor;
    }
    &__button{
      width: 100%;
      padding: 12px;
      border: none;
      outline: none;
      border-radius: $borderRadius;
      background: #98abba;
      color: #fff;
      font-weight: 500;
      font-size: 15px;
      cursor: pointer;
      &_hover{
        &:hover{
          background: $green;
        }
      }

      &_active{
        background: $green;
      }
    }
    &__selecting{
      width: 35%;
      padding:$infoMarginTop 1% 1% 1%;
      border-left: 1px solid $greyBorder;
      p{
        margin-top: 0;
        text-align: start;
        color: $textColor;
      }
    }
    &__select{
      width: 100%;
      padding: 13px 17px;
      border-radius: 5px;
      border: 2px solid $greyBorder;
      margin-bottom: 10px;

      -moz-appearance:none;
      -webkit-appearance:none; 
      appearance:none;

      background-image:
        linear-gradient(45deg, transparent 50%, gray 50%),
        linear-gradient(135deg, gray 50%, transparent 50%);
      background-position:
        calc(100% - 20px) calc(1em + 2px),
        calc(100% - 15px) calc(1em + 2px),
        calc(100% - 3.5em) 0.8em;
      background-size:
        5px 5px,
        5px 5px,
        1px 1.5em;
      background-repeat: no-repeat;
    }
    &__option{
      padding: 12px 8px;
      width: 100%;
      display: flex;
      height: auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: $borderRadius;
      border: 1px solid $greyBorder;
      margin-bottom: 10px;
    }

    &__label{
      font-weight: 500;
      &_active{
        color:$textColor
      }
      &_disabled{
        color:#bab9b9
      }
    }

    &__name, &__cost{
      margin-top: 0;
      margin-bottom: 0;
    }

    &__name, &__cost, &__description{
      width: 50%
    }

  }

  .routers{
    display: flex;
    justify-content: space-between;
    flex-wrap:wrap;
    &__block{
      width: 30%;
      background: $greyBG;
      border-radius: $borderRadius;
      padding: 1%;
      
      display: flex;
      flex-direction: column;
      align-items: start;
      justify-content: space-between;

      p{
        text-align: start;
      }
    }
    &__description{
      min-height: 162px;
    }

   &__button{
    width: 100%;
    padding: 12px;
    border: none;
    outline: none;
    border-radius: $borderRadius;
    background: #98abba;
    color: #fff;
    font-weight: 500;
    font-size: 15px;
    cursor: pointer;
    &_hover{
      &:hover{
        background: $green;
      }
    }
    &_active{
      background: $green;
    }
  }
}

.final_price{
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  color: #fff;
  text-transform: uppercase;
  border: none;
  outline: none;
  background: $green;
  font-size: 20px;
  border-radius: $borderRadius;
  margin-top: 15px;
  cursor: pointer;
  font-weight: 500;
}
</style>