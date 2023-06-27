import { useNavigate, useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";

import { Task, TaskType } from "../../types";
import {
  handleErrorRedirect,
  handleFormSubmit,
} from "../../functions/controller";

import {
  emptyFields,
  Fields,
  formattedFields,
  getSendableData,
  notLoadedRecord,
  RecordForm,
  validateFields,
} from "../../components/Task/GenericTask";
import { notLoadedRecord as notLoadedParent } from "../../components/Collection/GenericCollection";
import { AlertProps } from "@cloudscape-design/components";

export default function CreateEditTask({ edit }: { edit: boolean }) {
  const navigate = useNavigate();

  const [task, setTask] = useState<Task>(notLoadedRecord);
  const [collection, setCollection] = useState(notLoadedParent);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<AlertProps.Type>("success");
  const [inputValues, setInputValues] = useState<Fields>(emptyFields);

  let commonCollectionId = ``;
  let commonProjectId = ``;
  let previousPageWebLink = ``;
  let fetchRecordServerLink = ``;
  let pushRecordServerLink = ``;
  let sendableDataFunction = () => getSendableData({ inputValues });

  if (edit) {
    const { id } = useParams();
    previousPageWebLink =
      fetchRecordServerLink =
      pushRecordServerLink =
        `/tasks/${id}`;
    commonCollectionId = task.collection?.id ?? ``;
    commonProjectId = task.collection?.project?.id ?? ``;
    function handleFetchResponse() {
      if (task.type === TaskType.commonTask) {
        setInputValues(formattedFields(task));
      } else {
        handleErrorRedirect(
          navigate,
          new Error("Task is not of editable type"),
          `/collections/${commonCollectionId}`
        );
      }
    }
    useEffect(() => {
      handleFetchResponse();
    }, [task]);
  } else {
    const { collectionId } = useParams();
    previousPageWebLink =
      fetchRecordServerLink = `/collections/${collectionId}`;
    pushRecordServerLink = `/tasks`;
    commonCollectionId = collectionId ?? ``;
    commonProjectId = collection.project?.id ?? ``;
    sendableDataFunction = () =>
      getSendableData({
        inputValues,
        ...(collectionId ? { parentId: collectionId } : {}),
      });
  }

  async function handleSubmit(event: FormEvent) {
    handleFormSubmit({
      event: event,
      edit: edit,
      validFields: validateFields(inputValues),
      relativeServerUrl: pushRecordServerLink,
      sendableData: sendableDataFunction(),
      setAlertType: setAlertType,
      setAlertVisible: setAlertVisible,
      navigate: navigate,
      successRedirectLink: previousPageWebLink,
    });
  }

  const commonAttributes: any = {
    handleSubmit: handleSubmit,
    alertType: alertType,
    alertVisible: alertVisible,
    setAlertVisible: setAlertVisible,
    inputValues: inputValues,
    setInputValues: setInputValues,
    cancelRedirectLink: previousPageWebLink,
    collectionId: commonCollectionId,
    projectId: commonProjectId,
    hasParent: true,
    fetchRecordLink: fetchRecordServerLink,
  };
  if (edit) {
    commonAttributes.edit = true;
    commonAttributes.setRecord = setTask;
  } else {
    commonAttributes.edit = false;
    commonAttributes.setRecord = setCollection;
  }
  return <RecordForm {...commonAttributes} />;
}
