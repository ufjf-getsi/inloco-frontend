import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";

import { AlertProps } from "@cloudscape-design/components";
import {
  emptyFields,
  Fields,
  getSendableData,
  notLoadedRecord,
  RecordForm,
  validateFields,
} from "../../components/Equipment/GenericEquipment";
import { Equipment } from "../../types";
import { handleFormSubmit } from "../../generic/GenericFunctions";

export default function EditEquipment({ edit }: { edit: boolean }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [equipment, setEquipment] = useState<Equipment>(notLoadedRecord);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<AlertProps.Type>("success");
  const [inputValues, setInputValues] = useState<Fields>(emptyFields);

  let previousPageWebLink = `/equipment`;
  let pushRecordServerLink = `/equipment`;
  let fetchRecordServerLink = ``;

  if (edit) {
    previousPageWebLink =
      fetchRecordServerLink =
      pushRecordServerLink =
        `/equipment/${id}`;
    function handleFetchResponse() {
      setInputValues({
        name: equipment.name,
      });
    }
    useEffect(() => {
      handleFetchResponse();
    }, [equipment]);
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
    commonAttributes.setRecord = setEquipment;
  } else {
    commonAttributes.edit = false;
  }
  return <RecordForm {...commonAttributes} />;
}
