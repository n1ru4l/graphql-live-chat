import { RecordSourceSelectorProxy } from "relay-runtime";

type IOperation = {
  op: string;
  path: string;
  from: string;
  value: any;
};

export const applyPatch = (store: RecordSourceSelectorProxy, patch: any) => {
  const operations: IOperation[] = [];
  for (const operationRecordProxy of patch) {
    const operation = {
      op: operationRecordProxy.getValue("op"),
      path: operationRecordProxy.getValue("path"),
      from: operationRecordProxy.getValue("from"),
      value: operationRecordProxy.getValue("value"),
    };

    operations.push(operation);
  }
  for (const operation of operations) {
    applyOperation(store, operation);
  }
};

export const applyOperation = (
  store: RecordSourceSelectorProxy,
  operation: IOperation
) => {
  if (operation.op === "replace") {
    // Currently only supports paths of array/element/property
    const path = operation.path.split("/").filter((item) => item !== "");

    const list: any = store.getRoot().getLinkedRecords(path[0]);

    if (list && list[path[1]]) list[path[1]].setValue(operation.value, path[2]);
  } else if (operation.op === "remove") {
    // Currently only supports paths of array/element/property
    const path = operation.path.split("/").filter((item) => item !== "");
    const list: any = store.getRoot().getLinkedRecords(path[0]);
    if (list && list[path[1]]) {
      const dataID = list[path[1]].getDataID();
      if (dataID) store.delete(dataID);
    }
  } else if (operation.op === "add") {
    // Currently only supports paths of array/element/property
    const path = operation.path.split("/").filter((item) => item !== "");
    const list = store.getRoot().getLinkedRecords(path[0]);
    if (list) {
      if (store.get(operation.value.id)) {
        // in case the websocket connection is lost and re-established the entry could already exist inside the cache
        return;
      }
      const newRecord = store.create(operation.value.id /* dataID */, "Jedi");
      for (const key in operation.value) {
        // issue https://github.com/facebook/relay/issues/2441
        if (
          // @ts-ignore
          typeof operation.value[key] !== "array" &&
          typeof operation.value[key] !== "object" &&
          operation.value[key] !== null
        ) {
          newRecord.setValue(operation.value[key], key);
        }
      }

      const newRecords = [...list, newRecord].filter((item) => item);
      store.getRoot().setLinkedRecords(newRecords, path[0]); //
    }
  }
};
