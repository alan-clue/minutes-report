<template>
  <section class="container">
    <div class="l-side">
      <Calender></Calender>
    </div>
    <div class="l-main">
      <div class="p-posts">
        <div class="p-posts__header">
          <h2 class="p-posts__date">
            {{ date | date }}
          </h2>
        </div>
        <div class="p-posts__body">
          <div class="p-post__lists">
            <div v-for="item in readContent" :key="item.id" class="m-post" :class="[editId == item.id ? 'editing': '']">

              <div class="m-post__edit" v-if="editId == item.id">
                <div contenteditable="true" aria-multiline="true" role="textbox" v-html="item.body.replace(/\r?\n/g, '<br>')" @input="syncInnerBody" class="m-post__editText"></div>
                <span @click="editingFinish()"  class="btn btn--default">キャンセル</span>
                <span @click="editedSubmit(item)" class="btn btn--primary">変更を保存</span>
              </div>
              <div class="m-post__content" v-else>
                <p class="m-post__date">{{ item.created_at | time }}</p>
                <div class="m-post__text" v-html="$md.render(item.body)"  contenteditable="false"></div>
              </div>
              <div class="m-post__menus" v-show="isEditing == false">
                <span @click="editingPost(item)" class="m-post__menu"><fa icon="pencil-alt" area-hidden="true" />編集</span>
                <span class="m-post__menu">削除</span>
              </div>

            </div>
          </div>
        </div>
        <div class="p-posts__footer">
          <div class="p-posts__input">
            <div class="p-posts__input__inner">
              <div class="p-post_input">
                <div class="p-post_input_field">
                  <div class="p-post_input_editor">
                    <input type="text" v-model="postContent">
                  </div>
                  <div class="p-buttons">
                    <button @click="createPost">送信</button>
                  </div>
                </div>

              </div>
              <div class="p-notification_bar"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Calender from '@/components/Calender'
import sanitizeHtml from 'sanitize-html'
export default {
  components: {
    Calender,
  },
  data: () => ({
    date: '2020-05-08',
    readContent: '',
    postContent: '',
    isEditing: false,
    editId: '',
    innerBody: ''
  }),
  methods: {
    createPost () {
      if (this.postContent == '') return false
      const post = {
        body: this.postContent
      };
      this.$axios.$post('/api/v1/post',
        post
      ).then(
        res => (
          this.readContent.push(res)
        )
      )
      this.postContent = ''
    },
    editingPost (elm) {
      this.isEditing = true
      this.editId = elm.id
      this.innerBody = elm.body
    },
    syncInnerBody (elm) {
      this.innerBody = elm.target.innerText.trim()
    },
    editingFinish(){
      this.isEditing = false
      this.editId = ''
      this.innerBody = ''
    },
    editedSubmit (elm) {
      const updateItemNum = this.readContent.findIndex(({id}) => id === elm.id);
      const post = {
        body: this.innerBody
      };
      this.$axios.$put('/api/v1/post/' + elm.id,
        post
      ).then(
        res => (
          this.$set(this.readContent,updateItemNum,res),
          this.editingFinish()
        )
      )
    },
    deletePost () {

    }
  },
  created() {
    let option = {
      params: {
        date: this.date
      }
    }
    this.$axios.$get('/api/v1/post',option).then(
      res => (
        this.readContent = res
      )
    )
  },
}
</script>

<style lang="scss">
.container {
  min-height: 100vh;
  display: flex;
}
.l-side {
  width: 320px;
  flex: 0 1 auto;
  background-color: #736A62;
}
.l-main {
  flex: 1 1 auto;
}
.m-post {

  padding: 8px 16px 8px 16px;
  position: relative;
  &__editText {
    border: 1px solid #736A62;
    border-radius: 3px;
    padding: 8px;
    outline: none;
    margin: 0 0 8px 0;
    background-color: #fff;
  }
  &__menus {
    position: absolute;
    top: -16px;
    right: 16px;
    display: none;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #fff;
    padding: 2px;
  }
  &__menu {
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 3px;
    display: inline-block;
    &:hover {
      background-color: #f3f3f3;
    }
  }
  &:hover {
    background-color: #f3f3f3;
    .m-post__menus {
      display: block;
    }
  }
  &.editing {
    background-color: rgb(250, 246, 242);
  }
  &__date {
    color: #aaa;
  }
  &__text {
    & /deep/ pre {
      display: inline-block;
      border: solid 1px #ddd;
      background-color: #f3f3f3;
      padding: 8px;
      border-radius: 3px;
      margin: 8px 0;
    }
    > p {
      margin-bottom: 1em;
      &:last-child {
        margin-bottom: 0;
      }
    }
    ul,ol {
      list-style-position: inside;

      &.task-list {
        list-style: none;
      }
    }
    blockquote {
      padding: 0 0 0 1em;
      border-left: 3px solid #ddd;
    }
  }
}
.p-posts {
  display: flex;
  flex-direction: column;
  height: 100%;
  &__header {
    height: 64px;
    padding: 0 0 0 16px;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
  }
  &__date {
    font-size: 2rem;
  }
  &__body {
    flex: 1 1 auto;
  }

  &__footer {
    padding: 0 0 0 16px;
    height: 72px;
  }
}
.btn {
  display: inline-block;
  padding: 4px 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  &--default {
    background-color: #fff;

  }
  &--primary {
    background-color: #F39946;
    border-color: #F39946;
    color: #fff;
  }
}
</style>
