/* eslint-disable react/prop-types */

// Libs
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';

import { InputWrapper } from './style';

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
}) => {
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
