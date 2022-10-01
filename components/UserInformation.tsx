import {useState} from "react";
import { Container, Row, Col } from "react-bootstrap";
import { User } from "../generated/graphql";
import EditableFieldContainer from "./EditableFieldContainer";
import CurrentUser from "../interfaces/CurrectUser"

interface Props {
  user: CurrentUser;
}

const UserInformation: React.FC<Props> = ({ user }) => {
  const [editableAreaFN, setEditableAreaFN] = useState(false);
  const [userFN, setUser] = useState(user.fullname);

  const [editableAreaEmail, setEditableAreaEmail] = useState(false);
  const [userE, setUserE] = useState(user.email);

  const [editableAreaUsername, setEditableAreaUsername] = useState(false);
  const [username, setUsername] = useState(user.username);

  const [editableAreaPassword, setEditableAreaPassword] = useState(false);
  const [password, setPassword] = useState(user.password);

  const editableInput = (
    prop: string,
    type: string,
    setProp: (type: string) => void,
    setPropArea: (type: boolean) => void
  ) => {
    return (
      <EditableFieldContainer
        prop={prop}
        type={type}
        userId={user._id}
        setProp={setProp}
        setPropArea={setPropArea}
      />
    );
  };

  const notEditable = (prop: string, setPropArea: (type: boolean) => void, type?: string) => {
    if(type === 'password') {
      prop = '********'
    }
    return (
      <div>
        <a
          href="/set"
          onClick={(e) => {
            e.preventDefault();
            return setPropArea(true);
          }}
          title={prop}
        >
          {prop}
        </a>
      </div>
    );
  };

  return (
    <>
      <Container className="modal-content">
        <Row>
          <Col sm={4}>
            <span className="headline">Име</span>
          </Col>
          <Col sm={8} className="align-content">
            {!editableAreaFN
              ? notEditable(userFN, setEditableAreaFN)
              : editableInput(userFN, 'fullname' ,setUser, setEditableAreaFN)}
          </Col>
        </Row>
        <Row>
          <Col sm={4}>
            <span className="headline">Потребител</span>
          </Col>
          <Col sm={8} className="align-content">
            {!editableAreaUsername
              ? notEditable(username, setEditableAreaUsername)
              : editableInput(username, 'username' ,setUsername, setEditableAreaUsername)}
          </Col>
        </Row>
        <Row>
          <Col sm={4}>
            <span className="headline">Имейл</span>
          </Col>
          <Col sm={8} className="align-content">
            {!editableAreaEmail
              ? notEditable(userE, setEditableAreaEmail)
              : editableInput(userE, 'email' ,setUserE, setEditableAreaEmail)}
          </Col>
        </Row>
        <Row>
          <Col sm={4}>
            <span className="headline">Парола</span>
          </Col>
          <Col sm={8} className="align-content">
            {!editableAreaPassword
              ? notEditable(password, setEditableAreaPassword, 'password')
              : editableInput(password, 'password' ,setPassword, setEditableAreaPassword)}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserInformation;
