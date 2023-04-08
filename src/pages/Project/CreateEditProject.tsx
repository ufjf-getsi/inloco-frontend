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

interface CreateEditProjectProps {
  edit: boolean;
}

export default function EditProject({ edit }: CreateEditProjectProps) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [project, setProject] = useState<Project>(notLoadedRecord);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<AlertProps.Type>("success");
  const [inputValues, setInputValues] = useState<Fields>(emptyFields);

  let commonWebLink = `/projects`;
  let commonServerLink = `/projects`;

  if (edit) {
    commonWebLink = commonServerLink = `/projects/${id}`;
    function handleFetchResponse() {
      setInputValues({
        title: project.title,
        description: project.description,
      });
    }
    useEffect(() => {
      handleFetchResponse();
    }, [project]);
  }

  async function handleSubmit(event: FormEvent) {
    handleFormSubmit({
      event: event,
      edit: edit,
      validFields: validateFields(inputValues),
      relativeServerUrl: commonServerLink,
      sendableData: getSendableData(inputValues),
      setAlertType: setAlertType,
      setAlertVisible: setAlertVisible,
      navigate: navigate,
      successRedirectLink: commonWebLink,
    });
  }

  const commonAttributes: any = {
    handleSubmit: handleSubmit,
    alertType: alertType,
    alertVisible: alertVisible,
    setAlertVisible: setAlertVisible,
    inputValues: inputValues,
    setInputValues: setInputValues,
    cancelRedirectLink: commonWebLink,
  };
  if (edit) {
    commonAttributes.edit = true;
    commonAttributes.fetchRecordLink = commonServerLink;
    commonAttributes.setRecord = setProject;
  } else {
    commonAttributes.edit = false;
  }
  return <RecordForm {...commonAttributes} />;
}
