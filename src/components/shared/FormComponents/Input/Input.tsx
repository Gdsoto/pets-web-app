import React from 'react';

// Libs
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { ReactElement } from 'react';
import { InputWrapper } from './style';

interface Props {
	label?: string;
	errors: object;
	nameValue: string;
	options?: [];
	control?: any;
	placeHolder?: string;
	disabled?: boolean;
	icon?: ReactElement;
	name?: string;
	type: string;
	id?: string;
	multiline?: boolean;
}

const Input = ({
	id,
	type,
	label,
	errors,
	control,
	nameValue,
	placeHolder,
	disabled,
	multiline = false,
}: Props) => {
	return (
		<InputWrapper>
			<Controller
				name={nameValue}
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						fullWidth
						color="warning"
						id={id}
						label={label}
						type={type}
						multiline={multiline}
						maxRows={4}
						disabled={disabled}
						placeholder={placeHolder}
						helperText={errors?.[nameValue]?.message}
						error={Boolean(errors?.[nameValue]?.message)}
					/>
				)}
			/>
		</InputWrapper>
	);
};

export default Input;
