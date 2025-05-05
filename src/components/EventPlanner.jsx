
// import React, { useState } from 'react';
// import { useEffect } from 'react';
// import './EventPlanner.css';


// const EventPlanner = () => {
//   const [events, setEvents] = useState(() => {
//     try {
//       const savedEvents = localStorage.getItem('events');
//       return savedEvents && savedEvents !== 'undefined' ? JSON.parse(savedEvents) : [
//         { id: '1', title: 'Зустріч з клієнтом', date: '2025-04-18', time: '10:00', color: '#0d845a', status: 'Planning' },
//         { id: '2', title: 'Презентація проекту', date: '2025-04-19', time: '14:00', color: '#0d845a', status: 'Planning' },
//         { id: '3', title: 'Навчальний семінар', date: '2025-04-20', time: '11:00', color: '#0d845a', status: 'Planning' },
//       ];
//     } catch (error) {
//       console.error('Помилка при розборі даних з localStorage:', error);
//       return [
//         { id: '1', title: 'Зустріч з клієнтом', date: '2025-04-18', time: '10:00', color: '#0d845a', status: 'Planning' },
//         { id: '2', title: 'Презентація проекту', date: '2025-04-19', time: '14:00', color: '#0d845a', status: 'Planning' },
//         { id: '3', title: 'Навчальний семінар', date: '2025-04-20', time: '11:00', color: '#0d845a', status: 'Planning' },
//       ];
//     }
//   });
  
//   const [calendarEvent, setCalendarEvent] = useState(() => {
//     try {
//       const savedCalendarEvents = localStorage.getItem('calendarEvents');
//       return savedCalendarEvents && savedCalendarEvents !== 'undefined' ? JSON.parse(savedCalendarEvents) : [];
//     } catch (error) {
//       console.error('Помилка при розборі даних calendarEvents з localStorage:', error);
//       return [];
//     }
//   });

  
//   const [isDraggen, setIsDraggen] = useState(false);
//   const [message, setMessage] = useState('Events not created' || '')


//   const [highlightedDay, setHighlightedDay] = useState(null);
//   const [newEvent, setNewEvent] = useState({
//     title: '',
//     date: '',
//     time: '',
//     color: '#0d845a',
//     status: 'Planning',
//   });

//   const [editMode, setEditMode] = useState(false);
//   const [editingEventId, setEditingEventId] = useState(null);
//   const [count, setCount] = useState(0)

//   const days = ['Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця', 'Субота', 'Неділя'];

//   useEffect(() => {
//     localStorage.setItem('events', JSON.stringify(events));
//     localStorage.setItem('calendarEvents', JSON.stringify(calendarEvent));
//   }, [events, calendarEvent])

  


//   useEffect(() => {
//     if (events.length === 0) {
//       setMessage('Events not created')
//     } else {
//       setMessage('')
//     }

//     setCount(events.length)
//   }, [events])

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewEvent(prev => ({ ...prev, [name]: value }));
//   };

//   const handleAddEvent = (e) => {
//     e.preventDefault();
  
//     if (!newEvent.title || !newEvent.date || !newEvent.time) {
//       alert('Будь ласка, заповніть всі поля події');
//       return;
//     }
  
//     if (editMode && editingEventId) {
//       const eventInEvents = events.find(event => event.id === editingEventId);
//       const eventCalendar = calendarEvent.find(event => event.id === editingEventId);

//       if (eventInEvents) {
//         setEvents(events.map(ev => ev.id === editingEventId ? { ...newEvent, id: editingEventId } : ev))
//       }
      
//       if (eventCalendar) {
//         const dayOfWeek = eventCalendar.dayOfWeek;
//         setCalendarEvent(calendarEvent.map(ev => 
//           ev.id === editingEventId ? { ...newEvent, id: editingEventId, dayOfWeek } : ev))
//       }
  
//       setEditMode(false);
//       setEditingEventId(null);
//     } else {
//       const newId = String(Math.max(...events.map(e => +e.id), 0) + 1);
//       const newCreatedEvent = { ...newEvent, id: newId };
  
//       setEvents([...events, newCreatedEvent]);
//       setCalendarEvent([...calendarEvent, newCreatedEvent]); // <-- додати в calendarEvent теж
//     }
  
//     setNewEvent({ title: '', date: '', time: '', color: '#0d845a', status: 'Planning' });
//   };
  

//   const handleEditEvent = (event) => {
//     setNewEvent({
//       title: event.title,
//       date: event.date,
//       time: event.time,
//       color: event.color,
//       status: event.status,
//     });
//     setEditMode(true);
//     setEditingEventId(event.id);
//   };

