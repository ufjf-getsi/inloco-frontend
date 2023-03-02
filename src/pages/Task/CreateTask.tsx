import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";

import { AlertProps } from "@cloudscape-design/components";
import { cancelLoadAndRedirectBackwards } from "../../components/Generic/GenericFunctions";
import {
  emptyFields,
  Fields,
  RecordForm,
  validateFields,
} from "../../components/Task/GenericTask";

export default function CreateTask() {
  const navigate = useNavigate();
  const { collectionId } = useParams();

  const [projectId, setProjectId] = useState("");

  function checkIfParentRecordExists() {
    axios(`http://localhost:3333/collections/${collectionId}`)
      .then((response) => {
        if (response.data) {
          setProjectId(response.data.projectId);
        } else {
          cancelLoadAndRedirectBackwards({
            navigate: navigate,
            error: "404: Not found",
            previousPageLink: `/projects`,
          });
        }
      })
      .catch((error) =>
        cancelLoadAndRedirectBackwards({
          navigate: navigate,
          error: error,
          previousPageLink: `${
            collectionId ? `/collections/${collectionId}` : "/projects"
          }`,
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
        await axios.post("http://localhost:3333/tasks", {
          collectionId: collectionId,
          title: inputValues.title,
          url: "url",
        });
        setAlertType("success");
        setAlertVisible(true);
        setTimeout(() => navigate(`/collections/${collectionId}`), 1000);
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
      collectionId={collectionId}
      projectId={projectId}
    />
  );
}
