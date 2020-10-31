import { Form, Formik } from "formik";
import { Button } from "@chakra-ui/core";
import { Container } from "../components/Container";
import { InputField } from "../components/InputField";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { NavBar } from "../components/Navbar";
interface loginProps {}

const Login: React.FC<loginProps> = ({}) => {
  const router = useRouter();
  // let browserLanguage = getBrowserLanguage();
  const [, login] = useLoginMutation();
  return (
    <>
      <NavBar />
      <Container>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          onSubmit={async (values, { setErrors }) => {
            if (values.username === "") {
              setErrors({ username: "Please enter your username" });
              return;
            }
            if (values.password === "") {
              setErrors({ password: "Please enter your password" });
              return;
            }
            const response = await login(values);
            if (response.data?.UserLogin.errors) {
              setErrors(toErrorMap(response.data.UserLogin.errors));
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
              <Button
                type="submit"
                isLoading={isSubmitting}
                variantColor="teal"
                mt={4}
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default Login;
