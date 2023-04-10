import { useNavigate, useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { Measurement, PointWithProjectId } from "../../types";

import { AlertProps, SelectProps } from "@cloudscape-design/components";
import {
  emptyFields,
  fetchAllParameterOptionsList,
  Fields,
  getSendableData,
  notLoadedRecord,
  RecordForm,
  validateFields,
} from "../../components/Point/GenericPoint";
import { notLoadedRecord as notLoadedParent } from "../../components/Collection/GenericCollection";
import { handleFormSubmit } from "../../components/Generic/GenericFunctions";

export default function CreateEditCollection({ edit }: { edit: boolean }) {
  const navigate = useNavigate();

  const [point, setPoint] = useState<PointWithProjectId>({
    projectId: "",
    ...notLoadedRecord,
  });
  const [collection, setCollection] = useState(notLoadedParent);
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
        `/points/${id}`;
    commonCollectionId = point.collectionId ?? ``;
    commonProjectId = point.projectId ?? ``;
    function handleFetchResponse() {
      setInputValues({
        name: point.name,
        plannedCoordinates: point.plannedCoordinates ?? ``,
        parameters: point.measurements.map((measurement: Measurement) => {
          return {
            value: measurement.parameter.id,
            label: measurement.parameter.name,
          };
        }),
      });
    }
    useEffect(() => {
      handleFetchResponse();
    }, [point]);
  } else {
    const { collectionId } = useParams();
    previousPageWebLink =
      fetchRecordServerLink = `/collections/${collectionId}`;
    pushRecordServerLink = `/points`;
    commonCollectionId = collectionId ?? ``;
    commonProjectId = collection?.projectId ?? ``;
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
    commonAttributes.setRecord = setPoint;
  } else {
    commonAttributes.edit = false;
    commonAttributes.setRecord = setCollection;
  }
  return <RecordForm {...commonAttributes} />;
}
