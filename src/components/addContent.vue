<template>
	<div>
		<Tabs value="name1">
			<TabPane label="基本设置" name="name1"></TabPane>
			<TabPane label="SEO设置" name="name2"></TabPane>
			<TabPane label="可选设置" name="name3"></TabPane>
		</Tabs>
		<br />
		<Form :model="formItem" :label-width="100">
			<FormItem label="内容归属">
				<Select v-model="formItem.select">
					<Option value="beijing">New York</Option>
					<Option value="shanghai">London</Option>
					<Option value="shenzhen">Sydney</Option>
				</Select>
			</FormItem>
			<FormItem label="状态">
				<RadioGroup v-model="formItem.islock">
					<Radio label="立即发布"></Radio>
					<Radio label="存为草稿"></Radio>
				</RadioGroup>
			</FormItem>
			<FormItem label="标题">
				<Input v-model="formItem.title" placeholder=""></Input>
			</FormItem>
			<FormItem label="正文">
				<Input v-model="formItem.content" type="textarea" :rows="8" placeholder=""></Input>
			</FormItem>
			<FormItem label="简介">
				<Input v-model="formItem.intro" placeholder=""></Input>
			</FormItem>
			<FormItem label="标签">
				<Input v-model="formItem.tags" placeholder=""></Input>
				<br /> 多个标签请使用,或空格分隔
			</FormItem>
			<FormItem>
				<Button type="primary" @click="submitForm">提交</Button>
			</FormItem>
		</Form>
	</div>
</template>

<script>
	import { fetchPostUrlencoded, fetchGet, fetchGetHaveParam } from '../utils/requestHttp.js'

	export default {
		name: 'HelloWorld',
		data() {
			return {
				animal: '存为草稿',
				formItem: {
					islock: '存为草稿',
					title: '',
					content: '',
					intro: '',
					tags: '',
				},
				btnLoading: false,
			}
		},
		methods: {
			submitForm() {
				let _self = this;
				fetchPostUrlencoded('/www/?m=api&c=api&a=add_content', {
					id: '1',
					cid: '100',
					islock: this.formItem.islock,
					title: this.formItem.title,
					content: this.formItem.content,
					intro: this.formItem.intro,
					tags: this.formItem.tags,
				}).then((res) => {
					if(res.status !== 0) {
						_self.$Message.error(res.msg);
					} else {
						_self.$Message.success(res.message);
					}
				});
			},
		},

	}
</script>

<style scoped>

</style>