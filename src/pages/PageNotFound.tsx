import {
  AppLayout,
  Box,
  Container,
  ContentLayout,
} from "@cloudscape-design/components";
import Navbar from "../components/Navbar";

export default function PageNotFound() {
  return (
    <AppLayout
      navigation={<Navbar />}
      toolsHide
      contentType="default"
      content={
        <ContentLayout className="py-2 align-items-center">
          <Box fontWeight="light" textAlign="center">
            <span className="text-9xl text-center justify-self-center flex flex-col">
              404
              <span className="text-2xl font-medium mt-2">
                Esta página não foi encontrada.
              </span>
            </span>
          </Box>
        </ContentLayout>
      }
      headerSelector="#header"
    />
  );
}
