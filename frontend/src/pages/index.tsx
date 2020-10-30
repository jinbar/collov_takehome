import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/core";
import { Form, Formik, useField } from "formik";
import React, { useState } from "react";
import GridLayout from "react-grid-layout";
import "../../node_modules/react-grid-layout/css/styles.css";
import "../../node_modules/react-resizable/css/styles.css";
import { GridTitles } from "../components/GridTitles";

import { WidthProvider, Responsive } from "react-grid-layout";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

const Index = () => {
  const [key, incrementKey] = useState(0);
  const [applicant, addApplicant] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box borderWidth="10px" p="auto">
      <Button onClick={onOpen}>Add Candidate</Button>
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
              onSubmit={(values, {resetForm}) => {
                addApplicant((oldArray) => [
                  ...oldArray,
                  { i: key.toString(), x: 0, y: 0, w: 1, h: 2, values: values },
                ]);
                incrementKey(key + 1);
                resetForm()
              }}
            >
              {({ values, handleChange }) => {
                return (
                  <Form>
                    <FormControl>
                      <FormLabel htmlFor="firstname">First Name</FormLabel>
                      <Input
                        type="firstname"
                        id="firstname"
                        value={values.firstname}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="lastname">Last Name</FormLabel>
                      <Input
                        type="lastname"
                        id="lastname"
                        value={values.lastname}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <Input
                        type="email"
                        id="email"
                        value={values.email}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="phone">Phone</FormLabel>
                      <Input
                        type="phone"
                        id="phone"
                        value={values.phone}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <Button
                      mt={2}
                      type="submit"
                      variantColor="blue"
                      mr={3}
                    >
                      Add
                    </Button>
                  </Form>
                );
              }}
            </Formik>
            <Button mt={2} variantColor="blue" mr={3} onClick={onClose}>
              Finish
            </Button>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
      <GridTitles />
      <ResponsiveReactGridLayout
        className="layout"
        layout={applicant}
        // cols={6}
        cols={{ lg: 6, md: 6, sm: 6, xs: 6, xxs: 6 }}
        rowHeight={100}
        width={1200}
        isResizable={false}
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
      </ResponsiveReactGridLayout>
    </Box>
  );
};

export default Index;
