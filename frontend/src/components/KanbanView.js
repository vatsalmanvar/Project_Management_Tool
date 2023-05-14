import React, { useEffect, useState } from "react";
import KanbanSection from "./KanbanSection";

const KanbanView = (props) => {

  const { tickets, setTickets, projectId } = props;

  const [todo, setTodo] = useState([]);
  const [QA, setQA] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    const ftodo = tickets.filter(it => it.ticketStatus === 'To Do')
    const fQA = tickets.filter(it => it.ticketStatus === 'QA')
    const finDevelopment = tickets.filter(it => it.ticketStatus === 'In Progress')
    const fcompleted = tickets.filter(it => it.ticketStatus === 'Completed')
    
    setTodo(ftodo);
    setInProgress(finDevelopment);
    setQA(fQA);
    setCompleted(fcompleted);
    // console.log("Kanban View", tickets);
    // console.log(ftodo, fQA, finDevelopment, fcompleted)
  }, [tickets]);

  return (
    <div>
      {
        tickets.length === 0
        ?
        <div>No Tickets</div>
        :
        <div className="row">
          <KanbanSection setTickets={setTickets} tickets={tickets} sectionName={"To Do"} specifictickets={todo}/>
          <KanbanSection setTickets={setTickets} tickets={tickets} sectionName={"In Progress"} specifictickets={inProgress}/>
          <KanbanSection setTickets={setTickets} tickets={tickets} sectionName={"QA"} specifictickets={QA}/>
          <KanbanSection setTickets={setTickets} tickets={tickets} sectionName={"Completed"} specifictickets={completed}/>
        </div>
      }
    </div>
  );
};

export default KanbanView;