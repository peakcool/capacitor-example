<template>
	<q-page class="flex flex-center flex-col">
		<span>
			<q-icon
				:name="status && status.connected ? 'signal_wifi_4_bar' : 'signal_wifi_off'"
				:class="status && status.connected ? 'text-green-400' : 'text-red-400'"
				class="text-6xl mb-4"/>
		</span>
		<span>{{ status }}</span>
	</q-page>
</template>

<style>
</style>

<script lang="ts">
import { Network, ConnectionStatus } from '@capacitor/network';
import { ref, defineComponent } from 'vue';
export default defineComponent({
	name: 'Network',
	setup() {

		let status = ref<ConnectionStatus | null>(null);

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
})
</script>
