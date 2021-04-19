import React from "react";
import "./styles.scss";
import PropTypes from "prop-types";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {

  Appointment.propTypes = {
    interview: PropTypes.object,
    bookInterview: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    cancelInterview: PropTypes.func.isRequired,
    time: PropTypes.string.isRequired,
    interviewers: PropTypes.array.isRequired
  };

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  // Save appointment changes
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview, transition, SHOW, ERROR_SAVE);
  };

  // Delete an appointment
  const destroy = () => {
    transition(DELETING, true);
    props.cancelInterview(props.id, transition, EMPTY, ERROR_DELETE);
  };

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === SAVING && (
        <Status
          message="Saving"
        />
      )}
      {mode === DELETING && (
        <Status
          message="Deleting"
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete?"
          onCancel={() => back()}
          onConfirm={destroy}
        />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Could not cancel appointment." onClose={() => back()} />
      )}
      {mode === ERROR_SAVE && (
        <Error message="Could not save appointment." onClose={() => back()} />
      )}
    </article>
  );

}