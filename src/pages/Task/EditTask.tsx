import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { Task, TaskType } from "../../types";

import { AlertProps } from "@cloudscape-design/components";
import {
  emptyFields,
  Fields,
  formatStatus,
  formatTitle,
  notLoadedRecord,
  RecordForm,
  validateFields,
} from "../../components/Task/GenericTask";
import { handleErrorRedirect } from "../../components/Generic/GenericFunctions";

export default function EditTask() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [task, setTask] = useState<Task>(notLoadedRecord);
  const [inputValues, setInputValues] = useState<Fields>(emptyFields);

  function handleFetchResponse() {
    if (task.type === TaskType.commonTask) {
      setInputValues({
        title: formatTitle(task),
        status: {
          label: formatStatus(task.isPending ? "pending" : "completed"),
          value: task.isPending ? "pending" : "completed",
        },
      });
    } else {
      handleErrorRedirect(navigate, new Error("Task is not of editable type"));
    }
  }
  useEffect(() => {
    handleFetchResponse();
  }, [task]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (validateFields(inputValues)) {
      // Send to the server
      try {
        await axios.patch(`${import.meta.env.VITE_SERVER_URL}/tasks/${id}`, {
          type: TaskType.commonTask,
          title: inputValues.title,
          isPending: inputValues.status.value !== "completed",
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
      fetchRecordLink={`/tasks/${id}`}
      setRecord={setTask}
      collectionId={task.collectionId}
      projectId={task.projectId}
    />
  );
}
