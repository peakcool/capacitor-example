<template>
	<q-page class="flex flex-center flex-col">
		<span>
			<q-icon
				:name="status.connected ? 'signal_wifi_4_bar' : 'signal_wifi_off'"
				:class="status.connected ? 'text-green-400' : 'text-red-400'"
				class="text-6xl mb-4"/>
		</span>
		<span>{{ status }}</span>
	</q-page>
</template>

<style>
</style>

<script>
import { Network } from '@capacitor/network';
import { ref } from 'vue';
export default {
	name: 'Network',
	setup() {

		let status = ref({});

		Network.addListener('networkStatusChange', res => {
			console.log('Network status changed', res);
			status.value = res;
		});

		const logCurrentNetworkStatus = async () => {
			status.value = await Network.getStatus();
			console.log('Network status:', status);
		};
		logCurrentNetworkStatus();

		return {
			status
		}
	}
}
</script>
