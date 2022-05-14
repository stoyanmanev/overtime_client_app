import React from "react";
import { ListGroup } from "react-bootstrap";
import { Hour, User } from "../../generated/graphql";
import HourListItem from "./HourListItem";
import { toast } from "react-toastify";

interface Props {
  hours: Hour[];
  user: User;
  onDelete: (_id: string) => void;
}

const HourList: React.FC<Props> = ({ hours, user, onDelete }) => {
  const userHours = hours.filter((hour) => hour.createdBy === user._id);

  if (userHours.length === 0) {
    return (
      <ListGroup>
        <div className="list-group-item">Result not found</div>
      </ListGroup>
    );
  }

  return (
    <ListGroup>
      {userHours &&
        userHours.map((data) => (
          <HourListItem key={data._id} hour={data} onDelete={onDelete} />
        ))}
    </ListGroup>
  );
};

export default HourList;
