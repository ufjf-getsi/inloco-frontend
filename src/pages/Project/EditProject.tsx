import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";

import { AlertProps } from "@cloudscape-design/components";
import {
  validateFields,
  emptyFields,
  Fields,
  RecordForm,
} from "../../components/Project/GenericProject";

export function EditProject() {
  const navigate = useNavigate();
  function cancelLoadAndRedirectBackwards(error: any) {
    console.log(error);
    navigate(`/projects/${id}`);
  }
  let { id } = useParams();

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<AlertProps.Type>("success");

  const [inputValues, setInputValues] = useState<Fields>(emptyFields);

  function fetchRecordData() {
    axios(`http://localhost:3333/projects/${id}`)
      .then((response) => {
        setInputValues({
          title: response.data.title,
          description: response.data.description,
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
        await axios.patch(`http://localhost:3333/projects/${id}`, {
          title: inputValues.title,
          description: inputValues.description,
        });
        setAlertType("success");
        setAlertVisible(true);
        setTimeout(() => navigate(`/projects/${id}`), 1000);
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
      cancelRedirectLink={`/projects/${id}`}
    />
  );
}
