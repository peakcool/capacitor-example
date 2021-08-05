<template>
	<q-layout view="lHh Lpr lFf">
		<q-header elevated class="glossy">
			<q-toolbar>
				<q-btn
					flat
					dense
					round
					@click="leftDrawerOpen = !leftDrawerOpen"
					aria-label="Menu"
					icon="menu"
				/>

				<q-toolbar-title> Quasar App </q-toolbar-title>

				<div>Quasar v{{ $q.version }}</div>
			</q-toolbar>
		</q-header>

		<q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-2">
			<q-list>
				<q-item-label header>Essential Links</q-item-label>
				<q-item clickable to="/">
					<q-item-section avatar>
						<q-icon name="home" />
					</q-item-section>
					<q-item-section>
						<q-item-label>主页</q-item-label>
						<q-item-label caption>点击返回主页</q-item-label>
					</q-item-section>
				</q-item>
				<q-item clickable to="/network">
					<q-item-section avatar>
						<q-icon name="wifi" />
					</q-item-section>
					<q-item-section>
						<q-item-label>网络状态</q-item-label>
						<q-item-label caption>@capacitor/network</q-item-label>
					</q-item-section>
				</q-item>
				<q-item
					clickable
					to="/device"
				>
					<q-item-section avatar>
						<q-icon name="devices" />
					</q-item-section>
					<q-item-section>
						<q-item-label>设备信息</q-item-label>
						<q-item-label caption>@capacitor/device</q-item-label>
					</q-item-section>
				</q-item>
				<q-item
					clickable
					to="/barcode-scanner"
				>
					<q-item-section avatar>
						<q-icon name="qr_code_scanner" />
					</q-item-section>
					<q-item-section>
						<q-item-label>条码扫描</q-item-label>
						<q-item-label caption>@capacitor-community/barcode-scanner</q-item-label>
					</q-item-section>
				</q-item>
				<q-item
					clickable
					to="/status-bar"
				>
					<q-item-section avatar>
						<q-icon name="laptop_mac" />
					</q-item-section>
					<q-item-section>
						<q-item-label>状态栏</q-item-label>
						<q-item-label caption>@capacitor/status-bar</q-item-label>
					</q-item-section>
				</q-item>
				<q-item
					clickable
					to="/status-bar"
				>
					<q-item-section avatar>
						<q-icon name="folder" />
					</q-item-section>
					<q-item-section>
						<q-item-label>SQLite</q-item-label>
						<q-item-label caption>@capacitor-community/sqlite</q-item-label>
					</q-item-section>
				</q-item>
			</q-list>
		</q-drawer>

		<q-page-container>
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script>
import { ref } from 'vue'
export default {
	name: 'LayoutDefault',
	setup() {
		return {
			leftDrawerOpen: ref(false)
		}
	}
}
</script>
