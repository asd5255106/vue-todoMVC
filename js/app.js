(function (window) {
	'use strict';

	// Your starting point. Enjoy the ride!

	/*
		todoMVC
			* 渲染任务列表
			* 输入内容回车提交任务
			* 点击复选框：完成任务
			* 复选框：全选全不选
			* 双击编辑任务项
			* 删除任务项
			* 统计未完成条数
			* 切换不同的状态：数据切换
			* 清除所有完成任务项
			* 数据的存储
	*/

	let key = 'mydata';
	let storage = {
		get () {
			// 获取本地储存数据，取出来转成对象
			let res = localStorage.getItem(key);
			if(res){
				res = JSON.parse(res);
			}else{
				res = []
			}
			return res
		},
		set(data){
			// 存入前转成字符串
			localStorage.setItem(key,JSON.stringify(data));
		}
	} 

	let vm = new Vue({
		el: '#app',
		data: {
			// 假数据
			taskList:storage.get(),
			/* [
				{
					id: 1,
					con: 'lklan todoMVC',
					completed: false

				}, {
					id: 2,
					con: 'kaylk todoMVC',
					completed: true
				}, {
					id: 3,
					con: 'lhljtljy todoMVC',
					completed: false
				}
			], */
			msg: '', //输入框属性
			currentIndex: null,
			status:''
		},
		// 方法
		methods: {
			// 输入内容提交
			add() {
				// console.log(this.msg)
				if(this.msg){
					let obj = {
						id: this.taskList.length + 1,
						con: this.msg,
						completed: false
					}
					this.taskList.push(obj);
					this.msg = '';
				}else{
					alert('Please write something')
				}
			},

			// 双击编辑
			edit(index) {
				// console.log(index)
				this.currentIndex = index;
			},

			// 失去焦点时，移除编辑框，如果该任务项内容已经为空，就删除该任务项
			keepItem(index) {
				this.currentIndex = null;
				if (!this.taskList[index].con) {
					this.taskList.splice(index, 1);
				}
			},

			// 删除一条任务项
			delItem(index){
				let del = confirm('您确定要删除吗')
				if(del){
					this.taskList.splice(index,1)
				}
			},

			// 清除所有完成任务项
			removeall(){
				let res = confirm('确定要删除所有完成项吗')
				if(res){
					this.taskList = this.taskList.filter(item => item.completed == false)
				}
			}
		},

		// 计算属性
		computed: {
			// 全选与全不选
			allCheck: {
				get() {
					return this.taskList.every(item => item.completed == true);
				},
				set(val){
					console.log(val)
					this.taskList.forEach(element => {
						element.completed = val;
					});
				}
			},

			// 统计未完成的条数
			total(){
				return this.taskList.filter(item => item.completed == false).length
			},

			// 过滤数据的计算属性
			filterList(){
				switch(this.status){
					case '':
						return this.taskList;
						break;
					case 'active':
						return this.taskList.filter(item => item.completed == false);
						break;
					case 'completed':
						return this.taskList.filter(item => item.completed == true);
						break;
				}
			},

			// 隐藏footer
			nowLen(){
				return this.taskList.length;
			}

		},

		// 监听器
		watch:{
			taskList:{
				deep:true,//深度监听
				handler(newval){
					storage.set(newval)
				}
			}
		}
	})

	// 哈希值发生改变的时候，这里就会触发
	window.onhashchange = function(){
		let hash = location.hash.slice(2);
		// console.log(hash);
		vm.status = hash
	}

	window.onhashchange()


})(window);