//   const handleDeleteEvent = (id) => {
//     if (window.confirm('Ви впевнені, що хочете видалити цю подію?')) {
//       setEvents(events.filter(e => e.id !== id));
//       setCalendarEvent(calendarEvent.filter(e => e.id !== id))
//       if (editingEventId === id) {
//         setEditMode(false);
//         setEditingEventId(null);
//         setNewEvent({ title: '', date: '', time: '', color: '#0d845a', status: 'Planning' });
//       }
//     }
//   };

//   const handleChangeStatus = (id, newStatus) => {
//     setEvents(events.map(event => 
//       event.id === id ? { ...event, status: newStatus } : event
//     ));
    
//     setCalendarEvent(calendarEvent.map(event => 
//       event.id === id ? { ...event, status: newStatus } : event
//     ));
//   };

//   const getDayFromDate = (dateString) => {
//     const date = new Date(dateString);
//     const day = date.getDay();
//     return days[day === 0 ? 6 : day - 1];
//   };

//   const getEventsByDay = () => {
//     const map = {};
//     days.forEach(d => map[d] = []);
//     events.forEach(e => {
//       const day = getDayFromDate(e.date);
//       if (day) map[day].push(e);
//     });
//     return map;
//   };

//   const handleDragStart = (e, eventId, fromCalendar) => {
//     e.dataTransfer.setData('eventId', eventId);
//     e.dataTransfer.setData('fromCalendar', fromCalendar ? 'true' : 'false');
//   };

//   const handleDrop = (e, targetDay) => {
//     e.preventDefault();
//     setHighlightedDay(null);
//     setIsDraggen(false);

//     const eventId = e.dataTransfer.getData('eventId');
//     console.log('EVENTID', eventId)
//     const fromCalendar = e.dataTransfer.getData('fromCalendar') === 'true';

//     const event = fromCalendar
//       ? calendarEvent.find(e => e.id === eventId)
//       : events.find(e => e.id === eventId);

//     if (!event) return;
//     console.log('EVENT', event)

//     if (!fromCalendar) {
//       const calendarEvents = { ...event, dayOfWeek: targetDay };
//       setCalendarEvent([...calendarEvent, calendarEvents])

//       setEvents(events.filter(e => e.id !== eventId))
//     } else {
//       setCalendarEvent(calendarEvent.map(e => 
//         e.id === eventId ? { ...e, dayOfWeek: targetDay } : e 
//       ));
//     }

//   };

//   const getStatusClass = (status) => {
//     switch(status) {
//       case 'Planning': return 'status-planning';
//       case 'In process': return 'status-inprocess';
//       case 'Done': return 'status-done';
//       default: return '';
//     }
//   };

//   const getStatusBadgeStyle = (status) => {
//     switch(status) {
//       case 'Planning': return { backgroundColor: 'rgba(255, 235, 59, 0.2)', color: '#ffeb3b' };
//       case 'In process': return { backgroundColor: 'rgba(33, 150, 243, 0.2)', color: '#2196f3' };
//       case 'Done': return { backgroundColor: 'rgba(76, 175, 80, 0.2)', color: '#4caf50' };
//       default: return {};
//     }
//   };

//   return (
//     <div className="event-planner">
//       <h1>Planning event</h1>
//       <div className="event-planner-container">
//         <div className="event-form-container">
//           <h2>{editMode ? 'Update event' : 'Add new event'}</h2>
//           <form onSubmit={handleAddEvent} className="event-form">
//             <input type="text" name="title" placeholder="Name event" value={newEvent.title} onChange={handleInputChange} />
//             <input type="date" name="date" value={newEvent.date} onChange={handleInputChange} />
//             <input type="time" name="time" value={newEvent.time} onChange={handleInputChange} />
//             <div className="color-picker">
//               <label>Колір: </label>
//               <input type="color" name="color" value={newEvent.color} onChange={handleInputChange} />
//             </div>
//             <div className="status-selector">
//               <label>Статус: </label>
//               <select name="status" value={newEvent.status} onChange={handleInputChange}>
//                 <option value="Planning">Planning</option>
//                 <option value="In process">In process</option>
//                 <option value="Done">Done</option>
//               </select>
//             </div>
//             <div className="form-buttons">
//               <button type="submit" className="btn-primary">
//                 {editMode ? 'Save change' : 'Add event'}
//               </button>
//               {editMode && <button type="button" className="btn-secondary" onClick={() => setEditMode(false)}>Скасувати</button>}
//             </div>
//           </form>
//         </div>

