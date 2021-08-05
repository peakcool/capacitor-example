<template>
	<q-page class="flex flex-center flex-col">
		<q-btn color="primary" label="显示状态栏" class="mb-4" @click="showStatusBar" />
		<q-btn color="primary" label="隐藏状态栏" class="mb-4" @click="hideStatusBar" />
		<div class="mb-2"></div>
		<q-btn color="secondary" label="Dark模式" class="mb-4" @click="setStatusBarStyleDark" />
		<q-btn color="secondary" label="Light模式" class="mb-4" @click="setStatusBarStyleLight" />
	</q-page>
</template>

<style>
</style>

<script lang="ts">
import { StatusBar, Style } from '@capacitor/status-bar';
import { defineComponent } from 'vue';
export default defineComponent({
	name: 'StatusBar',
	setup() {

		// iOS only
		window.addEventListener('statusTap', function () {
			console.log('statusbar tapped');
		});

		// Display content under transparent status bar (Android only)
		StatusBar.setOverlaysWebView({ overlay: false });

		const setStatusBarStyleDark = async () => {
			await StatusBar.setStyle({ style: Style.Dark });
		};

		const setStatusBarStyleLight = async () => {
			await StatusBar.setStyle({ style: Style.Light });
		};

		const hideStatusBar = async () => {
			await StatusBar.hide();
		};

		const showStatusBar = async () => {
			await StatusBar.show();
		};

		return {
			setStatusBarStyleDark,
			setStatusBarStyleLight,
			hideStatusBar,
			showStatusBar
		}
	}
})
</script>
