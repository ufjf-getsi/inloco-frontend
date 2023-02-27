import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { Parameter } from "../../types";

import { AlertProps, SelectProps } from "@cloudscape-design/components";
import {
  emptyFields,
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
    axios
      .get<Parameter[]>("http://localhost:3333/parameters")
      .then((response) => {
        setAllParameterOptionsList(
          response.data.map((item) => ({ value: item.id, label: item.name }))
        );
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
  }, []);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<AlertProps.Type>("success");

  const [inputValues, setInputValues] = useState<Fields>(emptyFields);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (validateFields(inputValues)) {
      // Send to the server
      try {
        await axios.post("http://localhost:3333/points", {
          collectionId: collectionId,
          name: inputValues.name,
          coordinates: inputValues.coordinates,
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
      cancelRedirectLink={`/projects`}
      allParameterOptionsList={allParameterOptionsList}
      collectionId={collectionId}
      projectId={projectId}
    />
  );
}