//         <div className="events-list-container">
//           <h2>My event: {count}</h2>
//           <div className="events-list">
//             {events.map(event => (
//               <div
//                 key={event.id}
//                 draggable
//                 onDragStart={(e) => handleDragStart(e, event.id)}
//                 className="event-item"
//               >
//                 <div className="event-content">
//                   <h3>{event.title}</h3>
//                   <p>{event.date} о {event.time}</p>
//                   <div 
//                     className={`event-status-badge ${getStatusClass(event.status)}`}
//                     style={getStatusBadgeStyle(event.status)}
//                   >
//                     {event.status}
//                   </div>
//                 </div>
//                 <div className="event-actions">
//                   <button className="btn-edit" onClick={() => handleEditEvent(event)}>✏️</button>
//                   <button className="btn-delete" onClick={() => handleDeleteEvent(event.id)}>🗑️</button>
//                   <div className="status-buttons">
//                     <button 
//                       className={`btn-status ${event.status === 'Planning' ? 'active' : ''}`} 
//                       onClick={() => handleChangeStatus(event.id, 'Planning')}
//                     >
//                       Planning
//                     </button>
//                     <button 
//                       className={`btn-status ${event.status === 'In process' ? 'active' : ''}`} 
//                       onClick={() => handleChangeStatus(event.id, 'In process')}
//                     >
//                       In process
//                     </button>
//                     <button 
//                       className={`btn-status ${event.status === 'Done' ? 'active' : ''}`} 
//                       onClick={() => handleChangeStatus(event.id, 'Done')}
//                     >
//                       Done
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="calendar-container">
//         <h2 className='title'>Event calendar</h2>
//         <div className="week-view">
//           {days.map(day => (
//             <div
//               key={day}
//               className={`day-column ${highlightedDay === day ? 'highlighted' : ''}`}
//               onDragEnter={() => setHighlightedDay(day)}
//               onDragLeave={() => setHighlightedDay(null)}
//               onDragOver={(e) => e.preventDefault()}
//               onDrop={(e) => handleDrop(e, day)}
//             >
//               <div className="day-header">{day}</div>
//               <div className="day-events">
//                 {calendarEvent.filter(event => event.dayOfWeek === day).map(event => (
//                   <div
//                     key={event.id}
//                     className={`calendar-event ${getStatusClass(event.status)}`}
//                     draggable
//                     onDragStart={(e) => handleDragStart(e, event.id, true)}
//                     style={{
//                       backgroundColor: event.color === '#0d845a' ? 'rgb(22, 22, 22)' : event.color,
//                       borderLeft: `4px solid ${event.color}`,
//                     }}
//                   >
//                     <div className="calendar-event-content">
//                       <p className="event-title">{event.title}</p>
//                       <p className="event-time">{event.time}</p>
//                       <div 
//                         className={`event-status-badge ${getStatusClass(event.status)}`}
//                         style={getStatusBadgeStyle(event.status)}
//                       >
//                         {event.status}
//                       </div>
//                       <div className="event-actions calendar-actions">
//                         <button className="btn-edit" onClick={() => handleEditEvent(event)}>✏️</button>
//                         <button className="btn-delete" onClick={() => handleDeleteEvent(event.id)}>🗑️</button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EventPlanner;



// import React, { useState } from 'react';
// import { useEffect } from 'react';
// import './EventPlanner.css';


// const EventPlanner = () => {
//   const [events, setEvents] = useState(() => {
//     try {
//       const savedEvents = localStorage.getItem('events');
//       return savedEvents && savedEvents !== 'undefined' ? JSON.parse(savedEvents) : [
//         { id: '1', title: 'Зустріч з клієнтом', date: '2025-04-18', time: '10:00', color: '#0d845a', status: 'Planning' },
//         { id: '2', title: 'Презентація проекту', date: '2025-04-19', time: '14:00', color: '#0d845a', status: 'Planning' },
//         { id: '3', title: 'Навчальний семінар', date: '2025-04-20', time: '11:00', color: '#0d845a', status: 'Planning' },
//       ];
//     } catch (error) {
//       console.error('Помилка при розборі даних з localStorage:', error);
//       return [
//         { id: '1', title: 'Зустріч з клієнтом', date: '2025-04-18', time: '10:00', color: '#0d845a', status: 'Planning' },
//         { id: '2', title: 'Презентація проекту', date: '2025-04-19', time: '14:00', color: '#0d845a', status: 'Planning' },
//         { id: '3', title: 'Навчальний семінар', date: '2025-04-20', time: '11:00', color: '#0d845a', status: 'Planning' },
//       ];
//     }
//   });
  
//   const [calendarEvent, setCalendarEvent] = useState(() => {
//     try {
//       const savedCalendarEvents = localStorage.getItem('calendarEvents');
//       return savedCalendarEvents && savedCalendarEvents !== 'undefined' ? JSON.parse(savedCalendarEvents) : [];
//     } catch (error) {
//       console.error('Помилка при розборі даних calendarEvents з localStorage:', error);
//       return [];
//     }
//   });

