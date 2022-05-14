import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { ListGroup, Button, Badge } from "react-bootstrap";
import { Hour } from "../../generated/graphql";

interface Props {
  hour: Hour;
  onDelete: (_id: string) => void;
}

const HourListItem: React.FC<Props> = ({ hour, onDelete }) => {
  const h: number = Math.floor(hour.value / 60);
  const m: number = hour.value - 60 * h;
  return (
    <ListGroup.Item className="date-result">
      <div>
        <div>
          <Badge className="date-badge">{hour.date}</Badge>
        </div>
        <div>
          Overtime: {h < 10 ? `0${h}` : h}:{m < 10 ? `0${m}` : m}
        </div>
      </div>
      <div>
        <Button
          className="mb-0"
          variant="danger"
          onClick={() => onDelete(hour._id)}
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </Button>
      </div>
    </ListGroup.Item>
  );
};

export default HourListItem;
