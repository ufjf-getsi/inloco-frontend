import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { Project } from "../../types";

import { AlertProps } from "@cloudscape-design/components";
import {
  validateFields,
  emptyFields,
  Fields,
  RecordForm,
  notLoadedRecord,
  getSendableData,
} from "../../components/Project/GenericProject";
import { handleFormSubmit } from "../../components/Generic/GenericFunctions";

export default function EditProject() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [project, setProject] = useState<Project>(notLoadedRecord);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<AlertProps.Type>("success");

  const [inputValues, setInputValues] = useState<Fields>(emptyFields);

  function handleFetchResponse() {
    setInputValues({
      title: project.title,
      description: project.description,
    });
  }
  useEffect(() => {
    handleFetchResponse();
  }, [project]);

  async function handleSubmit(event: FormEvent) {
    handleFormSubmit({
      event: event,
      edit: true,
      validFields: validateFields(inputValues),
      relativeServerUrl: `/projects/${id}`,
      sendableData: getSendableData(inputValues),
      setAlertType: setAlertType,
      setAlertVisible: setAlertVisible,
      navigate: navigate,
      successRedirectLink: `/projects`,
    });
  }

  return (
    <RecordForm
      edit={true}
      handleSubmit={handleSubmit}
      alertType={alertType}
      alertVisible={alertVisible}
      setAlertVisible={setAlertVisible}
      inputValues={inputValues}
      setInputValues={setInputValues}
      cancelRedirectLink={`/projects/${id}`}
      fetchRecordLink={`/projects/${id}`}
      setRecord={setProject}
    />
  );
}
