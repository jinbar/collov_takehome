import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from "@chakra-ui/core";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import GridLayout from "react-grid-layout";
import "../../node_modules/react-grid-layout/css/styles.css";
import "../../node_modules/react-resizable/css/styles.css";
import { GridTitles } from "../components/GridTitles";
import { InputField } from "../components/InputField";
import { NavBar } from "../components/Navbar";
import { useAddResumeMutation, useApplicantCreateMutation } from "../generated/graphql";
import { getFromLS } from "../utils/getFromLS";
import { saveToLS } from "../utils/saveToLS";

const originalLayout = getFromLS("layout");
const originalApplicants = getFromLS("applicant");

const Index = () => {
  const [applicant, addApplicant] = useState(originalApplicants);
  const [local_layout, setLayout] = useState(originalLayout);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [, addApp] = useApplicantCreateMutation();
  const [, addRes] = useAddResumeMutation();
  useEffect(() => {
    saveToLS("layout", local_layout);
    saveToLS("applicant", applicant);
  },[local_layout, applicant])

  return (
    <>
    <NavBar />
    <Box w={1200} maxWidth={1600} marginX="auto">
      <Button onClick={onOpen} variantColor="teal">
        Add Candidate
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Candidate</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{
                first_name: "",
                last_name: "",
                email: "",
                phone: "",
                comments: "",
              }}
              onSubmit={async (values, { resetForm }) => {
                let response = await addApp(values);
                let id = response.data.ApplicantCreate.applicant.applicant_id;
                setLayout((oldArray) => [
                  ...oldArray,
                  { i: id.toString(), x: 0, y: 0, w: 1, h: 2 },
                ]);
                addApplicant((oldArray) => [
                  ...oldArray,
                  { i: id.toString(), values: values },
                ])
                resetForm();                
              }}
            >
              <Form>
                <InputField name="first_name" label="First Name" />
                <InputField name="last_name" label="Last Name" />
                <InputField name="email" label="Email" type="email" />
                <InputField name="phone" label="Phone" />
                <InputField name="comments" label="Comments" />
                <Button mt={2} type="submit" variantColor="blue" mr={3}>
                  Add
                </Button>
              </Form>
            </Formik>
            <Button mt={2} variantColor="blue" mr={3} onClick={onClose}>
              Finish
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
      <GridTitles />
      <GridLayout
        className="layout"
        layout={local_layout}
        cols={6}
        rowHeight={100}
        width={1200}
        isResizable={false}
        onLayoutChange={(layout) => {
          setLayout(layout);
          addApplicant(applicant)
        }}
      >
        {applicant.map((item) => {
          return (
            <Box key={item.i} bg="tomato" p={2} overflowY="scroll" overflowX="hidden" wordBreak="break-word">
              <Box>{item.values.first_name + " " + item.values.last_name}</Box>
              <Box>{item.values.email}</Box>
              <Box>{item.values.phone}</Box>
              <Box>{item.values.comments}</Box>
            </Box>
          );
        })}
      </GridLayout>
    </Box>
    </>
  );
};

export default Index;
