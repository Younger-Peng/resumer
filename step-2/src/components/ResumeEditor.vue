<template>
  <div id="resumeEditor">
    <nav>
      <ol>
        <li v-for="(item,index) in resumeConfig"
            :class="{active: item.field === selected}"
            @click="selected = item.field"
            >
          <svg class="icon">
            <use :xlink:href="`#icon-${item.icon}`"></use>
          </svg>
        </li>
        <li class="github" @click="gotoGithub()">
          <svg class="icon">
            <use xlink:href="#icon-github"></use>
          </svg>
          <div class="message">查看此项目源码</div>
        </li>
      </ol>
    </nav>
    <ol class="panels">
      <li v-for="item in resumeConfig" v-show="item.field === selected">
        <div v-if="item.type === 'array'">
          <h2>{{$t(`resume.${item.field}._`)}}</h2>
          <div class="subitem" v-for="(subitem, i) in resume[item.field]">
            <button @click="removeResumeSubfield(item.field,i)" class="button remove small">删除</button>
            <div class="resumeField" v-for="(value,key) in subitem">
              <label> {{$t(`resume.${item.field}.${key}`)}} </label>
              <input type="text" :value="value" @input="changeResumeField(`${item.field}.${i}.${key}`, $event.target.value)">
            </div>
            <hr>
          </div>
          <button class="button" @click="addResumeSubfield(item.field)">新增</button>
        </div>
        <div v-else class="resumeField" v-for="(value,key) in resume[item.field]">
          <label> {{$t(`resume.profile.${key}`)}} </label>
          <input type="text" :value="value" @input="changeResumeField(`${item.field}.${key}`, $event.target.value)" >
        </div>
        
      </li>
    </ol>
  </div>
</template>

<script>
  export default {
    name: 'ResumeEditor',
    computed: {
      selected: {
        get(){
          return this.$store.state.selected
        },
        set(value){
          return this.$store.commit('switchTab', value)
        }
      },
      resume () {
        return this.$store.state.resume
      },
      resumeConfig(){
        return this.$store.state.resumeConfig
      }
    },
    methods: {
      changeResumeField(path, value){
        this.$store.commit('updateResume', {
          path,
          value
        })
      },
      gotoGithub(){
        window.open('https://github.com/Younger-Peng/resumer/tree/master/step-2')
      },
      addResumeSubfield(field){
        console.log(field)
        this.$store.commit('addResumeSubfield', {field})
      },
      removeResumeSubfield(field,i){
        this.$store.dispatch('removeResumeSubfield', {field,i})
      }
    }
  }
</script>

<style lang="scss" scoped>
  #resumeEditor{
    background: #fff;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.25);
    display: flex;
    flex-direction: row;
    overflow: auto;
    >nav{
      width: 80px;
      background: #3f81c1;
      color: white;
      >ol {
        >li {
          height: 48px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 16px;
          margin-bottom: 16px;
          cursor: pointer;
          &:hover {
            background: #4c98e2;
          }
          &.active {
            background: #fff;
            color: #666;
          }
          svg.icon{
            width: 24px ;
            height: 24px ;
          }
          &.github {
            position: relative;
            cursor: pointer;
            .message {
              position: absolute;
              display: none;
              top: 0;
              left: 100%;
              width: 120px;
              height: 100%;
              font-size: 14px;
              line-height: 48px;
              text-align: center;
              box-shadow: 3px 2px 2px rgba(0,0,0,0.3);
              &:hover {
                color: #E36049;
                text-decoration: underline;
              }
            }
            &:hover {
              background: white;
              color: #666;
              >.message {
                display: block;
              }
            }
          }
          
        }
      }
    }
    > .panels{
        flex-grow: 1;
        >li {
          padding: 24px;
        }
      }
  }
  ol{
    list-style: none;
  }
  .resumeField{
    > label {
      display: block;
    }
    input[type=text]{
      margin: 16px 0;
      border: 1px solid #ddd;
      box-shadow: inset 0 1px 3px 0 rgba(0,0,0,0.25);
      width: 100%;
      height: 40px;
      padding: 0 8px;
    }
  }
  hr{
    border: none;
    border-top: 1px solid #ddd;
    margin: 24px 0;
  }
  .subitem{
    position: relative;
    .button.remove{
      position: absolute;
      right: 0;
      top: -3px;
    }
  }
</style>