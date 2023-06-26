import { useNavigate, useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { Equipment, Parameter } from "../../types";

import { AlertProps, SelectProps } from "@cloudscape-design/components";
import {
  Fields,
  emptyFields,
  validateFields,
  RecordForm,
  fetchAllEquipmentOptionsList,
  notLoadedRecord,
  getSendableData,
  formattedFields,
} from "../../components/Parameter/GenericParameter";
import { handleFormSubmit } from "../../generic/GenericFunctions";

export default function CreateEditParameter({ edit }: { edit: boolean }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [parameter, setParameter] = useState<Parameter>(notLoadedRecord);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<AlertProps.Type>("success");
  const [inputValues, setInputValues] = useState<Fields>(emptyFields);
  const [allEquipmentOptionsList, setAllEquipmentOptionsList] =
    useState<SelectProps.Options>([]);

  let previousPageWebLink = `/parameters`;
  let pushRecordServerLink = `/parameters`;
  let fetchRecordServerLink = ``;

  if (edit) {
    previousPageWebLink =
      fetchRecordServerLink =
      pushRecordServerLink =
        `/parameters/${id}`;
    function handleFetchResponse() {
      setInputValues(formattedFields(parameter));
    }
    useEffect(() => {
      handleFetchResponse();
    }, [parameter]);
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

  useEffect(() => {
    fetchAllEquipmentOptionsList({
      navigate: navigate,
      setAllEquipmentOptionsList: setAllEquipmentOptionsList,
    });
  }, []);

  const commonAttributes: any = {
    handleSubmit: handleSubmit,
    alertType: alertType,
    alertVisible: alertVisible,
    setAlertVisible: setAlertVisible,
    inputValues: inputValues,
    setInputValues: setInputValues,
    cancelRedirectLink: previousPageWebLink,
    allEquipmentOptionsList: allEquipmentOptionsList,
    hasParent: false,
  };
  if (edit) {
    commonAttributes.edit = true;
    commonAttributes.fetchRecordLink = fetchRecordServerLink;
    commonAttributes.setRecord = setParameter;
  } else {
    commonAttributes.edit = false;
  }
  return <RecordForm {...commonAttributes} />;
}
