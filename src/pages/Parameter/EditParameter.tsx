import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";

import { AlertProps } from "@cloudscape-design/components";
import {
  Fields,
  emptyFields,
  validateFields,
  RecordForm,
  formatDataType,
} from "../../components/Parameter/GenericParameter";

export function EditParameter() {
  const navigate = useNavigate();
  function cancelLoadAndRedirectBackwards(error: any) {
    console.log(error);
    navigate(`/parameters/${id}`);
  }
  let { id } = useParams();

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<AlertProps.Type>("success");

  const [inputValues, setInputValues] = useState<Fields>(emptyFields);

  function fetchRecordData() {
    axios(`http://localhost:3333/parameters/${id}`)
      .then((response) => {
        setInputValues({
          name: response.data.name,
          unit: response.data.unit,
          dataType: {
            label: formatDataType(response.data.dataType),
            value: response.data.dataType,
          },
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
        await axios.patch(`http://localhost:3333/parameters/${id}`, {
          name: inputValues.name,
          unit: inputValues.unit === "" ? "N/A" : inputValues.unit,
          dataType: inputValues.dataType.value,
        });
        setAlertType("success");
        setAlertVisible(true);
        setTimeout(() => navigate(`/parameters/${id}`), 1000);
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
      cancelRedirectLink={`/parameters/${id}`}
    />
  );
}
