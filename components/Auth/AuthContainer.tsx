import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import { useLoginMutation } from "../../generated/graphql";
import AuthForm from "./AuthForm";

interface Props {
  setCurrectUser: ({}) => void
  setToken: (type: string) => void
}

const AuthContainer: React.FC<Props> = ({setCurrectUser, setToken}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookie, setCookie] = useCookies(["token"]);

  const { mutate } = useLoginMutation({
    onSuccess: async (data) => {
      if (data.login) {
        await setToken(data.login);
        await setCookie("token", data.login, {
          path: "/",
          maxAge: 360000,
          sameSite: true,
        });
      }
    },
    onError: (err: any) => {
      const errorMsg = String(err).split(":")[1];
      toast.error(`${errorMsg}`);
    },
  });

  async function tryLogin(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    e.preventDefault();
    e.stopPropagation();
    await mutate({ email, password });
  }
  
  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    props: { func: any; name?: string }
  ) {
    props.func(e.target.value);
  }

  return (
    <Row className="justify-content-center">
      <Col sm={12} lg={10} xl={6}>
        <AuthForm
          submitE={tryLogin}
          handle={(
            e: any,
            props: { func: any; name?: string }
          ) => handleInputChange(e, props)}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
        />
        <ToastContainer
          position="bottom-left"
          autoClose={8000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Col>
    </Row>
  );
};

export default AuthContainer;
