import React from 'react';

//Styles
import { CustomButtonContainer } from './custom-button.styles';

const CustomButton = ({children, ...props}) => (
    <CustomButtonContainer {...props}>
        {children}
    </CustomButtonContainer>
);

export default CustomButton;