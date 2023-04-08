import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";

import { AlertProps } from "@cloudscape-design/components";
import {
  Fields,
  emptyFields,
  validateFields,
  RecordForm,
  getSendableData,
} from "../../components/Project/GenericProject";
import { handleFormSubmit } from "../../components/Generic/GenericFunctions";

export default function CreateProject() {
  const navigate = useNavigate();

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<AlertProps.Type>("success");
  const [inputValues, setInputValues] = useState<Fields>(emptyFields);

  async function handleSubmit(event: FormEvent) {
    handleFormSubmit({
      event: event,
      edit: false,
      validFields: validateFields(inputValues),
      relativeServerUrl: `/projects`,
      sendableData: getSendableData(inputValues),
      setAlertType: setAlertType,
      setAlertVisible: setAlertVisible,
      navigate: navigate,
      successRedirectLink: `/projects`,
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
      cancelRedirectLink={`/projects`}
    />
  );
}
