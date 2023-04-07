import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { Measurement } from "../../types";

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

export default function EditCollection() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [projectId, setProjectId] = useState("");
  const [collectionId, setCollectionId] = useState("");
  const [inputValues, setInputValues] = useState<Fields>(emptyFields);
  const [allParameterOptionsList, setAllParameterOptionsList] =
    useState<SelectProps.Options>([]);

  function fetchRecordData() {
    axios(`${import.meta.env.VITE_SERVER_URL}/points/${id}`)
      .then((response) => {
        setProjectId(response.data.projectId);
        setCollectionId(response.data.collectionId);
        setInputValues({
          name: response.data.name,
          plannedCoordinates: response.data.plannedCoordinates ?? "",
          parameters: response.data.measurements.map(
            (measurement: Measurement) => {
              return {
                value: measurement.parameter.id,
                label: measurement.parameter.name,
              };
            }
          ),
        });
      })
      .catch((error) =>
        cancelLoadAndRedirectBackwards({
          navigate: navigate,
          error: error,
          previousPageLink: `${collectionId
              ? `/collections/${collectionId}`
              : `/projects`
            }`,
        })
      );
  }
  useEffect(() => {
    fetchRecordData();
    fetchAllParameterOptionsList({
      navigate: navigate,
      collectionId: collectionId ?? "",
      setAllParameterOptionsList: setAllParameterOptionsList,
    });
  }, []);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<AlertProps.Type>("success");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (validateFields(inputValues)) {
      // Send to the server
      try {
        await axios.patch(`${import.meta.env.VITE_SERVER_URL}/points/${id}`, {
          name: inputValues.name,
          plannedCoordinates: inputValues.plannedCoordinates,
          measurements: inputValues.parameters.map(
            (selectedOption: OptionDefinition) => {
              return {
                parameterId: selectedOption.value,
              };
            }
          ),
        });
        setAlertType("success");
        setAlertVisible(true);
        setTimeout(() => navigate(`/points/${id}`), 1000);
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
      cancelRedirectLink={`/points/${id}`}
      allParameterOptionsList={allParameterOptionsList}
      collectionId={collectionId}
      projectId={projectId}
    />
  );
}
