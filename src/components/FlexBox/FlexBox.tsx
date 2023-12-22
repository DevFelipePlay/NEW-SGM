import { Box, BoxProps } from '@mui/material';
import { OverridableComponent, OverrideProps } from '@mui/material/OverridableComponent';

type FlexBoxTypeMap<P = {}, D extends React.ElementType = 'div'> = {
	props: P & {
		component?: React.ElementType;
		sx?: BoxProps['sx'];
		children?: React.ReactNode;
	};
	defaultComponent: D;
};

type FlexBoxProps<
	D extends React.ElementType = FlexBoxTypeMap['defaultComponent'],
	P = {}
> = OverrideProps<FlexBoxTypeMap<P, D>, D>;

export const FlexBox: OverridableComponent<FlexBoxTypeMap> = (props: FlexBoxProps) => {
	const { component = 'div', sx, children, ...other } = props;

	return (
		<Box component={component} sx={{ display: 'flex', flexDirection: 'column', ...sx }} {...other}>
			{children}
		</Box>
	);
};
