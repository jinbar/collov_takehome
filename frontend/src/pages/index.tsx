import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/core";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import GridLayout from "react-grid-layout";
import "../../node_modules/react-grid-layout/css/styles.css";
import "../../node_modules/react-resizable/css/styles.css";
import { GridTitles } from "../components/GridTitles";
import { InputField } from "../components/InputField";
import { getFromLS } from "../utils/getFromLS";
import { saveToLS } from "../utils/saveToLS";

const originalLayout = getFromLS("layout");
const Index = () => {
  const [key, incrementKey] = useState(0);
  const [applicant, addApplicant] = useState([]);
  const [local_layout, setLayout] = useState(originalLayout);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // TODO: save to localstorage if possible. can also do it via database

  return (
    <Box>
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
                firstname: "",
                lastname: "",
                email: "",
                phone: "",
              }}
              onSubmit={(values, { resetForm }) => {
                addApplicant((oldArray) => [
                  ...oldArray,
                  { i: key.toString(), values: values },
                ]);
                setLayout((oldArray) => [
                  ...oldArray,
                  { i: key.toString(), x: 0, y: 0, w: 1, h: 2 },
                ]);
                incrementKey(key + 1);
                resetForm();
              }}
            >
              <Form>
                <InputField name="firstname" label="First Name" />
                <InputField name="lastname" label="Last Name" />
                <InputField name="email" label="Email" type="email" />
                <InputField name="phone" label="Phone" />
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
          saveToLS("layout", local_layout);
          setLayout(layout);
        }}
      >
        {applicant.map((item) => {
          return (
            <Box key={item.i} bg="tomato" p={2}>
              <Box>{item.values.firstname + " " + item.values.lastname}</Box>
              <Box>{item.values.email}</Box>
              <Box>{item.values.phone}</Box>
            </Box>
          );
        })}
      </GridLayout>
    </Box>
  );
};

export default Index;
