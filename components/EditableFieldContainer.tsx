import { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEditUserMutation } from "../generated/graphql";

interface Props {
  prop: string;
  type: string;
  userId: string;
  setProp: (type: string) => void;
  setPropArea: (type: boolean) => void;
}

const EditableFieldContainer: React.FC<Props> = ({
  prop,
  type,
  userId,
  setProp,
  setPropArea,
}) => {
  const [changeProp, setChangeProp] = useState(prop);
  const { mutate } = useEditUserMutation({
    onSuccess: () => {},
    onError: (err: any) => {
      const errorMsg = String(err).split(":")[1];
      toast.error(`${errorMsg}`);
    },
  });

  const commitEditable = async () => {
    await mutate({ id: userId, data: { [type]: changeProp } });
    setProp(changeProp);
    setPropArea(false);
  };

  const removeChanges = () => {
    setChangeProp(prop);
    setPropArea(false);
  };

  return (
    <span className="editable-container editable-inline">
      <div>
        <Form
          className="form-inline editableform"
          onSubmit={() => commitEditable()}
        >
          <Form.Group className="control-group">
            <Row>
              <Col lg={8} md={8} sm={8} className="editable-input">
                {type !== "password" ? (
                  <Form.Control
                    type="text"
                    value={changeProp}
                    onChange={(e) => {
                      setChangeProp(e.target.value);
                    }}
                  />
                ) : (
                  <Form.Control
                    type="password"
                    value={changeProp}
                    onChange={(e) => {
                      setChangeProp(e.target.value);
                    }}
                  />
                )}
              </Col>
              <Col lg={4} md={4} sm={4} className="editable-buttons">
                <Row>
                  <Col lg={6} md={6} sm={6}>
                    <Button type="submit" className="editable-submit">
                      <FontAwesomeIcon icon={faCheck} />
                    </Button>
                  </Col>
                  <Col lg={6} md={6} sm={6}>
                    <Button
                      type="button"
                      className="editable-cancel"
                      onClick={() => removeChanges()}
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </div>
    </span>
  );
};

export default EditableFieldContainer;
