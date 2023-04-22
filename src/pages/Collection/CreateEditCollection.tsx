import { useNavigate, useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { Collection, Project } from "../../types";

import { AlertProps } from "@cloudscape-design/components";
import {
  emptyFields,
  Fields,
  getSendableData,
  notLoadedRecord,
  RecordForm,
  validateFields,
} from "../../components/Collection/GenericCollection";
import { notLoadedRecord as notLoadedParent } from "../../components/Project/GenericProject";
import { handleFormSubmit } from "../../generic/GenericFunctions";

export default function CreateEditCollection({ edit }: { edit: boolean }) {
  const navigate = useNavigate();

  const [collection, setCollection] = useState<Collection>(notLoadedRecord);
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
    commonProjectId = collection.projectId;
    previousPageWebLink =
      pushRecordServerLink =
      fetchRecordServerLink =
        `/collections/${id}`;
    function handleFetchResponse() {
      setInputValues({
        title: collection.title,
        startDate: collection.startDate,
        endDate: collection.endDate,
      });
    }
    useEffect(() => {
      handleFetchResponse();
    }, [collection]);
  } else {
    const { projectId } = useParams();
    previousPageWebLink = fetchRecordServerLink = `/projects/${projectId}`;
    pushRecordServerLink = `/collections`;
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
    commonAttributes.setRecord = setCollection;
  } else {
    commonAttributes.edit = false;
    commonAttributes.setRecord = setProject;
  }
  return <RecordForm {...commonAttributes} />;
}
