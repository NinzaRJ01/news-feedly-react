import { useNavigate } from 'react-router-dom';

export const withRouter = (Component) => {
  console.log("hey")
  const Wrapper = (props) => {
    const navigate = useNavigate();
    
    return (
      <Component
        navigate={navigate}
        {...props}
        />
    );
  };
  
  return Wrapper;
};
