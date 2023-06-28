import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import { FormEvent } from "react";

interface cancelLoadAndRedirectBackwardsProps {
  navigate: NavigateFunction;
  error: any;
  previousPageLink?: string;
}
export function cancelLoadAndRedirectBackwards({
  navigate,
  error,
  previousPageLink,
}: cancelLoadAndRedirectBackwardsProps) {
  console.error(error);
  navigate(
    import.meta.env.VITE_BASE_URL_HASH.slice(0, -1) + previousPageLink ?? `/`
  );
}

export function handleErrorRedirect(
  navigate: NavigateFunction,
  error: any,
  redirectLink?: string
) {
  console.error(error);
  navigate(
    import.meta.env.BASE_URL.slice(0, -1) +
      (redirectLink ? redirectLink : "/404"),
    {
      replace: true,
    }
  );
}

export async function fetchRecordData(
  relativeUrl: string,
  navigate: NavigateFunction,
  handleFetchResponse: Function
) {
  try {
    await axios(import.meta.env.VITE_SERVER_URL + relativeUrl, {
      validateStatus: function (status) {
        return status === 200;
      },
    })
      .then(async (response) => await handleFetchResponse(response))
      .catch((error) => handleErrorRedirect(navigate, error));
  } catch (error) {
    console.log(error);
    handleErrorRedirect(navigate, error);
  }
}

export async function handleFormSubmit({
  event,
  edit,
  validFields,
  relativeServerUrl,
  sendableData,
  setAlertType,
  setAlertVisible,
  navigate,
  successRedirectLink,
}: {
  event: FormEvent;
  edit: boolean;
  validFields: boolean;
  relativeServerUrl: string;
  sendableData: any;
  setAlertType: Function;
  setAlertVisible: Function;
  navigate: NavigateFunction;
  successRedirectLink: string;
}) {
  event.preventDefault();
  if (validFields) {
    if (await decideOperation(edit)(relativeServerUrl, sendableData)) {
      setAlertType("success");
      setAlertVisible(true);
      setTimeout(() => navigate(successRedirectLink), 1000);
    } else {
      setAlertType("error");
    }
  } else {
    setAlertType("warning");
  }
  setAlertVisible(true);
}

function decideOperation(edit: boolean) {
  if (edit) {
    return updateRecordOnServer;
  } else {
    return createRecordOnServer;
  }
}

async function createRecordOnServer(
  relativeServerUrl: string,
  sendableData: any
) {
  try {
    await axios.post(
      import.meta.env.VITE_SERVER_URL + relativeServerUrl,
      sendableData
    );
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function updateRecordOnServer(
  relativeServerUrl: string,
  sendableData: any
) {
  try {
    await axios.patch(
      import.meta.env.VITE_SERVER_URL + relativeServerUrl,
      sendableData
    );
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
