<template>
  <div class="pageWrap">
    <nav class="header underline" ref="header" >
      <slot name="header">
        <div class="back" @click='$router.back()'>
          back
        </div>
      </slot>
    </nav>
    <section class="body" ref='bodyDom' :style="{background: bgColor}">
      <ul>
        <slot>
          <!-- <ul>
            <li v-for="item in 100" @click="$router.push('/test2?id=ss')">{{item}}</li>
          </ul> -->
        </slot>
      </ul>
    </section>
    <footer ref='footer' class="footer">
      <slot name='footer'>
        footer
      </slot>
    </footer>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'page-wrap',
  data: ()=> ({
    minHeight: 100,
    offsetTop: 40,
    offsetBottom: 50
  }),
  props: {
    showHeader: {
      type: Boolean,
      default: true,
    },
    showFooter: {
      type: Boolean,
      default: true,
    },
    bgColor: {
      type: String,
      default: '#fff'
    }
  },
  methods: {
    // 获取高度
		getHeight(){
			let h = window.screen.availHeight
			if(this.showHeader){
				let hh = this.$refs.header.getBoundingClientRect().height
				this.offsetTop = hh
				h = h-hh
			}
			if(this.showFooter){
				let ff = this.$refs.footer.getBoundingClientRect().height
				this.offsetBottom = ff
				h = h-ff
			}
			this.minHeight = h
		},
		// 改变尺寸
		resize(){
			window.onresize = ()=> {
				this.getHeight()
			}
		},
		_initSC(){
			this.scrollPage = new BScroll(this.$refs.bodyDom, {click: true})
		},
    hasImg(){
      let img = document.getElementsByTagName('img')
      if(img.length>0){
        // 有图片
        img[0].onload = ()=> {
          this._initSC()
        }
      }else {
        // 无图片
        return
      }
    }
  },
  mounted(){
    (async ()=> {
      await this.getHeight()
      await this.resize()
      await this._initSC()
      await this.hasImg()
    })()
  }
}
</script>

<style scoped>
.pageWrap {
  display: flex;
  flex-direction: column;
  max-width: 680px;
  background: #fff;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  bottom: 0;
}
.header {
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  width: 100%;
  background: #fff;
  box-sizing: border-box;
  flex-grow: 0;
  flex-shrink: 0;
}
.body {
  flex-grow: 1;
  overflow-y: hidden;
  overflow-x: hidden;
}
.footer {
  background: #fafafa;
  display: flex;
  align-items: center;
  height: 50px;
  flex-grow: 0;
  flex-shrink: 0;
}
</style>
