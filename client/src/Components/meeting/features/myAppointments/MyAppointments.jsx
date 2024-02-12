import { Card, List, Avatar, Input } from 'antd';
import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';

const MyAppointments = () => {

const appointmentimg = require('./Daco_4737920.png');
  const [events, setEvents] = useState([]);
  const [editableEventId, setEditableEventId] = useState(null);

  useEffect(() => {
    const EventData = JSON.parse(sessionStorage.getItem('events'));
    setEvents(EventData || []); 
    return () => {};
  }, []);

  const handleRemarkChange = (event, eventId) => {
  
    const { value } = event.target;
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId ? { ...event, remarks: value } : event
      )
    );
  };

  const toggleEditMode = (eventId) => {
    setEditableEventId((prevId) => (prevId === eventId ? null : eventId));
  };


  const pastEvents = events.filter(
    (event) => DateTime.fromISO(event.end) < DateTime.now()
  );

  const futureEvents = events.filter(
    (event) => DateTime.fromISO(event.end) >= DateTime.now()
  );

  
  const sortedPastEvents = pastEvents.sort(
    (a, b) => DateTime.fromISO(b.start) - DateTime.fromISO(a.start)
  );

  const sortedFutureEvents = futureEvents.sort(
    (a, b) => DateTime.fromISO(b.start) - DateTime.fromISO(a.start)
  );

  return (
    <Card>
      <h2>Future Appointments</h2>
      {sortedFutureEvents && sortedFutureEvents.length > 0 ? (
        <List
          itemLayout="horizontal"
          dataSource={sortedFutureEvents}
          renderItem={(item) => renderEventItem(item)}
        />
      ) : (
        <div>No Future Appointments</div>
      )}

      <h2>Past Appointments</h2>
      {sortedPastEvents && sortedPastEvents.length > 0 ? (
        <List
          itemLayout="horizontal"
          dataSource={sortedPastEvents}
          renderItem={(item) => renderEventItem(item)}
        />
      ) : (
        <div>No Past Appointments</div>
      )}
    </Card>
  );

  function renderEventItem(item) {
    return (
      <List.Item
        style={{
          padding: '1em',
          border: '1px solid rgba(140, 140, 140, 0.9)',
        }}
      >
        <List.Item.Meta
          avatar={<Avatar src={appointmentimg}/>}
          title={item.title}
          description={
            <div className = "MyAppointments">
              <p>with: {item.with}</p>
              <p>
                From:{' '}
                {DateTime.fromFormat(
                  item.start,
                  `yyyy-MM-dd'T'HH:mm:ssZZ`
                ).toLocaleString(DateTime.DATETIME_FULL)}
              </p>
              <p>
                To:{' '}
                {DateTime.fromISO(item.end).toLocaleString(
                  DateTime.DATETIME_FULL
                )}
              </p>
              {editableEventId === item.id ? (
                <>
                  <Input
                    placeholder="Edit remarks..."
                    value={item.remarks || ''}
                    onChange={(event) => handleRemarkChange(event, item.id)}
                  />
                  <button onClick={() => toggleEditMode(item.id)}>Save</button>
                </>
              ) : (
                <>
                  {item.remarks && <p>Remarks: {item.remarks}</p>}
                  <button onClick={() => toggleEditMode(item.id)}>
                    Edit Remarks
                  </button>
                </>
              )}
            </div>
          }
        />
      </List.Item>
    );
  }
};

export default MyAppointments;
