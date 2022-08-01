import { useNavigate } from "react-router-dom";

export const withRouterWrapper = (WrappedComponent) => (props) => {
  const navigate = useNavigate();

  return <WrappedComponent {...props} navigate={navigate} />;
};

