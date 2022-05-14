import React from "react";
import {
  Form,
  Button,
  InputGroup,
  FormControl,
  Container,
} from "react-bootstrap";

interface Props {
    submitE: (e: any) => void
    handle: (e: any, props: object) => void
    email: string
    password: string
    setEmail: () => void
    setPassword: () => void
}

const AuthContainer: React.FC<Props> = ({submitE, handle, email, password, setEmail, setPassword}) => {

  return (
    <Container className="login-form-container">
      <Container className="form-content">
        <Form onSubmit={(e: any) => submitE(e)}>
          <InputGroup className="mb-3className">
            <legend>Login</legend>
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>E-Mail</InputGroup.Text>
            <FormControl
              id="Email"
              name="Email"
              value={email}
              onChange={(e) =>
                handle(e, { func: setEmail, name: "email" })
              }
              placeholder="s.manev@eurovis.bg"
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text>Password</InputGroup.Text>
            <FormControl
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) =>
                handle(e, {
                  func: setPassword,
                  name: "password",
                })
              }
              placeholder="********"
            />
          </InputGroup>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
        <div className="text-center">
          <a
            href="/forgotten-password"
            id="forgotten-password"
            title="Forgotten password"
            // onClick={}
          >
            Forgotten password ?
          </a>
        </div>
      </Container>
    </Container>
  );
};

export default AuthContainer;
