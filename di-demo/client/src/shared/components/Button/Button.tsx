import React from 'react';
import ButtonStyle, {ButtonStyleProps} from './ButtonStyle';

const Button: React.FC<ButtonStyleProps & React.HTMLAttributes<HTMLButtonElement>> = ({...props}) =>{
    return <ButtonStyle {...props}/>;
}

export default Button;