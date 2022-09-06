import { Box, Card, CardContent, Grid, Paper, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import useAuthorizedFetch from '../lib/useAuthorizedFetch'
import { activitiesByDayState, selectedCalendarEventState, selectedDateState } from '../recoil/atoms'

function Event({ENDPOINT, capitalizeFirstLetter}) {

    const selectedCalendarEvent = useRecoilValue(selectedCalendarEventState)
    const [activitiesByDay, setActivitiesByDay] = useRecoilState(activitiesByDayState)
    const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState)

    const navigate = useNavigate()
    
    // console.log(selectedCalendarEvent[0])

    const authFetchActiveDayActivities = useAuthorizedFetch(`${ENDPOINT}/active_days/${selectedCalendarEvent[0]}/activities`)
    const authFetchActiveDay = useAuthorizedFetch(`${ENDPOINT}/active_days/${selectedCalendarEvent[0]}`)


    useEffect(() => {
        authFetchActiveDayActivities().then(setActivitiesByDay)
        authFetchActiveDay().then(setSelectedDate)
    }, [])

    console.log(activitiesByDay)





  return (
    <Box>
        <Grid container direction={'column'} alignContent='center'>
            <Grid item>
                <Paper sx={{ p: 2, width: '60vw', border: 3, borderColor: 'primary.main'}}>
                    <Typography align='center' variant='h2'>
                        Activities for {capitalizeFirstLetter(selectedDate.active_day.day_of_week)}, {selectedDate.active_day.date}
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
        <Grid container direction={'column'} alignContent='center'>
            {activitiesByDay.length <= 0 ? (
                null
            ) : (
                activitiesByDay.map(activity => (
                    <Grid item xs={4} key={activity.id}>
                        <Card 
                            raised={true} 
                            sx={{ m: 1, border: .5, borderColor: 'primary.main', width: 600}}
                        >
                            <CardContent>
                            <Typography align='center' variant='h6'>
                                Exercise Type:
                            </Typography>
                                <Typography align='center' variant='h4'>
                                    {capitalizeFirstLetter(activity.exercise_type)}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))
            )}
        </Grid>
    </Box>
  )
}

export default Event