// ==> External Imports
import React from 'react'
import FullCalendar from '@fullcalendar/react'
import luxonPlugin from '@fullcalendar/luxon'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import rrulePlugin from '@fullcalendar/rrule'

const CalenderComponent = ({ events, setEvents, doctor }) => {
  // ==> Event Handlers
  const handleDateSelect = (selectInfo) => {
    let calendarApi = selectInfo.view.calendar
    let title = prompt('Please enter a new title for your event')

    calendarApi.unselect()
    const randomId = Date.now().toString()
    if (title) {
      calendarApi.addEvent(
        {
          id: randomId,
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay,
        },
        true
      )
      const eventData = {
        with: `${doctor.firstName} ${doctor.lastName}`,
        id: randomId,
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
      }
      const oldEventData = JSON.parse(sessionStorage.getItem('events'))
      const newEventData = oldEventData
        ? [...oldEventData, eventData]
        : [eventData]
      sessionStorage.setItem('events', JSON.stringify(newEventData))
    }
  }

  const handleEventClick = (clickInfo) => {
    if (
      // eslint-disable-next-line no-restricted-globals
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      const newEvents = events.filter(
        (event) => event.id !== clickInfo.event.id
      )
      setEvents(newEvents)
      //local storage filtering is just for demo with proper state handling system this will get removed
      const oldEventData = JSON.parse(sessionStorage.getItem('events'))
      const newEventData = oldEventData.filter(
        (event) => event.id !== clickInfo.event.id
      )
      sessionStorage.setItem('events', JSON.stringify(newEventData))

      clickInfo.event.remove() // will render immediately. will call handleEventRemove
    }
  }

  const handleDates = (rangeInfo) => {
    return events
  }

  const handleEventAdd = (addInfo) => {
    console.log('addInfo', addInfo.event.start)

    let objWithId = { ...addInfo.event.toPlainObject() }
    setEvents((events) => [...events, objWithId])
  }

  // const handleEventRemove = (removeInfo) => {
  //   const newEvents = excludeById(events, removeInfo.event.id)
  //   console.log('newEvents', newEvents)
  //   setEvents(newEvents)
  // }
  // ==> Event render view component
  const renderEventContent = (eventInfo) => {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }
  return (
    <FullCalendar
      plugins={[
        dayGridPlugin,
        timeGridPlugin,
        interactionPlugin,
        luxonPlugin,
        rrulePlugin,
      ]}
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      }}
      initialView="timeGridDay"
      editable={false}
      eventDurationEditable={false}
      selectable={true}
      eventStartEditable={false}
      selectMirror={true}
      dayMaxEvents={true}
      weekends={true}
      datesSet={handleDates}
      select={handleDateSelect}
      events={events}
      eventContent={renderEventContent} // custom render function
      eventClick={handleEventClick}
      eventAdd={handleEventAdd}
      // eventChange={handleEventChange} // called for drag-n-drop/resize
      // eventRemove={handleEventRemove}
      timeZone={'local'}
      // slotMinTime={'09:00'}
      // slotMaxTime={'18:00'}
      slotDuration={'0:30:00'}
      snapDuration={'00:30:00'}
      dragScroll={false}
      selectConstraint={'available'}
    />
  )
}

export default CalenderComponent
