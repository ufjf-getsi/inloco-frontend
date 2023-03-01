import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";

import { AlertProps, SelectProps } from "@cloudscape-design/components";
import {
  emptyFields,
  fetchAllEquipmentOptionsList,
  RecordForm,
  validateFields,
} from "../../components/Parameter/GenericParameter";
import { Fields } from "../../components/Parameter/GenericParameter";
import { OptionDefinition } from "@cloudscape-design/components/internal/components/option/interfaces";

export default function CreateParameter() {
  const navigate = useNavigate();

  const [inputValues, setInputValues] = useState<Fields>(emptyFields);
  const [allEquipmentOptionsList, setAllEquipmentOptionsList] =
    useState<SelectProps.Options>([]);

  useEffect(() => {
    fetchAllEquipmentOptionsList({
      navigate: navigate,
      setAllEquipmentOptionsList: setAllEquipmentOptionsList,
    });
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (validateFields(inputValues)) {
      // Send to the server
      try {
        await axios.post("http://localhost:3333/parameters", {
          name: inputValues.name,
          unit: inputValues.unit === "" ? "N/A" : inputValues.unit,
          dataType: inputValues.dataType.value,
          equipmentList: inputValues.equipmentList.map(
            (equipmentOption: OptionDefinition) => {
              return { id: equipmentOption.value };
            }
          ),
        });
        setAlertType("success");
        setAlertVisible(true);
        setTimeout(() => navigate("/parameters"), 1000);
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
      edit={false}
      handleSubmit={handleSubmit}
      alertType={alertType}
      alertVisible={alertVisible}
      setAlertVisible={setAlertVisible}
      inputValues={inputValues}
      setInputValues={setInputValues}
      cancelRedirectLink={`/projects`}
      allEquipmentOptionsList={allEquipmentOptionsList}
    />
  );
}
