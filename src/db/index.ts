import { useState } from "@/composables/state";
import { useSQLite, SQLiteHook } from "vue-sqlite-hook/dist";

import { App } from "vue";

const install = (app: App) => {
	/* SQLite Global Variables and Hook */
	const [jsonListeners, setJsonListeners] = useState(false);
	const [isModal, setIsModal] = useState(false);
	const [message, setMessage] = useState("");
	app.config.globalProperties.$isModalOpen = {
		isModal: isModal,
		setIsModal: setIsModal
	};
	app.config.globalProperties.$isJsonListeners = {
		jsonListeners: jsonListeners,
		setJsonListeners: setJsonListeners
	};
	app.config.globalProperties.$messageContent = {
		message: message,
		setMessage: setMessage
	};

	const onProgressImport = async (progress: string) => {
		if (app.config.globalProperties.$isJsonListeners.jsonListeners.value) {
			if (!app.config.globalProperties.$isModalOpen.isModal.value)
				app.config.globalProperties.$isModalOpen.setIsModal(true);
			app.config.globalProperties.$messageContent.setMessage(
				app.config.globalProperties.$messageContent.message.value.concat(
					`${progress}\n`
				)
			);
		}
	};
	const onProgressExport = async (progress: string) => {
		if (app.config.globalProperties.$isJsonListeners.jsonListeners.value) {
			if (!app.config.globalProperties.$isModalOpen.isModal.value)
				app.config.globalProperties.$isModalOpen.setIsModal(true);
			app.config.globalProperties.$messageContent.setMessage(
				app.config.globalProperties.$messageContent.message.value.concat(
					`${progress}\n`
				)
			);
		}
	};

	// SQLite Hook
	const {
		echo,
		getPlatform,
		createConnection,
		closeConnection,
		retrieveConnection,
		retrieveAllConnections,
		closeAllConnections,
		isConnection,
		addUpgradeStatement,
		importFromJson,
		isJsonValid,
		isDatabase,
		getDatabaseList,
		addSQLiteSuffix,
		deleteOldDatabases,
		copyFromAssets,
		checkConnectionsConsistency,
		removeListeners,
		isSecretStored,
		setEncryptionSecret,
		changeEncryptionSecret,
		isAvailable
	} = useSQLite({
		onProgressImport,
		onProgressExport
	});

	// Singleton SQLite Hook
	const appSqliteHook: SQLiteHook = {
		echo,
		getPlatform,
		createConnection,
		closeConnection,
		retrieveConnection,
		retrieveAllConnections,
		closeAllConnections,
		isConnection,
		isDatabase,
		getDatabaseList,
		addSQLiteSuffix,
		deleteOldDatabases,
		addUpgradeStatement,
		importFromJson,
		isJsonValid,
		copyFromAssets,
		checkConnectionsConsistency,
		removeListeners,
		isSecretStored,
		setEncryptionSecret,
		changeEncryptionSecret,
		isAvailable
	}
	app.config.globalProperties.$sqlite = appSqliteHook;

	//  Existing Connections Store
	const [existConn, setExistConn] = useState(false);
	app.config.globalProperties.$existingConn = {
		existConn: existConn,
		setExistConn: setExistConn
	};
};

export { install };

export default {
	install
}