//   const [isDraggen, setIsDraggen] = useState(false);
//   const [message, setMessage] = useState('Events not created' || '')
//   const [activeTab, setActiveTab] = useState('add')


//   const [highlightedDay, setHighlightedDay] = useState(null);
//   const [newEvent, setNewEvent] = useState({
//     title: '',
//     date: '',
//     time: '',
//     color: '#0d845a',
//     status: 'Planning',
//   });

//   const [editMode, setEditMode] = useState(false);
//   const [editingEventId, setEditingEventId] = useState(null);
//   const [count, setCount] = useState(0)

//   const days = ['Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця', 'Субота', 'Неділя'];

//   useEffect(() => {
//     localStorage.setItem('events', JSON.stringify(events));
//     localStorage.setItem('calendarEvents', JSON.stringify(calendarEvent));
//   }, [events, calendarEvent])

//   useEffect(() => {
//     if (events.length === 0) {
//       setMessage('Events not created')
//     } else {
//       setMessage('')
//     }

//     setCount(events.length)
//   }, [events])

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewEvent(prev => ({ ...prev, [name]: value }));
//   };

//   const handleAddEvent = (e) => {
//     e.preventDefault();
  
//     if (!newEvent.title || !newEvent.date || !newEvent.time) {
//       alert('Будь ласка, заповніть всі поля події');
//       return;
//     }
  
//     if (editMode && editingEventId) {
//       const eventInEvents = events.find(event => event.id === editingEventId);
//       const eventCalendar = calendarEvent.find(event => event.id === editingEventId);

//       if (eventInEvents) {
//         setEvents(events.map(ev => ev.id === editingEventId ? { ...newEvent, id: editingEventId } : ev))
//       }
      
//       if (eventCalendar) {
//         const dayOfWeek = eventCalendar.dayOfWeek;
//         setCalendarEvent(calendarEvent.map(ev => 
//           ev.id === editingEventId ? { ...newEvent, id: editingEventId, dayOfWeek } : ev))
//       }
  
//       setEditMode(false);
//       setEditingEventId(null);
//     } else {
//       const newId = String(Math.max(...events.map(e => +e.id), 0) + 1);
//       const newCreatedEvent = { ...newEvent, id: newId };
  
//       setEvents([...events, newCreatedEvent]);
//       setCalendarEvent([...calendarEvent, newCreatedEvent]); // <-- додати в calendarEvent теж
//     }
  
//     setNewEvent({ title: '', date: '', time: '', color: '#0d845a', status: 'Planning' });
//   };
  

//   const handleEditEvent = (event) => {
//     setNewEvent({
//       title: event.title,
//       date: event.date,
//       time: event.time,
//       color: event.color,
//       status: event.status,
//     });
//     setEditMode(true);
//     setEditingEventId(event.id);
//   };

//   const handleDeleteEvent = (id) => {
//     if (window.confirm('Ви впевнені, що хочете видалити цю подію?')) {
//       setEvents(events.filter(e => e.id !== id));
//       setCalendarEvent(calendarEvent.filter(e => e.id !== id))
//       if (editingEventId === id) {
//         setEditMode(false);
//         setEditingEventId(null);
//         setNewEvent({ title: '', date: '', time: '', color: '#0d845a', status: 'Planning' });
//       }
//     }
//   };

//   const handleChangeStatus = (id, newStatus) => {
//     setEvents(events.map(event => 
//       event.id === id ? { ...event, status: newStatus } : event
//     ));
    
//     setCalendarEvent(calendarEvent.map(event => 
//       event.id === id ? { ...event, status: newStatus } : event
//     ));
//   };

//   const getDayFromDate = (dateString) => {
//     const date = new Date(dateString);
//     const day = date.getDay();
//     return days[day === 0 ? 6 : day - 1];
//   };

//   const getEventsByDay = () => {
//     const map = {};
//     days.forEach(d => map[d] = []);
//     events.forEach(e => {
//       const day = getDayFromDate(e.date);
//       if (day) map[day].push(e);
//     });
//     return map;
//   };

//   const handleDragStart = (e, eventId, fromCalendar) => {
//     e.dataTransfer.setData('eventId', eventId);
//     e.dataTransfer.setData('fromCalendar', fromCalendar ? 'true' : 'false');
//   };

//   const handleDrop = (e, targetDay) => {
//     e.preventDefault();
//     setHighlightedDay(null);
//     setIsDraggen(false);

//     const eventId = e.dataTransfer.getData('eventId');
//     console.log('EVENTID', eventId)
//     const fromCalendar = e.dataTransfer.getData('fromCalendar') === 'true';

//     const event = fromCalendar
//       ? calendarEvent.find(e => e.id === eventId)
//       : events.find(e => e.id === eventId);

//     if (!event) return;
//     console.log('EVENT', event)

