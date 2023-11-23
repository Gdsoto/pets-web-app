/* eslint-disable react/prop-types */
import { MenuItem, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { SelectWrapper } from './style';

const CustomSelect = ({
	id,
	label,
	errors,
	setValue,
	control,
	nameValue,
	options,
}) => {
	return (
		<SelectWrapper>
			<Controller
				render={({ field }) => (
					<TextField
						{...field}
						select
						autoComplete="off"
						color="warning"
						fullWidth
						error={Boolean(errors?.[nameValue]?.message)}
						helperText={errors?.[nameValue]?.message}
						id="text-field-title"
						placeholder={'Seleccione'}
					>
						{options.map((option) => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</TextField>
				)}
				name={nameValue}
				control={control}
			/>
		</SelectWrapper>
	);
};

export default CustomSelect;
