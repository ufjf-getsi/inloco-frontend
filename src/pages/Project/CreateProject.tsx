import { FormEvent, useState } from "react";

import { BreadcrumbGroup, AlertProps } from "@cloudscape-design/components";
import {
  Fields,
  emptyFields,
  FormFields,
} from "../../components/Project/FormProject";
import GenericCreateAndEditPage from "../../components/Generic/GenericPages/GenericCreateAndEditPage";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function CreateProject() {
  const navigate = useNavigate();

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<AlertProps.Type>("success");

  const [inputValues, setInputValues] = useState<Fields>(emptyFields);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    // Validation
    if (!inputValues.title || !inputValues.description) {
      return;
    }

    // Send to the server
    try {
      await axios.post("http://localhost:3333/projects", {
        title: inputValues.title,
        description: inputValues.description,
      });
      setAlertType("success");
      setAlertVisible(true);
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      console.log(error);
      setAlertType("error");
      setAlertVisible(true);
    }
  }

  return (
    <GenericCreateAndEditPage
      edit={false}
      recordCategorySingular={`projeto`}
      recordCategoryPlural={`projetos`}
      recordGenderFeminine={false}
      description={`Um projeto é uma coleção que guarda registros de todas as coletas realizadas com um propósito em comum.`}
      navbarActiveLink={`/projects`}
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: "Projetos", href: "/projects" },
            { text: "Criar projeto", href: "#" },
          ]}
          expandAriaLabel="Mostrar caminho"
          ariaLabel="Breadcrumbs"
        />
      }
      cancelRedirectLink={`/projects`}
      handleSubmit={handleSubmit}
      alertVisible={alertVisible}
      setAlertVisible={setAlertVisible}
      alertType={alertType}
    >
      <FormFields inputValues={inputValues} setInputValues={setInputValues} />
    </GenericCreateAndEditPage>
  );
}
