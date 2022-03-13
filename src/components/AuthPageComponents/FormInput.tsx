import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import React, { FC } from 'react';

interface FormInputProps {
  inputLabelText: string;
  propsText: string;
  placeholder: string;
  type?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: FC<FormInputProps> = ({ inputLabelText, propsText, placeholder, type, onChange }) => {
  return (
    <FormControl>
      <FormLabel htmlFor={propsText}>{inputLabelText}</FormLabel>
      <Input id={propsText} name={propsText} type={type} placeholder={placeholder} onChange={onChange} required />
    </FormControl>
  );
};

export default FormInput;
