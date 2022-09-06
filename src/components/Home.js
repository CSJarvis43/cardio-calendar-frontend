import { Grid } from '@mui/material'
import React, { useEffect, useMemo } from 'react'
import useAuthorizedFetch from '../lib/useAuthorizedFetch'
import "react-big-calendar/lib/css/react-big-calendar.css"
import { useRecoilState, useRecoilValue } from 'recoil'
import { activityEventsState, currentUser, selectedCalendarEventState } from '../recoil/atoms'
import './Home.css'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useNavigate } from 'react-router-dom'



function Home({ ENDPOINT }) {

  const [activityEvents, setActivityEvents] = useRecoilState(activityEventsState)
  const [selectedCalendarEvent, setSelectedCalendarEvent] = useRecoilState(selectedCalendarEventState)
  const user = useRecoilValue(currentUser)
  
  const navigate = useNavigate()
  const eventAuthFetch = useAuthorizedFetch(`${ENDPOINT}/active_days`)


  useEffect(() => {
    eventAuthFetch().then(json => json.filter(e => e.user_id === user.id)).then(setActivityEvents)
  }, [user])

  // console.log(user)

  // useEffect(() => {
  //   eventAuthFetch()
  //   .then(json => {
  //     if(user) {
  //       json.filter(e => e.user_id === user.id)
  //     }
  //   })
  //   .then(setActivityEvents)
  // }, [user])

  // const eventsByUser = activityEvents.filter(e => e.user_id === user.id)

  // console.log(activityEvents)

  // const eventsByUser = activityEvents

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

  // console.log(selectedCalendarEvent)


  return (
    
    <Grid>
      <FullCalendar 
        plugins={[dayGridPlugin]}
        events={transformedEvents}
        editable={true}
        selectable={true}
        aspectRatio={2.2}
        eventClick={function(arg){
          setSelectedCalendarEvent(arg.event.id)
          navigate('/event')
          // console.log(selectedCalendarEvent)
        }}
      />
    </Grid>




  )
}

export default Home