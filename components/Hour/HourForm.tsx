import { faCalendarCheck, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useCreateHourMutation, useHoursQuery } from "../../generated/graphql";

const HourForm: React.FC = () => {
  const [date, setDate] = useState("");
  const [overtime, setOvertime] = useState("");
  const { refetch } = useHoursQuery({});
  const {mutate} = useCreateHourMutation({
      onSuccess: (res) => {
        toast.info(`Вие направихте запис за ${res.createHour.date}.`)
        refetch();
      },
      onError:(err) => {
        const errorMsg = String(err).split(":")[1];
        toast.error(`${errorMsg}`)
      }
  })

  const setNowDate = () => {
    const dateNow = new Date(Date.now()).toJSON().slice(0, 10);
    setDate(dateNow);
  };

  const changeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setOvertime(e.target.value);
  }

const submitHourForm = (e: any) => {
    e.preventDefault();
    mutate({data:{date: date, value: parseInt(overtime)}})
}

  return (
    <Container className="form-container mb-4">
      <div className="headline">Нов запис</div>
      <Form onSubmit={submitHourForm}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Дата: </Form.Label>
          <Form.Control
            className="mb-2"
            type="date"
            defaultValue={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Enter date"
          />
          <Button onClick={setNowDate} className="icon-button">
            Днешна дата
            <FontAwesomeIcon icon={faCalendarCheck} />
          </Button>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Часове: </Form.Label>
          <Form.Select onChange={(e) => changeSelect(e)} aria-label="Default select example">
            <option>-----</option>
            <option value="10">00:10</option>
            <option value="20">00:20</option>
            <option value="30">00:30</option>
            <option value="40">00:40</option>
            <option value="50">00:50</option>
            <option value="60">01:00</option>
            <option value="70">01:10</option>
            <option value="80">01:20</option>
            <option value="90">01:30</option>
            <option value="100">01:40</option>
            <option value="110">01:50</option>
            <option value="120">02:00</option>
            <option value="130">02:10</option>
            <option value="140">02:20</option>
            <option value="150">02:30</option>
            <option value="160">02:40</option>
            <option value="170">02:50</option>
            <option value="180">03:00</option>
            <option value="190">03:10</option>
            <option value="200">03:20</option>
            <option value="210">03:30</option>
            <option value="220">03:40</option>
            <option value="230">03:50</option>
            <option value="240">04:00</option>
            <option value="250">04:10</option>
            <option value="260">04:20</option>
            <option value="270">04:30</option>
            <option value="280">04:40</option>
            <option value="290">04:50</option>
            <option value="300">05:00</option>
            <option value="310">05:10</option>
            <option value="320">05:20</option>
            <option value="330">05:30</option>
            <option value="340">05:40</option>
            <option value="350">05:50</option>
            <option value="360">06:00</option>
            <option value="370">06:10</option>
            <option value="380">06:20</option>
            <option value="390">06:30</option>
            <option value="400">06:40</option>
            <option value="410">06:50</option>
            <option value="420">07:00</option>
            <option value="430">07:10</option>
            <option value="440">07:20</option>
            <option value="450">07:30</option>
            <option value="460">07:40</option>
            <option value="470">07:50</option>
            <option value="480">08:00</option>
            <option value="490">08:10</option>
            <option value="500">08:20</option>
            <option value="510">08:30</option>
            <option value="520">08:40</option>
            <option value="530">08:50</option>
            <option value="540">09:00</option>
            <option value="550">09:10</option>
            <option value="560">09:20</option>
            <option value="570">09:30</option>
            <option value="580">09:40</option>
            <option value="590">09:50</option>
            <option value="600">10:00</option>
            <option value="610">10:10</option>
            <option value="620">10:20</option>
            <option value="630">10:30</option>
            <option value="640">10:40</option>
            <option value="650">10:50</option>
            <option value="660">11:00</option>
            <option value="670">11:10</option>
            <option value="680">11:20</option>
            <option value="690">11:30</option>
            <option value="700">11:40</option>
            <option value="710">11:50</option>
            <option value="720">12:00</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          <FontAwesomeIcon icon={faCheck} />
        </Button>
      </Form>
    </Container>
  );
};

export default HourForm;
