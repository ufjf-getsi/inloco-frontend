import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { CommonTask, TaskType } from "../../types";

import { AlertProps } from "@cloudscape-design/components";
import { handleErrorRedirect } from "../../components/Generic/GenericFunctions";
import {
  emptyFields,
  Fields,
  RecordForm,
  validateFields,
} from "../../components/Task/GenericTask";

export default function CreateTask() {
  const navigate = useNavigate();
  const paramsCollectionId = useParams().collectionId;

  const [projectId, setProjectId] = useState("");
  const [collectionId, setCollectionId] = useState("");

  function checkIfParentRecordExists() {
    axios
      .get(
        `${import.meta.env.VITE_SERVER_URL}/collections/${paramsCollectionId}`,
        {
          validateStatus: function (status) {
            return status === 200;
          },
        }
      )
      .then((response) => {
        if (response.data) {
          console.log(paramsCollectionId);
          setProjectId(response.data.projectId);
          setCollectionId(paramsCollectionId ?? "");
        }
      })
      .catch((error) => {
        handleErrorRedirect(navigate, error);
      });
  }
  useEffect(() => {
    checkIfParentRecordExists();
  }, []);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<AlertProps.Type>("success");

  const [inputValues, setInputValues] = useState<Fields>(emptyFields);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const sendableData: CommonTask = {
      type: TaskType.commonTask,
      id: "",
      isPending: inputValues.status.value !== "completed",
      collectionId: collectionId,
      title: inputValues.title,
    };

    if (validateFields(inputValues)) {
      // Send to the server
      try {
        await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/tasks`,
          sendableData
        );
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
      cancelRedirectLink={`/collections/${collectionId}`}
      collectionId={collectionId}
      projectId={projectId}
    />
  );
}
