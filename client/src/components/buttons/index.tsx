import React from 'react';

// export const Button: React.FC<React.ComponentProps<'button'>> = (props) => (
//   <button {...props} />
// );

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'>
>((props, ref) => (
  <button {...props} ref={ref} />
));