//     if (!fromCalendar) {
//       const calendarEvents = { ...event, dayOfWeek: targetDay };
//       setCalendarEvent([...calendarEvent, calendarEvents])

//       setEvents(events.filter(e => e.id !== eventId))
//     } else {
//       setCalendarEvent(calendarEvent.map(e => 
//         e.id === eventId ? { ...e, dayOfWeek: targetDay } : e 
//       ));
//     }

//   };

//   const getStatusClass = (status) => {
//     switch(status) {
//       case 'Planning': return 'status-planning';
//       case 'In process': return 'status-inprocess';
//       case 'Done': return 'status-done';
//       default: return '';
//     }
//   };

//   const getStatusBadgeStyle = (status) => {
//     switch(status) {
//       case 'Planning': return { backgroundColor: 'rgba(255, 235, 59, 0.2)', color: '#ffeb3b' };
//       case 'In process': return { backgroundColor: 'rgba(33, 150, 243, 0.2)', color: '#2196f3' };
//       case 'Done': return { backgroundColor: 'rgba(76, 175, 80, 0.2)', color: '#4caf50' };
//       default: return {};
//     }
//   };

//   return (
//     <div className="event-planner">
//       <div className='tabs'>
//         <button
//           className={`tab ${activeTab === 'add' ? 'is-active' : ''}`}
//           onClick={() => setActiveTab('add')}
//         >
//           Add new Event
//         </button>
//         <button
//           className={`tab ${activeTab === 'list' ? 'is-active' : ''}`}
//           onClick={() => setActiveTab('list')}
//         >
//           My Events: {count}
//         </button>
//         <button
//           className={`tab ${activeTab === 'calendar' ? 'is-active' : ''}`}
//           onClick={() => setActiveTab('calendar')}
//         >
//           Calendar
//         </button>
        
//       </div>
//       <h1>Planning event</h1>
//       <div className="event-planner-container">
//         {activeTab === 'add' && (
//           <div className="event-form-container">
//           <h2>{editMode ? 'Update event' : 'Add new event'}</h2>
//           <form onSubmit={handleAddEvent} className="event-form">
//             <input type="text" name="title" placeholder="Name event" value={newEvent.title} onChange={handleInputChange} />
//             <input type="date" name="date" value={newEvent.date} onChange={handleInputChange} />
//             <input type="time" name="time" value={newEvent.time} onChange={handleInputChange} />
//             <div className="color-picker">
//               <label>Колір: </label>
//               <input type="color" name="color" value={newEvent.color} onChange={handleInputChange} />
//             </div>
//             <div className="status-selector">
//               <label>Статус: </label>
//               <select name="status" value={newEvent.status} onChange={handleInputChange}>
//                 <option value="Planning">Planning</option>
//                 <option value="In process">In process</option>
//                 <option value="Done">Done</option>
//               </select>
//             </div>
//             <div className="form-buttons">
//               <button type="submit" className="btn-primary">
//                 {editMode ? 'Save change' : 'Add event'}
//               </button>
//               {editMode && <button type="button" className="btn-secondary" onClick={() => setEditMode(false)}>Скасувати</button>}
//             </div>
//           </form>
//         </div>
//         )}

//         {activeTab === 'list' && (
//           <div className="events-list-container">
//           <h2>My event: {count}</h2>
//           <div className="events-list">
//             {events.map(event => (
//               <div
//                 key={event.id}
//                 draggable
//                 onDragStart={(e) => handleDragStart(e, event.id)}
//                 className="event-item"
//               >
//                 <div className="event-content">
//                   <h3>{event.title}</h3>
//                   <p>{event.date} о {event.time}</p>
//                   <div 
//                     className={`event-status-badge ${getStatusClass(event.status)}`}
//                     style={getStatusBadgeStyle(event.status)}
//                   >
//                     {event.status}
//                   </div>
//                 </div>
//                 <div className="event-actions">
//                   <button className="btn-edit" onClick={() => handleEditEvent(event)}>✏️</button>
//                   <button className="btn-delete" onClick={() => handleDeleteEvent(event.id)}>🗑️</button>
//                   <div className="status-buttons">
//                     <button 
//                       className={`btn-status ${event.status === 'Planning' ? 'active' : ''}`} 
//                       onClick={() => handleChangeStatus(event.id, 'Planning')}
//                     >
//                       Planning
//                     </button>
//                     <button 
//                       className={`btn-status ${event.status === 'In process' ? 'active' : ''}`} 
//                       onClick={() => handleChangeStatus(event.id, 'In process')}
//                     >
//                       In process
//                     </button>
//                     <button 
//                       className={`btn-status ${event.status === 'Done' ? 'active' : ''}`} 
//                       onClick={() => handleChangeStatus(event.id, 'Done')}
//                     >
//                       Done
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//         )}
//       </div>

