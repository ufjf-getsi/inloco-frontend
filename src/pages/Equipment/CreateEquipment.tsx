import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";

import { AlertProps } from "@cloudscape-design/components";
import {
  Fields,
  emptyFields,
  validateFields,
  RecordForm,
} from "../../components/Equipment/GenericEquipment";

export default function CreateEquipment() {
  const navigate = useNavigate();

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<AlertProps.Type>("success");

  const [inputValues, setInputValues] = useState<Fields>(emptyFields);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (validateFields(inputValues)) {
      // Send to the server
      try {
        await axios.post(`${import.meta.env.VITE_SERVER_URL}/equipment`, {
          name: inputValues.name,
        });
        setAlertType("success");
        setAlertVisible(true);
        setTimeout(() => navigate(`/equipment`), 1000);
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
      cancelRedirectLink={`/equipment`}
    />
  );
}
