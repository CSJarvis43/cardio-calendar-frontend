import { Grid } from '@mui/material'
import React, { useEffect, useMemo } from 'react'
import useAuthorizedFetch from '../lib/useAuthorizedFetch'
import "react-big-calendar/lib/css/react-big-calendar.css"
import { useRecoilState, useRecoilValue } from 'recoil'
import { activityEventsState, currentUser, selectedCalendarEventState } from '../recoil/atoms'
import './Home.css'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'



function Home({ ENDPOINT }) {

  const [activityEvents, setActivityEvents] = useRecoilState(activityEventsState)
  const [selectedCalendarEvent, setSelectedCalendarEvent] = useRecoilState(selectedCalendarEventState)
  const user = useRecoilValue(currentUser)
  
  const eventAuthFetch = useAuthorizedFetch(`${ENDPOINT}/active_days`)

  useEffect(() => {
    eventAuthFetch().then(json => json.filter(e => e.user_id === user.id)).then(setActivityEvents)
  }, [])

  // const eventsByUser = activityEvents.filter(e => e.user_id === user.id)

  console.log(activityEvents)

  const eventsByUser = activityEvents

  const transformedEvents = activityEvents.map(e => 
    ({
      id: e.id,
      title: `${e.streak} days active in a row!`,
      allDay: true,
      start: new Date(e.date.replace(/-/g, '\/'))
    })
  )

  function handleEventClick(e) {
    console.log(e)
  }

  console.log(selectedCalendarEvent)


  return (
    
    <Grid style={{ height: "94vh" }}>
      <FullCalendar 
        plugins={[dayGridPlugin]}
        events={transformedEvents}
        editable={true}
        selectable={true}
        aspectRatio={2.19}
        eventClick={function(arg){
          setSelectedCalendarEvent(arg.event.id)
        }}
      />
    </Grid>




  )
}

export default Home