import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";

import { AlertProps } from "@cloudscape-design/components";
import {
  emptyFields,
  RecordForm,
  validateFields,
} from "../../components/Parameter/GenericParameter";
import { Fields } from "../../components/Parameter/GenericParameter";

export function CreateParameter() {
  const navigate = useNavigate();

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<AlertProps.Type>("success");

  const [inputValues, setInputValues] = useState<Fields>(emptyFields);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (validateFields(inputValues)) {
      // Send to the server
      try {
        await axios.post("http://localhost:3333/parameters", {
          name: inputValues.name,
          unit: inputValues.unit === "" ? "N/A" : inputValues.unit,
          dataType: inputValues.dataType.value,
        });
        setAlertType("success");
        setAlertVisible(true);
        setTimeout(() => navigate("/parameters"), 1000);
      } catch (error) {
        console.log(error);
        setAlertType("error");
        setAlertVisible(true);
      }
    } else {
      // Fazer alert para dados inválidos
    }
  }

  return (
    <RecordForm
      edit={false}
      handleSubmit={handleSubmit}
      alertType={alertType}
      alertVisible={alertVisible}
      setAlertVisible={setAlertVisible}
      inputValues={inputValues}
      setInputValues={setInputValues}
      cancelRedirectLink={`/projects`}
    />
  );
}
