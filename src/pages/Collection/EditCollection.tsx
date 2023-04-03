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

export default function EditCollection() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [projectId, setProjectId] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<AlertProps.Type>("success");

  const [inputValues, setInputValues] = useState<Fields>(emptyFields);

  function fetchRecordData() {
    axios(`${import.meta.env.VITE_SERVER_URL}/collections/${id}`)
      .then((response) => {
        setProjectId(response.data.projectId);
        setInputValues({
          title: response.data.title,
          startDate: response.data.startDate,
          endDate: response.data.endDate,
        });
      })
      .catch((error) =>
        cancelLoadAndRedirectBackwards({
          navigate: navigate,
          error: error,
          previousPageLink: `/projects${projectId ? `/${projectId}` : ""}`,
        })
      );
  }
  useEffect(() => {
    fetchRecordData();
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (validateFields(inputValues)) {
      // Send to the server
      try {
        await axios.patch(
          `${import.meta.env.VITE_SERVER_URL}/collections/${id}`,
          {
            title: inputValues.title,
            startDate: inputValues.startDate,
            endDate: inputValues.startDate,
          }
        );
        setAlertType("success");
        setAlertVisible(true);
        setTimeout(() => navigate(`/collections/${id}`), 1000);
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
      projectId={projectId}
      cancelRedirectLink={`/collections/${id}`}
    />
  );
}
