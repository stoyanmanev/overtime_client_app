import React, {useRef, useState} from "react";
import Modal from "react-modal";
import Image from "next/image";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Form,
  Button,
  InputGroup,
  FormControl,
  Container,
} from "react-bootstrap";
import { faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";
import ReactModal from "react-modal";
import { uuid } from 'uuidv4';
import { useEditUserMutation, useUsersQuery } from "../../generated/graphql";
import SendEmail from "../../heaplers/SendEmail";

interface Props {
  submitE: (e: any) => void;
  handle: any;
  email: string;
  password: string;
  setEmail: any;
  setPassword: any;
}

const AuthContainer: React.FC<Props> = ({
  submitE,
  handle,
  email,
  password,
  setEmail,
  setPassword,
}) => {
  const form = useRef(null);
  const [userF, setUserF] = useState('');
  const [emailF, setEmailF] = useState('');
  const [passwordF, setPasswordF] = useState('');
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const { isLoading, isError, data, error } = useUsersQuery({});
  const { mutate } = useEditUserMutation({
    onSuccess: async () => {
      const isEmailSendend: Promise<boolean> = SendEmail(userF, emailF, passwordF);
      if(await isEmailSendend) return toast.success(`Успешно обновихте вашия акаунт.`);
      return toast.error(`Имейла не успя да се изпрати!`);
    },
    onError: (err: any) => {
        const errorMsg = String(err).split(":")[1];
        toast.error(`${errorMsg}`)
    }
  });
  
  const setFotgottenPassword = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  if (typeof window !== "undefined") {
    ReactModal.setAppElement("body");
  }

  const EmailSendFuc = async () => {
    if (isLoading) {
      <div className="overlay-loading loading">
        <Image
          src="/images/layout/loader.svg"
          alt="Loading..."
          width={60}
          height={60}
        />
      </div>;
    }

    if (isError) {
      const msg: string = String(error);
      return toast.error(msg);
    }

    const idUserFound = data && data.users.filter(us => us.username === userF && us.email === emailF); 

    if(!idUserFound || idUserFound.length === 0) return toast.error('user_not_found')
    
    const generatedPassword = uuid();
    await setPasswordF(generatedPassword);
    return await mutate({ id: idUserFound[0]._id, data: {password: generatedPassword}})
  }

  return (
    <Container className="login-form-container">
      <Container className="form-content">
        <Form onSubmit={(e: any) => submitE(e)}>
          <InputGroup >
            <legend>Вход</legend>
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Имейл</InputGroup.Text>
            <FormControl
              id="Email"
              name="Email"
              value={email}
              onChange={(e) => handle(e, { func: setEmail, name: "email" })}
              placeholder="въведете имейл"
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text>Парола</InputGroup.Text>
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
              placeholder="въведи парола"
            />
          </InputGroup>
          <Button variant="primary" type="submit">
            Вход
          </Button>
        </Form>
        <div className="text-center">
          <a
            href="/forgotten-password"
            id="forgotten-password"
            title="Forgotten password"
            onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) =>
              setFotgottenPassword(e)
            }
          >
            Забравена парола?
          </a>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          className="forgot-password-modal modal-window"
        >
          <Form ref={form} onSubmit={(e) => {e.preventDefault(); EmailSendFuc()}}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Потребителско име</Form.Label>
              <Form.Control
                type="text"
                name="user_name"
                placeholder="Въведете име"
                value={userF}
                onChange={(e) => setUserF(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Имейл</Form.Label>
              <Form.Control
                type="email"
                name="user_email"
                placeholder="Въведете имейл"
                value={emailF}
                onChange={(e) => setEmailF(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Button
              type="submit"
            >
              <FontAwesomeIcon icon={faCheck} />
            </Button>
          </Form>
          <Button className="close-modal-btn" onClick={closeModal}>
            <FontAwesomeIcon icon={faXmark} />
          </Button>
        </Modal>
      </Container>
    </Container>
  );
};

export default AuthContainer;
