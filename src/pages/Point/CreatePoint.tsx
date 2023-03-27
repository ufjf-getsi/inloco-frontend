import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { Parameter } from "../../types";

import { AlertProps, SelectProps } from "@cloudscape-design/components";
import {
  emptyFields,
  fetchAllParameterOptionsList,
  Fields,
  RecordForm,
  validateFields,
} from "../../components/Point/GenericPoint";
import { cancelLoadAndRedirectBackwards } from "../../components/Generic/GenericFunctions";
import { OptionDefinition } from "@cloudscape-design/components/internal/components/option/interfaces";

export default function CreatePoint() {
  const navigate = useNavigate();
  const { collectionId } = useParams();

  const [projectId, setProjectId] = useState("");
  const [allParameterOptionsList, setAllParameterOptionsList] =
    useState<SelectProps.Options>([]);

  function checkIfParentRecordExists() {
    axios(`${import.meta.env.VITE_SERVER_URL}/collections/${collectionId}`)
      .then((response) => {
        if (response.data) {
          setProjectId(response.data.projectId);
        } else {
          cancelLoadAndRedirectBackwards({
            navigate: navigate,
            error: "404: Not found",
            previousPageLink: `${import.meta.env.BASE_URL}projects`,
          });
        }
      })
      .catch((error) =>
        cancelLoadAndRedirectBackwards({
          navigate: navigate,
          error: error,
          previousPageLink: `${
            collectionId
              ? `/collections/${collectionId}`
              : `${import.meta.env.BASE_URL}projects`
          }`,
        })
      );
  }

  useEffect(() => {
    checkIfParentRecordExists();
    fetchAllParameterOptionsList({
      navigate: navigate,
      collectionId: collectionId ?? "",
      setAllParameterOptionsList: setAllParameterOptionsList,
    });
  }, []);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<AlertProps.Type>("success");

  const [inputValues, setInputValues] = useState<Fields>(emptyFields);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (validateFields(inputValues)) {
      // Send to the server
      try {
        await axios.post(`${import.meta.env.VITE_SERVER_URL}/points`, {
          collectionId: collectionId,
          name: inputValues.name,
          plannedCoordinates: inputValues.plannedCoordinates,
          measurements: inputValues.parameters.map(
            (selectedOption: OptionDefinition) => {
              return {
                isPending: true,
                parameterId: selectedOption.value,
              };
            }
          ),
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
      cancelRedirectLink={`${import.meta.env.BASE_URL}projects`}
      allParameterOptionsList={allParameterOptionsList}
      collectionId={collectionId}
      projectId={projectId}
    />
  );
}