//       {activeTab === 'list' && (
//         <div className="calendar-container">
//         <h2 className='title'>Event calendar</h2>
//         <div className="week-view">
//           {days.map(day => (
//             <div
//               key={day}
//               className={`day-column ${highlightedDay === day ? 'highlighted' : ''}`}
//               onDragEnter={() => setHighlightedDay(day)}
//               onDragLeave={() => setHighlightedDay(null)}
//               onDragOver={(e) => e.preventDefault()}
//               onDrop={(e) => handleDrop(e, day)}
//             >
//               <div className="day-header">{day}</div>
//               <div className="day-events">
//                 {calendarEvent.filter(event => event.dayOfWeek === day).map(event => (
//                   <div
//                     key={event.id}
//                     className={`calendar-event ${getStatusClass(event.status)}`}
//                     draggable
//                     onDragStart={(e) => handleDragStart(e, event.id, true)}
//                     style={{
//                       backgroundColor: event.color === '#0d845a' ? 'rgb(22, 22, 22)' : event.color,
//                       borderLeft: `4px solid ${event.color}`,
//                     }}
//                   >
//                     <div className="calendar-event-content">
//                       <p className="event-title">{event.title}</p>
//                       <p className="event-time">{event.time}</p>
//                       <div 
//                         className={`event-status-badge ${getStatusClass(event.status)}`}
//                         style={getStatusBadgeStyle(event.status)}
//                       >
//                         {event.status}
//                       </div>
//                       <div className="event-actions calendar-actions">
//                         <button className="btn-edit" onClick={() => handleEditEvent(event)}>✏️</button>
//                         <button className="btn-delete" onClick={() => handleDeleteEvent(event.id)}>🗑️</button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       )}
//     </div>
//   );
// };

// export default EventPlanner;



import React, { useState } from 'react';
import { useEffect } from 'react';
import './EventPlanner.css';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-btn" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
};

