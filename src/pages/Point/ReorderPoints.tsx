import { useNavigate, useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { Measurement, PointWithProjectId } from "../../types";

import { AlertProps, SelectProps } from "@cloudscape-design/components";
import {
  breadcrumpGroupItems,
  emptyFields,
  fetchAllParameterOptionsList,
  Fields,
  getSendableData,
  notLoadedRecord,
  RecordForm,
  validateFields,
} from "../../components/Point/GenericPoint";
import { notLoadedRecord as notLoadedParent } from "../../components/Collection/GenericCollection";
import { handleFormSubmit } from "../../generic/GenericFunctions";
import GenericReorderPage, {
  GenericReorderPageProps,
} from "../../generic/GenericPages/GenericReorderPage";
import GenericBreadcrumbGroup from "../../generic/GerenicBreadcrumbGroup";

export default function ReorderPoints() {
  const navigate = useNavigate();

  const [collection, setCollection] = useState(notLoadedParent);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<AlertProps.Type>("success");
  // const [inputValues, setInputValues] = useState<Fields>(emptyFields);

  let commonCollectionId = ``;
  let commonProjectId = ``;
  let previousPageWebLink = ``;
  let fetchRecordServerLink = ``;
  let pushRecordServerLink = ``;
  // let sendableDataFunction = () => getSendableData({ inputValues });

  const { collectionId } = useParams();
  previousPageWebLink =
    fetchRecordServerLink =
    pushRecordServerLink =
      `/collections/${collectionId}`;
  commonCollectionId = collection.id ?? ``;
  commonProjectId = collection.projectId ?? ``;
  function handleFetchResponse() {
    // setInputValues({
    //   name: point.name,
    //   plannedCoordinates: point.plannedCoordinates ?? ``,
    //   parameters: point.measurements.map((measurement: Measurement) => {
    //     return {
    //       value: measurement.parameter.id,
    //       label: measurement.parameter.name,
    //     };
    //   }),
    // });
  }
  useEffect(() => {
    handleFetchResponse();
  }, [collection]);

  // sendableDataFunction = () =>
  //   getSendableData({
  //     inputValues,
  //     ...(collectionId ? { parentId: collectionId } : {}),
  //   });

  async function handleSubmit(event: FormEvent) {
    // handleFormSubmit({
    //   event: event,
    //   edit: edit,
    //   validFields: validateFields(inputValues),
    //   relativeServerUrl: pushRecordServerLink,
    //   sendableData: sendableDataFunction(),
    //   setAlertType: setAlertType,
    //   setAlertVisible: setAlertVisible,
    //   navigate: navigate,
    //   successRedirectLink: previousPageWebLink,
    // });
  }

  const commonAttributes: GenericReorderPageProps = {
    description: `Reordenar pontos`,
    navbarActiveLink: `/projects`,
    breadcrumbs: (
      <GenericBreadcrumbGroup
        items={breadcrumpGroupItems({
          projectId: commonProjectId,
          collectionId: commonCollectionId,
          pageType: "reorder",
        })}
      />
    ),
    recordGenderFeminine: false,
    recordCategorySingular: `ponto`,
    recordCategoryPlural: `pontos`,
    handleSubmit: handleSubmit,
    alertType: alertType,
    alertVisible: alertVisible,
    setAlertVisible: setAlertVisible,
    cancelRedirectLink: previousPageWebLink,
    fetchParentLink: fetchRecordServerLink,
    setParent: setCollection,
  };

  return <GenericReorderPage {...commonAttributes} />;
}
