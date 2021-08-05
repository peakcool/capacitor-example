<template>
	<q-page class="flex flex-start flex-col p-12">
		<div class="flex flex-start flex-col">
			<span class="text-h4 mb-2">全量同步 </span>
			<span class="text-h5">同步时间 </span>
			<span class="mb-4">{{ syncDate || '暂无' }}</span>

			<q-table
				class="mb-2"
				title="users"
				:rows="users.data"
				:columns="users.columns"
				row-key="id"
			/>

			<q-table
				class="mb-4"
				title="message"
				:rows="messages.data"
				:columns="messages.columns"
				row-key="id"
			/>
		</div>

		<div class="mt-2 flex flex-start flex-col">
			<span class="text-h4 mb-2">部分同步 </span>
			<q-btn color="primary" label="立即同步" class="mb-4" @click="userDataSync"/>
		</div>
	</q-page>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, ref } from "vue";
import { SQLiteDBConnection, SQLiteHook  } from "vue-sqlite-hook/dist";
import { dataToImport, partialImport } from "../utils/import-json";
export default defineComponent({
	setup() {
		const app = getCurrentInstance();
		const sqlite: SQLiteHook = app?.appContext.config.globalProperties.$sqlite;
		const DB_NAME = 'local-data';

		let syncDate = ref(null);
		let users = ref<any>({
			data: [],
			columns: [
				{ name: 'id', label: 'id', field: (row:any) => row.id },
				{ name: 'email', label: 'email', field: (row:any) => row.email },
				{ name: 'name', label: 'name', field: (row:any) => row.name },
				{ name: 'age', label: 'age', field: (row:any) => row.age }
			]
		});

		let messages = ref<any>({
			data: [],
			columns: [
				{ name: 'id', label: 'id', field: (row:any) => row.id },
				{ name: 'title', label: 'title', field: (row:any) => row.title },
				{ name: 'body', label: 'body', field: (row:any) => row.body },
			]
		});

		const dataSyncFull = async(): Promise<void> => {
			try {

				// 检查插件是否正常
				let res: any = await sqlite.echo('check');
				if (res.value !== "check") return Promise.reject('sqlite 插件引入失败');

				// 校验同步数据
				res = await sqlite.isJsonValid(JSON.stringify(dataToImport));
				if (!res.result) return Promise.reject('同步数据格式有误');

				// 预执行数据同步操作
				/**
				 * importFromJson : transaction building the schema (Tables, Indexes) - transaction creating the Table's Data (Insert, Update)
				 */
				res = await sqlite.importFromJson(JSON.stringify(dataToImport));
				if (res.changes.changes === -1) return Promise.reject('预同步数据执行失败');

				// 检查是否连接
				res = await sqlite.isConnection(DB_NAME);
				if (res.result) { // 如果是，先关闭，再新建连接
					await sqlite.closeConnection(DB_NAME);
				}

				// 创建连接
				const db: SQLiteDBConnection = await sqlite.createConnection(DB_NAME, false, "no-encrtption", 1);

				// 打开连接
				await db.open();

				// 执行数据同步，根据JSON创建数据表
				res = await db.createSyncTable();
				if (res.changes.changes < 0) return Promise.reject('数据同步执行失败');

				await getRenderData(db);

				// close the connection
                await sqlite.closeConnection(DB_NAME);
				return Promise.resolve();
			} catch (error) {
				return Promise.reject(error.message);
			}
		}

		const userDataSync = async () => {
				let res: any = null;

				// 校验同步数据
				res = await sqlite.isJsonValid(JSON.stringify(partialImport));
				if (!res.result) return Promise.reject('同步数据格式有误');

				// 预执行数据同步操作
				res = await sqlite.importFromJson(JSON.stringify(partialImport));
				if (res.changes.changes === -1) return Promise.reject('预同步数据执行失败');

				// 检查是否连接
				res = await sqlite.isConnection(DB_NAME);
				if (res.result) { // 如果是，先关闭，再新建连接
					await sqlite.closeConnection(DB_NAME);
				}

				// 创建连接
				const db: SQLiteDBConnection = await sqlite.createConnection(DB_NAME, false, "no-encrtption", 1);

				// 打开连接
				await db.open();

				await getRenderData(db);

				// close the connection
                await sqlite.closeConnection(DB_NAME);
				return Promise.resolve();
		}

		const getRenderData = async (db: SQLiteDBConnection) => {
			try {
				let res: any = null;
				res = await db.getSyncDate();
				if (res.syncDate === 0) return Promise.reject('获取数据同步时间失败');
				syncDate.value = res;

				const userRes = await db.query("SELECT * FROM users;");
				if (userRes && userRes.values) {
					users.value.data = userRes.values;
				}

				const messageRes = await db.query("SELECT * FROM messages;");
				if (messageRes && messageRes.values) {
					messages.value.data = messageRes.values;
				}
				return Promise.resolve();
			} catch (error) {
				return Promise.reject(error.message);
			}
		}

		onMounted(async () => {
			await dataSyncFull();
			// Deal with the secure secret if you need it
			// by using an input form
			// here i used a constant
			// const secretPhrase = "abbey clammy gird night test";
			// const isSet = await sqlite.isSecretStored();
			// if (!isSet.result) {
			// 	await sqlite.setEncryptionSecret(secretPhrase);
			// }
		});

		return {
			syncDate,
			users,
			messages,

			userDataSync
		}
	},
});
</script>
