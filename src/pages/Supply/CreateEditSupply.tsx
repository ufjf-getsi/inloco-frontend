import { useNavigate, useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";

import { Supply } from "../../types";
import { handleFormSubmit } from "../../functions/controller";

import {
  validateFields,
  emptyFields,
  Fields,
  RecordForm,
  notLoadedRecord,
  getSendableData,
  formattedFields,
} from "../../components/Supply/GenericSupply";
import { AlertProps } from "@cloudscape-design/components";

export default function CreateEditSupply({ edit }: { edit: boolean }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [supply, setSupply] = useState<Supply>(notLoadedRecord);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<AlertProps.Type>("success");
  const [inputValues, setInputValues] = useState<Fields>(emptyFields);

  let previousPageWebLink = `/supplies`;
  let pushRecordServerLink = `/supplies`;
  let fetchRecordServerLink = ``;

  if (edit) {
    previousPageWebLink =
      fetchRecordServerLink =
      pushRecordServerLink =
        `/supplies/${id}`;
    function handleFetchResponse() {
      setInputValues(formattedFields(supply));
    }
    useEffect(() => {
      handleFetchResponse();
    }, [supply]);
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
    commonAttributes.setRecord = setSupply;
  } else {
    commonAttributes.edit = false;
  }
  return <RecordForm {...commonAttributes} />;
}
