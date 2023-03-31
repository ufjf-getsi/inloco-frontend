import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";

import { AlertProps } from "@cloudscape-design/components";
import {
  emptyFields,
  Fields,
  RecordForm,
  validateFields,
} from "../../components/Task/GenericTask";
import { cancelLoadAndRedirectBackwards } from "../../components/Generic/GenericFunctions";

export default function EditTask() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [projectId, setProjectId] = useState("");
  const [collectionId, setCollectionId] = useState("");
  const [inputValues, setInputValues] = useState<Fields>(emptyFields);

  function fetchRecordData() {
    axios(`${import.meta.env.VITE_SERVER_URL}/tasks/${id}`)
      .then((response) => {
        setProjectId(response.data.projectId);
        setCollectionId(response.data.collectionId);
        setInputValues({
          title: response.data.title,
        });
      })
      .catch((error) =>
        cancelLoadAndRedirectBackwards({
          navigate: navigate,
          error: error,
          previousPageLink: `${
            collectionId
              ? `/collections/${collectionId}`
              : `${import.meta.env.VITE_BASE_URL_HASH}projects`
          }`,
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
        await axios.patch(`${import.meta.env.VITE_SERVER_URL}/tasks/${id}`, {
          title: inputValues.title,
        });
        setAlertType("success");
        setAlertVisible(true);
        setTimeout(() => navigate(`/tasks/${id}`), 1000);
      } catch (error) {
        console.log(error);
        setAlertType("error");
        setAlertVisible(true);
      }
    } else {
      // Fazer alert para dados inválidos
    }
  }

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<AlertProps.Type>("success");

  return (
    <RecordForm
      edit={true}
      handleSubmit={handleSubmit}
      alertType={alertType}
      alertVisible={alertVisible}
      setAlertVisible={setAlertVisible}
      inputValues={inputValues}
      setInputValues={setInputValues}
      cancelRedirectLink={`/tasks/${id}`}
      collectionId={collectionId}
      projectId={projectId}
    />
  );
}
