<template>
	<el-dialog
		:class="[customClass, isFullScreen ? 'full_screen' : '']"
		v-model="innerVisible"
		@open="handleDialogOpen"
		:close-on-click-modal="true"
		:close-on-press-escape="false"
		v-bind="$attrs"
	>
		<template #header>
			<span class="sagi_dialog_title">{{ title }}</span>
			<el-icon title="全屏" v-if="size !== 'all' && !isFullScreen" @click="handleFullScreen(true)"><FullScreen /></el-icon>
			<el-icon title="退出全屏" v-if="size !== 'all' && isFullScreen" @click="handleFullScreen(false)"><FullScreen /></el-icon>
			<slot name="head"></slot>
		</template>
		<div class="sagi_dialog_content" v-loading="contentLoading">
			<slot></slot>
		</div>
		<template v-if="!contentLoading" #footer>
			<slot name="footer" v-if="$slots.footer" />
			<template v-else>
				<el-button
					v-for="button in btnList"
					:key="button.label"
					:plain="button.plain"
					:type="button.type"
					:loading="button.isLoading"
					:disabled="button.disabled"
					:size="button.size"
					@click="handleButtonClick(button)"
				>
					{{ button.label }}
				</el-button>
			</template>
		</template>
	</el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, onMounted, watch, reactive } from 'vue'
import { TDialogButtonOption } from '@/types/common'

export default defineComponent({
	name: 'myDialog',
	inheritAttrs: false,
	emits: ['open', 'close', 'update:visible', 'btn-click', 'full'],
	props: {
		visible: {
			type: Boolean,
			required: true,
			default: false
		},
		size: {
			type: String,
			default: 'default' // 小:  中: 'default' 大: 'large' 巨大: huge
		},
		title: {
			type: String,
			default: '温馨提示'
		},
		buttons: {
			type: Array as PropType<Array<TDialogButtonOption>>,
			default: () => [
				{ label: '取消', command: 'no' },
				{ label: '确定', command: 'yes', manualClose: true, isAsync: true }
			]
		},
		contentLoading: {
			type: Boolean,
			default: false
		}
	},
	setup(props, { emit }) {
		const customClass = ref(`sagi_dialog sagi_dialog_${props.size}`)
		// 组件内部的visible属性
		const innerVisible = ref(props.visible)
		const btnList = reactive<Array<TDialogButtonOption>>([])
		// 初始化button列表
		const initButtons = () => {
			btnList.length = 0
			const btns: Array<TDialogButtonOption> = JSON.parse(JSON.stringify(props.buttons))
			for (let button of btns) {
				// 修改默认风格
				if (!button.type) {
					button.type = 'primary'
					if (button.command === 'no') button.type = 'default'
				}
				if (!button.size) button.size = 'default'
				btnList.push(button)
			}
		}
		// 挂载完毕
		onMounted(() => {
			initButtons()
		})
		// 打开dialog
		const handleDialogOpen = () => {
			emit('open')
		}
		// 按钮点击
		const handleButtonClick = (button: TDialogButtonOption) => {
			emit('btn-click', button, () => (innerVisible.value = false), btnList)
			if (button.isAsync) {
				btnList.forEach((item) => {
					if (item.command === button.command) {
						item.isLoading = true
					}
				})
			}
			if (!button.isAsync && !button.manualClose) {
				innerVisible.value = false
			}
		}
		// 按钮变化则重置button列表
		watch(() => props.buttons, initButtons)
		// 同步组件内部的visible属性
		watch(
			() => props.visible,
			(val: boolean) => {
				innerVisible.value = val
				if (!val) {
					isFullScreen.value = false
					emit('full', val)
				}
			}
		)
		// 更新传递的visible属性
		watch(innerVisible, (val: boolean) => {
			if (!val) {
				emit('update:visible', false)
			} else {
				for (const item of btnList) {
					item.isLoading = false
				}
			}
		})
		// 处理全屏点击
		const isFullScreen = ref(false)
		const handleFullScreen = (bool: boolean) => {
			isFullScreen.value = bool
			emit('full', bool)
		}
		return {
			customClass,
			btnList,
			handleDialogOpen,
			innerVisible,
			handleButtonClick,
			isFullScreen,
			handleFullScreen
		}
	}
})
</script>

<style lang="scss">
.el-dialog__body {
	max-height: calc(100vh - 120px) !important;
}
.sagi_dialog {
	border-radius: 6px;
	width: 50%;
	transition: ease 0.3s;
	.el-dialog__footer {
		.el-button + .el-button {
			margin-left: 20px;
		}
	}
	.el-dialog__header {
		border-radius: 6px 6px 0 0;
		height: 50px;
		padding: 0;
		padding-left: 20px;
		line-height: 50px;
		margin-right: 0 !important;
		.title_icon {
			position: absolute;
			left: 20px;
			top: 15px;
			opacity: 0.6;
			transition: 0.2s;
			line-height: 1.5;
			&:hover {
				opacity: 1;
			}
		}
	}
	.el-dialog__footer {
		text-align: right;
	}
	.sagi_dialog_title {
		margin-right: 10px;
	}
	.full_icon {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		top: 4px;
		right: 54px;
		padding: 0;
		width: 54px;
		height: 54px;
		border: none;
		outline: 0;
		cursor: pointer;
		color: var(--el-color-info);
		font-size: var(--el-message-close-size, 16px);
	}
	.sagi_dialog_content {
		min-height: 100px;
	}
	// 全屏
	&.sagi_dialog_all {
		width: 100%;
		height: 100%;
	}
	// 巨大型
	&.sagi_dialog_huge {
		width: 85%;
	}
	// 大型
	&.sagi_dialog_large {
		width: 65%;
	}
	// 小型
	&.sagi_dialog_small {
		width: 35%;
		.el-dialog__footer {
			.el-button {
				width: 100px;
			}
		}
	}
}
.full_screen {
	width: 100% !important;
	height: 100% !important;
	border-radius: 0px !important;
}
// 大于1280时
@media screen and (min-width: 1280px) {
	.sagi_dialog {
		min-width: 600px;
		&.sagi_dialog_small {
			min-width: 400px;
		}
		&.sagi_dialog_large {
			min-width: 1000px;
		}
	}
}
</style>
