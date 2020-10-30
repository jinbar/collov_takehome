import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/core";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  size,
  ...props
}) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl>
      <FormControl isInvalid={!!error}>
        <FormLabel htmlFor={field.name} mt={4}>
          {label}
        </FormLabel>
        <Input {...field} {...props} id={field.name} />
        {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
      </FormControl>
    </FormControl>
  );
};
