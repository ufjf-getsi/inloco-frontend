import { useNavigate, useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";

import { Point, Project } from "../../types";
import { handleFormSubmit } from "../../functions/controller";

import {
  emptyFields,
  Fields,
  formattedFields,
  getSendableData,
  notLoadedRecord,
  RecordForm,
  validateFields,
} from "../../components/Point/GenericPoint";
import { notLoadedRecord as notLoadedParent } from "../../components/Project/GenericProject";
import { AlertProps } from "@cloudscape-design/components";

export default function CreateEditPoint({ edit }: { edit: boolean }) {
  const navigate = useNavigate();

  const [point, setPoint] = useState<Point>(notLoadedRecord);
  const [project, setProject] = useState<Project>(notLoadedParent);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<AlertProps.Type>("success");
  const [inputValues, setInputValues] = useState<Fields>(emptyFields);

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
        `/points/${id}`;
    commonProjectId = point.project?.id ?? ``;
    function handleFetchResponse() {
      setInputValues(formattedFields(point));
    }
    useEffect(() => {
      handleFetchResponse();
    }, [point]);
  } else {
    const { projectId } = useParams();
    previousPageWebLink = fetchRecordServerLink = `/projects/${projectId}`;
    pushRecordServerLink = `/points`;
    commonProjectId = projectId ?? ``;
    sendableDataFunction = () =>
      getSendableData({
        inputValues,
        ...(projectId ? { parentId: projectId } : {}),
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
    projectId: commonProjectId,
    hasParent: true,
    fetchRecordLink: fetchRecordServerLink,
  };
  if (edit) {
    commonAttributes.edit = true;
    commonAttributes.setRecord = setPoint;
  } else {
    commonAttributes.edit = false;
    commonAttributes.setRecord = setProject;
  }
  return <RecordForm {...commonAttributes} />;
}
