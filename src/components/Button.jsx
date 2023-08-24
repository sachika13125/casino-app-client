import React from 'react';

function Button({ label, onClick, className }) {
  const defaultClasses = 'flex justify-center items-center shadow rounded font-bold py-2 px-4';

  const combinedClasses = `${defaultClasses} ${className}`;

  return (
    <button onClick={onClick} className={combinedClasses}>
      {label}
    </button>
  );
}

export default Button;
