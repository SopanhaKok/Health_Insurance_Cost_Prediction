import React, { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingLayout from "./LoadingLayout";

type MiddlewareGuard = {
  middleware: () => Promise<boolean>;
  children: ReactNode;
};

const MiddlewareGuard = (props: MiddlewareGuard) => {
  const { children, middleware } = props;
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const assignMiddleware = async () => {
    const allowed = await middleware();

    if (allowed) {
      setLoading(false);
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    assignMiddleware();
  }, []);

  return <LoadingLayout loading={loading}>{children}</LoadingLayout>;
};

export default MiddlewareGuard;