const EventPlanner = () => {
  const [events, setEvents] = useState(() => {
    try {
      const savedEvents = localStorage.getItem('events');
      return savedEvents && savedEvents !== 'undefined' ? JSON.parse(savedEvents) : [
        { id: '1', title: 'Зустріч з клієнтом', date: '2025-04-18', time: '10:00', color: '#0d845a', status: 'Planning' },
        { id: '2', title: 'Презентація проекту', date: '2025-04-19', time: '14:00', color: '#0d845a', status: 'Planning' },
        { id: '3', title: 'Навчальний семінар', date: '2025-04-20', time: '11:00', color: '#0d845a', status: 'Planning' },
      ];
    } catch (error) {
      console.error('Помилка при розборі даних з localStorage:', error);
      return [
        { id: '1', title: 'Зустріч з клієнтом', date: '2025-04-18', time: '10:00', color: '#0d845a', status: 'Planning' },
        { id: '2', title: 'Презентація проекту', date: '2025-04-19', time: '14:00', color: '#0d845a', status: 'Planning' },
        { id: '3', title: 'Навчальний семінар', date: '2025-04-20', time: '11:00', color: '#0d845a', status: 'Planning' },
      ];
    }
  });
  
  const [calendarEvent, setCalendarEvent] = useState(() => {
    try {
      const savedCalendarEvents = localStorage.getItem('calendarEvents');
      return savedCalendarEvents && savedCalendarEvents !== 'undefined' ? JSON.parse(savedCalendarEvents) : [];
    } catch (error) {
      console.error('Помилка при розборі даних calendarEvents з localStorage:', error);
      return [];
    }
  });

  const [isDraggen, setIsDraggen] = useState(false);
  const [message, setMessage] = useState('Events not created' || '');
  const [activeTab, setActiveTab] = useState('add');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [highlightedDay, setHighlightedDay] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    color: '#0d845a',
    status: 'Planning',
  });

  const [editMode, setEditMode] = useState(false);
  const [editingEventId, setEditingEventId] = useState(null);
  const [count, setCount] = useState(0);

  const days = ['Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця', 'Субота', 'Неділя'];

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
    localStorage.setItem('calendarEvents', JSON.stringify(calendarEvent));
  }, [events, calendarEvent]);

  useEffect(() => {
    if (events.length === 0) {
      setMessage('Events not created');
    } else {
      setMessage('');
    }

    setCount(events.length);
  }, [events]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({ ...prev, [name]: value }));
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
  
    if (!newEvent.title || !newEvent.date || !newEvent.time) {
      alert('Будь ласка, заповніть всі поля події');
      return;
    }
  
    if (editMode && editingEventId) {
      const eventInEvents = events.find(event => event.id === editingEventId);
      const eventCalendar = calendarEvent.find(event => event.id === editingEventId);

      if (eventInEvents) {
        setEvents(events.map(ev => ev.id === editingEventId ? { ...newEvent, id: editingEventId } : ev));
      }
      
      if (eventCalendar) {
        const dayOfWeek = eventCalendar.dayOfWeek;
        setCalendarEvent(calendarEvent.map(ev => 
          ev.id === editingEventId ? { ...newEvent, id: editingEventId, dayOfWeek } : ev
        ));
      }
  
      setEditMode(false);
      setEditingEventId(null);
      setIsModalOpen(false);
    } else {
      const newId = String(Math.max(...events.map(e => +e.id), 0) + 1);
      const newCreatedEvent = { ...newEvent, id: newId };
  
      setEvents([...events, newCreatedEvent]);
    }
  
    setNewEvent({ title: '', date: '', time: '', color: '#0d845a', status: 'Planning' });
  };
  
  const handleEditEvent = (event) => {
    setNewEvent({
      title: event.title,
      date: event.date,
      time: event.time,
      color: event.color,
      status: event.status,
    });
    setEditMode(true);
    setEditingEventId(event.id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditMode(false);
    setEditingEventId(null);
    setNewEvent({ title: '', date: '', time: '', color: '#0d845a', status: 'Planning' });
  };

  const handleDeleteEvent = (id) => {
    if (window.confirm('Ви впевнені, що хочете видалити цю подію?')) {
      setEvents(events.filter(e => e.id !== id));
      setCalendarEvent(calendarEvent.filter(e => e.id !== id));
      if (editingEventId === id) {
        setEditMode(false);
        setEditingEventId(null);
        setNewEvent({ title: '', date: '', time: '', color: '#0d845a', status: 'Planning' });
        setIsModalOpen(false);
      }
    }
  };

  const handleChangeStatus = (id, newStatus) => {
    setEvents(events.map(event => 
      event.id === id ? { ...event, status: newStatus } : event
    ));
    
    setCalendarEvent(calendarEvent.map(event => 
      event.id === id ? { ...event, status: newStatus } : event
    ));
  };

  const getDayFromDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDay();
    return days[day === 0 ? 6 : day - 1];
  };

  const getEventsByDay = () => {
    const map = {};
    days.forEach(d => map[d] = []);
    events.forEach(e => {
      const day = getDayFromDate(e.date);
      if (day) map[day].push(e);
    });
    return map;
  };

  const handleDragStart = (e, eventId, fromCalendar) => {
    e.dataTransfer.setData('eventId', eventId);
    e.dataTransfer.setData('fromCalendar', fromCalendar ? 'true' : 'false');
  };

  const handleDrop = (e, targetDay) => {
    e.preventDefault();
    setHighlightedDay(null);
    setIsDraggen(false);

    const eventId = e.dataTransfer.getData('eventId');
    const fromCalendar = e.dataTransfer.getData('fromCalendar') === 'true';

    const event = fromCalendar
      ? calendarEvent.find(e => e.id === eventId)
      : events.find(e => e.id === eventId);

    if (!event) return;

    if (!fromCalendar) {
      const calendarEvents = { ...event, dayOfWeek: targetDay };
      setCalendarEvent([...calendarEvent, calendarEvents]);
      setEvents(events.filter(e => e.id !== eventId));
    } else {
      setCalendarEvent(calendarEvent.map(e => 
        e.id === eventId ? { ...e, dayOfWeek: targetDay } : e 
      ));
    }
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'Planning': return 'status-planning';
      case 'In process': return 'status-inprocess';
      case 'Done': return 'status-done';
      default: return '';
    }
  };

  const getStatusBadgeStyle = (status) => {
    switch(status) {
      case 'Planning': return { backgroundColor: 'rgba(255, 235, 59, 0.2)', color: '#ffeb3b' };
      case 'In process': return { backgroundColor: 'rgba(33, 150, 243, 0.2)', color: '#2196f3' };
      case 'Done': return { backgroundColor: 'rgba(76, 175, 80, 0.2)', color: '#4caf50' };
      default: return {};
    }
  };

  return (
    <div className="event-planner">
      <div className='tabs'>
        <button
          className={`tab ${activeTab === 'add' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('add')}
        >
          Add new Event
        </button>
        <button
          className={`tab ${activeTab === 'list' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('list')}
        >
          My Events: {count}
        </button>
        <button
          className={`tab ${activeTab === 'calendar' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('calendar')}
        >
          Calendar
        </button>
      </div>
      <h1>Planning event</h1>
      <div className="event-planner-container">
        {activeTab === 'add' && (
          <div className="event-form-container">
            <h2>Add new event</h2>
            <form onSubmit={handleAddEvent} className="event-form">
              <input type="text" name="title" placeholder="Name event" value={newEvent.title} onChange={handleInputChange} />
              <input type="date" name="date" value={newEvent.date} onChange={handleInputChange} />
              <input type="time" name="time" value={newEvent.time} onChange={handleInputChange} />
              <div className="color-picker">
                <label>Колір: </label>
                <input type="color" name="color" value={newEvent.color} onChange={handleInputChange} />
              </div>
              <div className="status-selector">
                <label>Статус: </label>
                <select name="status" value={newEvent.status} onChange={handleInputChange}>
                  <option value="Planning">Planning</option>
                  <option value="In process">In process</option>
                  <option value="Done">Done</option>
                </select>
              </div>
              <div className="form-buttons">
                <button type="submit" className="btn-primary">Add event</button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'list' && (
          <div className="events-list-container">
            <h2>My event: {count}</h2>
            <div className="events-list">
              {events.map(event => (
                <div
                  key={event.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, event.id)}
                  className="event-item"
                >
                  <div className="event-content">
                    <h3>{event.title}</h3>
                    <p>{event.date} о {event.time}</p>
                    <div 
                      className={`event-status-badge ${getStatusClass(event.status)}`}
                      style={getStatusBadgeStyle(event.status)}
                    >
                      {event.status}
                    </div>
                  </div>
                  <div className="event-actions">
                    <button className="btn-edit" onClick={() => handleEditEvent(event)}>✏️</button>
                    <button className="btn-delete" onClick={() => handleDeleteEvent(event.id)}>🗑️</button>
                    <div className="status-buttons">
                      <button 
                        className={`btn-status ${event.status === 'Planning' ? 'active' : ''}`} 
                        onClick={() => handleChangeStatus(event.id, 'Planning')}
                      >
                        Planning
                      </button>
                      <button 
                        className={`btn-status ${event.status === 'In process' ? 'active' : ''}`} 
                        onClick={() => handleChangeStatus(event.id, 'In process')}
                      >
                        In process
                      </button>
                      <button 
                        className={`btn-status ${event.status === 'Done' ? 'active' : ''}`} 
                        onClick={() => handleChangeStatus(event.id, 'Done')}
                      >
                        Done
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Календар завжди відображається незалежно від активної вкладки для збереження функціоналу перетягування */}
      <div className={`calendar-container ${activeTab !== 'calendar' ? 'hidden-calendar' : ''}`}>
        <h2 className='title'>Event calendar</h2>
        <div className="week-view">
          {days.map(day => (
            <div
              key={day}
              className={`day-column ${highlightedDay === day ? 'highlighted' : ''}`}
              onDragEnter={() => setHighlightedDay(day)}
              onDragLeave={() => setHighlightedDay(null)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, day)}
            >
              <div className="day-header">{day}</div>
              <div className="day-events">
                {calendarEvent.filter(event => event.dayOfWeek === day).map(event => (
                  <div
                    key={event.id}
                    className={`calendar-event ${getStatusClass(event.status)}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, event.id, true)}
                    style={{
                      backgroundColor: event.color === '#0d845a' ? 'rgb(22, 22, 22)' : event.color,
                      borderLeft: `4px solid ${event.color}`,
                    }}
                  >
                    <div className="calendar-event-content">
                      <p className="event-title">{event.title}</p>
                      <p className="event-time">{event.time}</p>
                      <div 
                        className={`event-status-badge ${getStatusClass(event.status)}`}
                        style={getStatusBadgeStyle(event.status)}
                      >
                        {event.status}
                      </div>
                      <div className="event-actions calendar-actions">
                        <button className="btn-edit" onClick={() => handleEditEvent(event)}>✏️</button>
                        <button className="btn-delete" onClick={() => handleDeleteEvent(event.id)}>🗑️</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="edit-form-container">
          <h2>Редагувати подію</h2>
          <form onSubmit={handleAddEvent} className="event-form">
            <input type="text" name="title" placeholder="Назва події" value={newEvent.title} onChange={handleInputChange} />
            <input type="date" name="date" value={newEvent.date} onChange={handleInputChange} />
            <input type="time" name="time" value={newEvent.time} onChange={handleInputChange} />
            <div className="color-picker">
              <label>Колір: </label>
              <input type="color" name="color" value={newEvent.color} onChange={handleInputChange} />
            </div>
            <div className="status-selector">
              <label>Статус: </label>
              <select name="status" value={newEvent.status} onChange={handleInputChange}>
                <option value="Planning">Planning</option>
                <option value="In process">In process</option>
                <option value="Done">Done</option>
              </select>
            </div>
            <div className="form-buttons">
              <button type="submit" className="btn-primary">Зберегти зміни</button>
              <button type="button" className="btn-secondary" onClick={handleCloseModal}>Скасувати</button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default EventPlanner;