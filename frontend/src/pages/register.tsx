import { Button } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { Container } from "../components/Container";
import { InputField } from "../components/InputField";
import { NavBar } from "../components/Navbar";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  return (
    <>
      <NavBar />
      <Container>
        <Formik
          initialValues={{
            username: "",
            password: "",
            verifyPassword: ""
          }}
          onSubmit={async (values, { setErrors }) => {
            if (values.password !== values.verifyPassword) {
              setErrors({ verifyPassword: "Passwords don't match" });
              return;
            }
            const response = await register(values);
            console.log(response)
            if (response.data?.UserRegister.errors) {
              setErrors(toErrorMap(response.data.UserRegister.errors));
              return;
            } else {
              router.push("/");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                name="username"
                placeholder="username"
                label="Username"
              />
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
              <InputField
                name="verifyPassword"
                placeholder="verify password"
                label="Verify Password"
                type="password"
              />
              <Button
                type="submit"
                isLoading={isSubmitting}
                variantColor="teal"
                mt={4}
              >
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default Register;
