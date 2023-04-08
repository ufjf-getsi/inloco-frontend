import { AxiosResponse } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { CommonTask, TaskType } from "../../types";

import { AlertProps } from "@cloudscape-design/components";
import {
  fetchRecordData,
  handleFormSubmit,
} from "../../components/Generic/GenericFunctions";
import {
  emptyFields,
  Fields,
  RecordForm,
  validateFields,
} from "../../components/Task/GenericTask";

export default function CreateTask() {
  const navigate = useNavigate();
  const paramsCollectionId = useParams().collectionId;

  const [projectId, setProjectId] = useState("");
  const [collectionId, setCollectionId] = useState("");

  useEffect(() => {
    fetchRecordData(
      `/collections/${paramsCollectionId}`,
      navigate,
      function (response: AxiosResponse<any, any>) {
        setProjectId(response.data.projectId);
        setCollectionId(paramsCollectionId ?? "");
      }
    );
  }, []);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<AlertProps.Type>("success");
  const [inputValues, setInputValues] = useState<Fields>(emptyFields);

  async function handleSubmit(event: FormEvent) {
    const sendableData: CommonTask = {
      type: TaskType.commonTask,
      id: "",
      isPending: inputValues.status.value !== "completed",
      collectionId: collectionId,
      title: inputValues.title,
    };
    handleFormSubmit({
      event: event,
      edit: false,
      validFields: validateFields(inputValues),
      relativeServerUrl: `/tasks`,
      sendableData: sendableData,
      setAlertType: setAlertType,
      setAlertVisible: setAlertVisible,
      navigate: navigate,
      successRedirectLink: `/collections/${collectionId}`,
    });
  }

  return (
    <RecordForm
      edit={false}
      handleSubmit={handleSubmit}
      alertType={alertType}
      alertVisible={alertVisible}
      setAlertVisible={setAlertVisible}
      inputValues={inputValues}
      setInputValues={setInputValues}
      cancelRedirectLink={`/collections/${collectionId}`}
      collectionId={collectionId}
      projectId={projectId}
    />
  );
}
