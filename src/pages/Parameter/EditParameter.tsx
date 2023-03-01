import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { Equipment } from "../../types";

import { AlertProps, SelectProps } from "@cloudscape-design/components";
import {
  Fields,
  emptyFields,
  validateFields,
  RecordForm,
  formatDataType,
  fetchAllEquipmentOptionsList,
} from "../../components/Parameter/GenericParameter";
import { OptionDefinition } from "@cloudscape-design/components/internal/components/option/interfaces";

export default function EditParameter() {
  const navigate = useNavigate();
  function cancelLoadAndRedirectBackwards(error: any) {
    console.log(error);
    navigate(`/parameters/${id}`);
  }
  const { id } = useParams();

  const [inputValues, setInputValues] = useState<Fields>(emptyFields);
  const [allEquipmentOptionsList, setAllEquipmentOptionsList] =
    useState<SelectProps.Options>([]);

  function fetchRecordData() {
    axios(`http://localhost:3333/parameters/${id}`)
      .then((response) => {
        setInputValues({
          name: response.data.name,
          unit: response.data.unit,
          dataType: {
            label: formatDataType(response.data.dataType),
            value: response.data.dataType,
          },
          equipmentList: response.data.equipmentList.map(
            (equipment: Equipment) => {
              return {
                value: equipment.id,
                label: equipment.name,
              };
            }
          ),
        });
      })
      .catch((error) => cancelLoadAndRedirectBackwards(error));
  }
  useEffect(() => {
    fetchRecordData();
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
        await axios.patch(`http://localhost:3333/parameters/${id}`, {
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
        setTimeout(() => navigate(`/parameters/${id}`), 1000);
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
      cancelRedirectLink={`/parameters/${id}`}
      allEquipmentOptionsList={allEquipmentOptionsList}
    />
  );
}
