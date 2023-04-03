import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";

import { AlertProps } from "@cloudscape-design/components";
import {
  emptyFields,
  Fields,
  RecordForm,
  validateFields,
} from "../../components/Collection/GenericCollection";
import { cancelLoadAndRedirectBackwards } from "../../components/Generic/GenericFunctions";

export default function CreateCollection() {
  const navigate = useNavigate();
  const { projectId } = useParams();

  function checkIfParentRecordExists() {
    axios(`${import.meta.env.VITE_SERVER_URL}/projects/${projectId}`)
      .then((response) => {
        if (!response.data) {
          cancelLoadAndRedirectBackwards({
            navigate: navigate,
            error: "404: Not found",
            previousPageLink: `${import.meta.env.VITE_BASE_URL_HASH}projects`,
          });
        }
      })
      .catch((error) =>
        cancelLoadAndRedirectBackwards({
          navigate: navigate,
          error: error,
          previousPageLink: `${import.meta.env.VITE_BASE_URL_HASH}projects`,
        })
      );
  }
  useEffect(() => {
    checkIfParentRecordExists();
  }, []);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<AlertProps.Type>("success");

  const [inputValues, setInputValues] = useState<Fields>(emptyFields);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (validateFields(inputValues)) {
      // Send to the server
      try {
        await axios.post(`${import.meta.env.VITE_SERVER_URL}/collections`, {
          title: inputValues.title,
          projectId: projectId,
          startDate: inputValues.startDate,
          endDate: inputValues.endDate,
        });
        setAlertType("success");
        setAlertVisible(true);
        setTimeout(() => navigate(`/projects/${projectId}`), 1000);
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
      cancelRedirectLink={`${import.meta.env.VITE_BASE_URL_HASH}projects`}
      projectId={projectId}
    />
  );
}
