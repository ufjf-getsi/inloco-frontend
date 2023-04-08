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
import { handleFormSubmit } from "../../components/Generic/GenericFunctions";

interface CreateEditCollectionProps {
  edit: boolean;
}

export default function CreateEditCollection({
  edit,
}: CreateEditCollectionProps) {
  const navigate = useNavigate();

  const [collection, setCollection] = useState<Collection>(notLoadedRecord);
  const [project, setProject] = useState<Project>(notLoadedParent);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<AlertProps.Type>("success");
  const [inputValues, setInputValues] = useState<Fields>(emptyFields);

  let commonProjectId = ``;
  let commonWebLink = ``;
  let commonServerLink = ``;
  let sendableDataFunction = () => getSendableData({ inputValues });

  if (edit) {
    commonProjectId = collection.projectId;
    // Fetch the collection data based on the id in the url
    const { id } = useParams();
    commonWebLink = commonServerLink = `/collections/${id}`;
    function handleFetchResponse() {
      // setCommonProjectId(collection.projectId);
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
    // Set the fetch link based on the project id in the url
    const { projectId } = useParams();
    commonWebLink = `/projects/${projectId}`;
    commonServerLink = `/collections`;
    sendableDataFunction = () =>
      getSendableData({
        inputValues,
        ...(projectId ? { parentId: projectId } : {}),
      });
    commonProjectId = projectId ?? ``;
  }

  async function handleSubmit(event: FormEvent) {
    handleFormSubmit({
      event: event,
      edit: edit,
      validFields: validateFields(inputValues),
      relativeServerUrl: commonServerLink,
      sendableData: sendableDataFunction(),
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
    projectId: commonProjectId,
  };
  if (edit) {
    commonAttributes.edit = true;
    commonAttributes.setRecord = setCollection;
  } else {
    commonAttributes.edit = false;
    commonAttributes.setRecord = setProject;
  }
  commonAttributes.fetchRecordLink = commonServerLink;
  return <RecordForm {...commonAttributes} />;
}
