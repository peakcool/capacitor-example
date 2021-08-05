<template>
	<q-page class="flex flex-start flex-col p-12">
		<span class="text-h5">设备 UUID </span>
		<span class="mb-4">{{ id }}</span>

		<span class="text-h5">硬件信息</span>
		<span class="mb-4">{{ device }}</span>

		<span class="text-h5">电池信息</span>
		<span class="mb-4">{{ battery }}</span>

		<span class="text-h5">设备语言</span>
		<span>{{ languageCode }}</span>
	</q-page>
</template>

<style>
</style>

<script lang="ts">
import { Device, DeviceId, DeviceInfo, BatteryInfo, GetLanguageCodeResult } from '@capacitor/device';
import { ref, defineComponent } from 'vue';
export default defineComponent({
	name: 'Device',
	setup() {

		let id = ref<DeviceId>(null);
		const logDeviceId = async () => {
			id.value = await Device.getId();
			console.log('id info: ', id.value);
		};

		let device = ref<DeviceInfo>(null);
		const logDeviceInfo = async () => {
			device.value = await Device.getInfo();
			console.log('device info: ', device.value);
		};

		let battery = ref<BatteryInfo>({});
		const logBatteryInfo = async () => {
			battery.value = await Device.getBatteryInfo();
			console.log('battery info: ', battery.value);
		};

		let languageCode = ref<GetLanguageCodeResult>(null);
		const logLanguageCode = async () => {
			languageCode.value = await Device.getLanguageCode();
			console.log('deviceLanguageCode info: ', languageCode.value);
		};

		logDeviceId();
		logDeviceInfo();
		logBatteryInfo();
		logLanguageCode();

		return {
			id,
			device,
			battery,
			languageCode
		}
	}
})
</script>
