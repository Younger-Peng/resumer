<template>
  <div id="resumePreview">
    <button class="button" @click="save">save</button>
    <router-link class="button" to="/preview" >preview</router-link>
    <section data-name="profile" v-if="resume.profile && resume.profile.name">
      <h1>
        {{resume.profile.name}}
      </h1>
      <h2> {{resume.profile.title}} </h2>
      <p>
        <small>{{resume.profile.city}}</small>
        <small>{{resume.profile.birthday}}</small>
      </p>
    </section>
    <section data-name="projects" v-if="resume.projects && resume.projects.length > 0">
      <h2>项目经历</h2>
      <ol>
        <li v-for="item in resume.projects">
          <h3>{{item.name}}</h3>
          <p v-show="item.details"> {{item.details}} </p>
        </li>
      </ol>
    </section>
    <section data-name="workHistory" v-if="resume.workHistory && resume.workHistory.length > 0">
      <h2>工作经历</h2>
      <ol>
        <li v-for="item in resume.workHistory">
          <h3>{{item.company}}</h3>
          <p v-show="item.details">{{item.details}}</p>
        </li>
      </ol>
    </section>
    <section data-name="education" v-if="resume.education && resume.education.length > 0">
      <h2>毕业院校</h2>
      <ol>
        <li v-for="item in resume.education">
          <h3>
            {{item.school}}
            <span v-show="item.details"> - {{item.details}}</span>
          </h3>
        </li>
      </ol>
    </section>
    <section data-name="awards" v-if="resume.awards && resume.awards.length > 0">
      <h2>获奖情况</h2>
      <ol>
        <li v-for="item in resume.awards">
          <h3>{{item.name}}</h3>
          <p v-show="item.details"> {{item.details}}</p>
        </li>
      </ol>
    </section>
    <section data-name="contacts" v-if="resume.contacts && resume.contacts.length > 0">
      <h2>联系方式</h2>
      <table>
        <tr v-for="item in resume.contacts">
          <td> {{item.contact}} </td>
          <td v-show="item.content"> {{item.content}} </td>
        </tr>
      </table>
    </section>
    

  </div>
</template>

<script>
export default {
  name: 'ResumePreview',
  computed: {
    resume(){
      return this.$store.state.resume
    }
  },
  methods: {
    save(){
      this.$store.dispatch('saveResume')
    }
  }
}
</script>

<style lang="scss">
  #resumePreview{
    background: white;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.25);
    padding: 2em;
    color: #333;
    overflow: auto;
    line-height: 1.2;
    * {
      box-sizing: border-box;
      font-variant: normal;
      font-weight: normal;
    }
    .button {
      text-align: center;
    }
    ol {
      list-style: none;
    }
    section + section {
      margin-top: 2em;
    }
    p {
      line-height: 1.5;
      font-size: 14px;
      color: #888;
      font-family: '兰亭黑-简', 'Microsoft Yahei', 'sans-serif';
      white-space: pre-line;//合并连续空白符，保留换行符
    }
    section {
      > h2:first-child {
        background: #f3f3f3;
        display: inline-block;
        padding: 0.2em;
        margin-bottom: 0.5em;
        border-radius: 3px;
        color: #666;
      }
    }
    section[data-name="profile"] {
      >h1 {
        margin: 0.1em 0;
        font-size: 4em;
      }
    }
    section[data-name="workHistory"],
    section[data-name="projects"],
    section[data-name="awards"]{
      margin-top: 1rem;
      li + li {
        margin-top: 1em;
      }
      li {
        h3 {
          color: #666;
          font-family: '兰亭黑-简', 'Microsoft Yahei', 'sans-serif';
          font-size: 18px;
          border-bottom: 1px dashed #3f81c1;
          padding-bottom: 0.3em;
          margin-bottom: 0.3em;
        }
      }
    }
    section[data-name="contacts"]{
      margin-top: 1rem;
      td:first-child{
        color: #666;
        line-height: 1.5;
        padding-right: 1em;
      }
      td:last-child{
        color: #888;
        line-height: 1.5;
        padding-right: 1em;
      }
    }
  }
</style>