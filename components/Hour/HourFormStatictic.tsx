import { ChangeEvent, useState } from "react";
import { Form } from "react-bootstrap";
import { Hour } from "../../generated/graphql";

interface Props {
  hours: Hour[];
  setCollectionHours: (value: string) => void;
}

const HourFormStatistic: React.FC<Props> = ({ hours, setCollectionHours }) => {
  const [targetDate, setTargetDate] = useState("");
  const collection: any = {};

  const changeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "-1") return setCollectionHours("00:00");
    setTargetDate(e.target.value);
    collectionMonthHours(e.target.value);
  };

  const currentMonth = (month: string) => {
    const mapping: any = {
      "01": "January",
      "02": "February",
      "03": "March",
      "04": "April",
      "05": "May",
      "06": "June",
      "07": "July",
      "08": "Augrust",
      "09": "September",
      "10": "October",
      "11": "November",
      "12": "December",
    };
    const m: string = mapping[month.split("-")[1]];
    const rv: string = m + "-" + month.split("-")[0];
    if (collection[m] && collection[m] === rv) return false;

    collection[m] = rv;
    return `${m} - ${month.split("-")[0]}`;
  };

  function collectionMonthHours(v: string) {
    const target = v.split("-");
    target.pop();
    const targetHours = hours.filter((hour) =>
      hour.date.match(target.join("-"))
    );

    const listValues = targetHours.map((hour) => hour.value);
    const hourCollection = listValues.reduce((prv: any, crr: any) => {
      return prv + crr;
    });

    const h: number = Math.floor(hourCollection / 60);
    const m: number = hourCollection - 60 * h;
    const output = `${h < 10 ? "0" + h : h}:${m < 10 ? "0" + m : m}`;

    setCollectionHours(output);
  }

  return (
    <Form>
      <Form.Group className="mb-3 group-row" controlId="">
        <Form.Label>Month: </Form.Label>
        <Form.Select
          onChange={(e) => changeSelect(e)}
          aria-label="Default select example"
        >
          <option value="-1">-----</option>
          {hours?.map((hour, i) => {
            const result = currentMonth(hour.date);
            if (result) return <option key={i} value={hour.date}>{result}</option>;
          })}
        </Form.Select>
      </Form.Group>
    </Form>
  );
};

export default HourFormStatistic;
