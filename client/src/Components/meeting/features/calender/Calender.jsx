// ==> External Imports
import React, { useState, useEffect } from 'react'
import { Card, Typography } from 'antd'
import CalenderComponent from '../../Components/CalenderComponent'
import { useLocation } from 'react-router-dom'; // Importing useLocation hook

// ==> Internal Imports
import eventData from '../../data/events'

const { Title } = Typography

export function Calender() {
  const location = useLocation(); // Using useLocation hook to get location object
  const data = location.state?.data; // Accessing data directly from location object
  
  const [loading, setLoading] = useState(true)
  const [events, setEvents] = useState({})

  useEffect(() => {
    if (!data) return; // If data is not available, return early

    console.log('==> data', data.name)
    const EventData = JSON.parse(sessionStorage.getItem('events'))
    const filteredEvents = EventData?.filter(
      (item) => item.with === `${data.firstName} ${data.lastName}`
    )
    const combinedEvents = EventData
      ? [...eventData[data.id], ...filteredEvents]
      : eventData[data.id]
    setEvents(combinedEvents)
    let interval = setTimeout(() => {
      setLoading(false)
    }, 0)
    return () => {
      clearTimeout(interval)
    }
  }, [data]) // Make sure to include data in the dependency array

  return (
    <Card
      loading={loading}
      title={
        <Title level={3} style={{ color: '#001529' }}>
          {`Book an Appointment with ${data?.firstName} ${data?.lastName}`} {/* Make sure to handle data being undefined */}
        </Title>
      }
    >
      {/* Intentional prop drilling for facilitating composition */}
      <CalenderComponent events={events} setEvents={setEvents} doctor={data} />
    </Card>
  )
}
