import { MenuItem, TextField } from '@mui/material';
import { Controller, UseFormSetValue } from 'react-hook-form';
import { SelectWrapper } from './style';

interface Props {
	label?: string;
	errors: object;
	nameValue: string;
	options?: {
		value: string;
		label: string;
	}[];
	control?: any;
	placeHolder?: string;
	disabled?: boolean;
	name?: string;
	id?: string;
	multiline?: boolean;
	setValue: UseFormSetValue<any>;
}

const CustomSelect = ({
	id,
	label,
	errors,
	setValue,
	control,
	nameValue,
	options,
}: Props) => {
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
