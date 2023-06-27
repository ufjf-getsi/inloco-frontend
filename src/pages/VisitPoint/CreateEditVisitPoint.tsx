import { useNavigate, useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";

import { Collection, VisitPoint } from "../../types";
import { handleFormSubmit } from "../../functions/controller";

import {
  emptyFields,
  fetchAllParameterOptionsList,
  Fields,
  formattedFields,
  getSendableData,
  notLoadedRecord,
  RecordForm,
  validateFields,
} from "../../components/VisitPoint/GenericVisitPoint";
import { notLoadedRecord as notLoadedParent } from "../../components/Collection/GenericCollection";
import { AlertProps, SelectProps } from "@cloudscape-design/components";

export default function CreateEditVisitPoint({ edit }: { edit: boolean }) {
  const navigate = useNavigate();

  const [visitPoint, setVisitPoint] = useState<VisitPoint>(notLoadedRecord);
  const [collection, setCollection] = useState<Collection>(notLoadedParent);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<AlertProps.Type>("success");
  const [inputValues, setInputValues] = useState<Fields>(emptyFields);
  const [allParameterOptionsList, setAllParameterOptionsList] =
    useState<SelectProps.Options>([]);

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
        `/visit-point/${id}`;
    commonCollectionId = visitPoint.collection?.id ?? ``;
    commonProjectId = visitPoint.collection?.project?.id ?? ``;
    function handleFetchResponse() {
      setInputValues(formattedFields(visitPoint));
    }
    useEffect(() => {
      handleFetchResponse();
    }, [visitPoint]);
  } else {
    const { collectionId } = useParams();
    previousPageWebLink =
      fetchRecordServerLink = `/collections/${collectionId}`;
    pushRecordServerLink = `/visit-point`;
    commonCollectionId = collection.id;
    commonProjectId = collection.project?.id ?? ``;
    sendableDataFunction = () =>
      getSendableData({
        inputValues,
        ...(collectionId ? { parentId: collectionId } : {}),
      });
  }

  useEffect(() => {
    fetchAllParameterOptionsList({
      navigate: navigate,
      setAllParameterOptionsList: setAllParameterOptionsList,
    });
  }, []);

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
    allParameterOptionsList: allParameterOptionsList,
    collectionId: commonCollectionId,
    projectId: commonProjectId,
    hasParent: true,
    fetchRecordLink: fetchRecordServerLink,
  };
  if (edit) {
    commonAttributes.edit = true;
    commonAttributes.setRecord = setVisitPoint;
  } else {
    commonAttributes.edit = false;
    commonAttributes.setRecord = setCollection;
  }
  return <RecordForm {...commonAttributes} />;
}
