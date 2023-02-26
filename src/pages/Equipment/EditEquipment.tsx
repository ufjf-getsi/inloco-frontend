import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";

import { AlertProps } from "@cloudscape-design/components";
import {
  emptyFields,
  Fields,
  RecordForm,
  validateFields,
} from "../../components/Equipment/GenericEquipment";

export function EditEquipment() {
  const navigate = useNavigate();
  function cancelLoadAndRedirectBackwards(error: any) {
    console.log(error);
    navigate(`/equipment/${id}`);
  }
  let { id } = useParams();

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<AlertProps.Type>("success");

  const [inputValues, setInputValues] = useState<Fields>(emptyFields);

  function fetchRecordData() {
    axios(`http://localhost:3333/equipment/${id}`)
      .then((response) => {
        setInputValues({
          name: response.data.name,
        });
      })
      .catch((error) => cancelLoadAndRedirectBackwards(error));
  }
  useEffect(() => {
    fetchRecordData();
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (validateFields(inputValues)) {
      // Send to the server
      try {
        await axios.patch(`http://localhost:3333/equipment/${id}`, {
          name: inputValues.name,
        });
        setAlertType("success");
        setAlertVisible(true);
        setTimeout(() => navigate(`/equipment/${id}`), 1000);
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
      edit={true}
      handleSubmit={handleSubmit}
      alertType={alertType}
      alertVisible={alertVisible}
      setAlertVisible={setAlertVisible}
      inputValues={inputValues}
      setInputValues={setInputValues}
      cancelRedirectLink={`/equipment/${id}`}
    />
  );
}
