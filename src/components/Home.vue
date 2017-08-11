<template>
	<div>
		<header class="header" ref='headerDom' v-if="showHeader">
			<slot name='header'>
				<span @click="$router.push('/test')">header</span>
			</slot>
		</header>

		<!-- <div class="wrapper" ref="wrapper"> -->
			<section
				ref='bodyDom'
				id="bodyDom"
				class="body"
				:style="{
					minHeight: `${minHeight}px`,
					top: `${offsetTop}px`,
					paddingBottom: `${offsetBottom}px`,
					background: bgColor
				}"
				:class="{padBootom: !showFooter, padTop: !showHeader}"
				>
				<div v-if="isScroll" class="wrapper" ref="pageWrap" :style="{height: `${minHeight}px`}">
				    <ul ref="content">
				      <slot></slot>
				    </ul>
				 </div>
				<div v-else>
			  		<slot>
						<ul>
							<li v-for="item in 100" :key="item">{{item}}</li>
						</ul>
					</slot>
			  	</div>

			</section>
		<!-- </div> -->

		<footer class="footer" ref='footerDom' v-if="showFooter">
			<slot name='footer'>
				footer
			</slot>
		</footer>
	</div>
</template>


<script>
import BScroll from 'better-scroll'

export default {
	data: ()=> ({
		minHeight: 400,
		offsetTop: 40,
		offsetBottom: 50,
	}),
	props: {
		showHeader: {
			type: Boolean,
			default: true
		},
		showFooter: {
			type: Boolean,
			default: true
		},
		bgColor: {
			type: String,
			default: '#fff'
		},
		scroller: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		isScroll: function(){
			if("ontouchstart" in document){
				return this.scroller
			}else {
				return false
			}
		}
	},
	methods: {
		// 获取高度
		getHeight(){
			let h = document.body.clientHeight
			if(this.showHeader){
				let hh = this.$refs.headerDom.getBoundingClientRect().height
				this.offsetTop = hh
				h = h-hh
			}
			if(this.showFooter){
				let ff = this.$refs.footerDom.getBoundingClientRect().height
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
			if(this.isScroll){
				this.scrollPage = new BScroll(this.$refs.pageWrap, {})
			}
		},
	},
	mounted(){
		(async ()=> {
			await this.getHeight()
			await this.resize()
			await this._initSC()
		})()
	}
}
</script>




<style scoped>
.header {
	position: fixed;
	top: 0;
	width: 100%;
	max-width: 680px;
	min-height: 40px;
	left: 50%;
	transform: translate(-50%);
	background: #fff;
	z-index: 99;
}
.body {
	position: relative;
	width: 100%;
	max-width: 680px;
	margin: 0 auto;
}
.footer {
	position: fixed;
	bottom: 0;
	width: 100%;
	max-width: 680px;
	left: 50%;
	transform: translate(-50%);
	min-height: 50px;
	background: #fff;
	z-index: 99;
}
.padBootom {
	padding-bottom: 0 !important;
}
.padTop {
	top: 0 !important;
}
li {
  list-style: none;
}
</style>
