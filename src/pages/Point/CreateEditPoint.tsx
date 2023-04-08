import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { Measurement } from "../../types";

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
import {
  cancelLoadAndRedirectBackwards,
  handleFormSubmit,
} from "../../components/Generic/GenericFunctions";
import { OptionDefinition } from "@cloudscape-design/components/internal/components/option/interfaces";

interface CreateEditCollectionProps {
  edit: boolean;
}

export default function CreateEditCollection({
  edit,
}: CreateEditCollectionProps) {
  const navigate = useNavigate();

  const [point, setPoint] = useState(notLoadedRecord);
  const [collection, setCollection] = useState(notLoadedParent);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<AlertProps.Type>("success");
  const [inputValues, setInputValues] = useState<Fields>(emptyFields);
  const [allParameterOptionsList, setAllParameterOptionsList] =
    useState<SelectProps.Options>([]);

  // let [commonCollectionId, setCommonCollectionId] = useState(``);
  // let [commonProjectId, setCommonProjectId] = useState(``);
  let commonCollectionId = ``;
  let commonProjectId = ``;
  let commonWebLink = ``;
  let fetchServerLink = ``;
  let pushServerLink = ``;
  let sendableDataFunction = () => getSendableData({ inputValues });

  if (edit) {
    // Fetch the collection data based on the id in the url
    const { id } = useParams();
    commonWebLink = fetchServerLink = pushServerLink = `/points/${id}`;
    commonCollectionId = point?.collectionId ?? ``;
    commonProjectId = point?.collection?.projectId ?? ``;
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
    commonWebLink = `/collections/${collectionId}`;
    fetchServerLink = `/collections/${collectionId}`;
    pushServerLink = `/collections`;
    commonCollectionId = collectionId ?? ``;
    commonProjectId = collection?.projectId ?? ``;
    sendableDataFunction = () =>
      getSendableData({
        inputValues,
        ...(collectionId ? { parentId: collectionId } : {}),
      });
    // function handleFetchResponse() {
    //   // setCommonCollectionId(collectionId ?? ``);
    //   // setCommonProjectId(collection?.projectId ?? ``);
    // }
    useEffect(() => {
      // handleFetchResponse();
      console.log(collection);
    }, [collection]);
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
      relativeServerUrl: pushServerLink,
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
    allParameterOptionsList: allParameterOptionsList,
    collectionId: commonCollectionId,
    projectId: commonProjectId,
  };
  if (edit) {
    commonAttributes.edit = true;
    commonAttributes.setRecord = setPoint;
  } else {
    commonAttributes.edit = false;
    commonAttributes.setRecord = setCollection;
  }
  commonAttributes.fetchRecordLink = fetchServerLink;
  return <RecordForm {...commonAttributes} />;
}
