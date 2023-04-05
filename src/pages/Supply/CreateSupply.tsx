import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";

import { AlertProps } from "@cloudscape-design/components";
import {
  Fields,
  emptyFields,
  validateFields,
  RecordForm,
} from "../../components/Supply/GenericSupply";

export default function CreateSupply() {
  const navigate = useNavigate();

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<AlertProps.Type>("success");

  const [inputValues, setInputValues] = useState<Fields>(emptyFields);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (validateFields(inputValues)) {
      // Send to the server
      try {
        await axios.post(`${import.meta.env.VITE_SERVER_URL}/supplies`, {
          name: inputValues.name,
          quantity: inputValues.quantity,
        });
        setAlertType("success");
        setAlertVisible(true);
        setTimeout(() => navigate(`/supplies`), 1000);
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
      cancelRedirectLink={`${import.meta.env.VITE_BASE_URL_HASH}supplies`}
    />
  );
}
