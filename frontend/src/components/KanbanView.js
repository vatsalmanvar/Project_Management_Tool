import React, { useEffect, useState } from "react";
import KanbanTicket from "./KanbanTicket";
import { useDrag } from "react-dnd";

const KanbanView = (props) => {

 

  const { tick } = props;
  const [tickets, setTickets] = useState([]);
  const [todo, setTodo] = useState([]);
  const [QA, setQA] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    console.log("Kanban View", tick);
    const ftodo = tick.filter(it => it.ticketType === 'To Do')
    const fQA = tick.filter(it => it.ticketType === 'QA')
    const finDevelopment = tick.filter(it => it.ticketType === 'In development')
    const fcompleted = tick.filter(it => it.ticketType === 'Completed')

    setTodo(ftodo);
    setInProgress(finDevelopment);
    setQA(fQA);
    setCompleted(fcompleted);
    console.log(ftodo, fQA, finDevelopment, fcompleted)
    setTickets(tick);
  }, []);

  return (
    <div>
      <div className="row">

        <div className="col-md-3 float-left">
          <div>TO DO</div>
          {Object.values(todo).map((it) => {
            return (
                <div className="container border border-dark rounded my-2">
                  <KanbanTicket ticket={it} />
                </div>
            );
          })}
        </div>

        <div className="col-md-3 float-left">
          <div>In Progress</div>
          {Object.values(inProgress).map((it) => {
            return (
                <div className="container border border-dark rounded my-2">
                  <KanbanTicket ticket={it} />
                </div>
            );
          })}
        </div>

        <div className="col-md-3 float-left">
          <div>QA</div>
          {Object.values(QA).map((it) => {
            return (
                <div className="container border border-dark rounded my-2">
                  <KanbanTicket ticket={it} />
                </div>
            );
          })}
        </div>

        <div className="col-md-3 float-left">
          <div>Completed</div>
          {Object.values(completed).map((it) => {
            return (
                <div className="container border border-dark rounded my-2">
                  <KanbanTicket ticket={it} />
                </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default KanbanView;
