import { useNavigate, useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";

import { Project } from "../../types";
import { handleFormSubmit } from "../../functions/controller";

import {
  validateFields,
  emptyFields,
  Fields,
  RecordForm,
  notLoadedRecord,
  getSendableData,
  formattedFields,
} from "../../components/Project/GenericProject";
import { AlertProps } from "@cloudscape-design/components";

export default function CreateEditProject({ edit }: { edit: boolean }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [project, setProject] = useState<Project>(notLoadedRecord);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<AlertProps.Type>("success");
  const [inputValues, setInputValues] = useState<Fields>(emptyFields);

  let previousPageWebLink = `/projects`;
  let pushRecordServerLink = `/projects`;
  let fetchRecordServerLink = ``;

  if (edit) {
    previousPageWebLink =
      fetchRecordServerLink =
      pushRecordServerLink =
        `/projects/${id}`;
    function handleFetchResponse() {
      setInputValues(formattedFields(project));
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
      relativeServerUrl: pushRecordServerLink,
      sendableData: getSendableData(inputValues),
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
    hasParent: false,
  };
  if (edit) {
    commonAttributes.edit = true;
    commonAttributes.fetchRecordLink = fetchRecordServerLink;
    commonAttributes.setRecord = setProject;
  } else {
    commonAttributes.edit = false;
  }
  return <RecordForm {...commonAttributes} />;
}
