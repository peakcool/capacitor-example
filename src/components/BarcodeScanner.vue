<template>
	<q-page class="flex flex-center flex-col">
		<q-btn color="primary" label="开启扫码" class="mb-4" @click="startScan"/>
		<span class="text-h5 mb-2">扫码内容</span>
		<span class="mb-4">{{ scanResult ? '暂无' : scanResult }}</span>
	</q-page>
</template>

<style>
</style>

<script>
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { ref } from 'vue';
export default {
	name: 'BarcodeScanner',
	setup() {

		let scanResult = ref({});

		const startScan = async () => {
			BarcodeScanner.hideBackground(); // make background of WebView transparent
			const result = await BarcodeScanner.startScan(); // start scanning and wait for a result

			// if the result has content
			if (result.hasContent) {
				scanResult.value = result;
				console.log('scan result:', result.content); // log the raw scanned content
			} else {
				console.log('scan empty!!!');
			}
		};

		return {
			startScan,
			scanResult
		}
	},
	methods: {
		stopScan() {
			BarcodeScanner.showBackground();
			BarcodeScanner.stopScan();
		},
	},
	deactivated() {
		this.stopScan();
	},
	beforeUnmount() {
		this.stopScan();
	}
}
</script>
