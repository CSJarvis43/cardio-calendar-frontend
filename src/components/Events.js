import FullCalendar from '@fullcalendar/react'
import { Box, Button, Card, CardActions, CardContent, Grid, Paper, Rating, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import useAuthorizedFetch from '../lib/useAuthorizedFetch'
import { activitiesByDayState, deletingActivityState, selectedCalendarEventState, selectedDateState } from '../recoil/atoms'

function Event({ENDPOINT, capitalizeFirstLetter}) {

    const selectedCalendarEvent = useRecoilValue(selectedCalendarEventState)
    const [activitiesByDay, setActivitiesByDay] = useRecoilState(activitiesByDayState)
    const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState)
    const [deletingActivity, setDeletingActivity] = useRecoilState(deletingActivityState)

    const authFetchActiveDayActivities = useAuthorizedFetch(`${ENDPOINT}/active_days/${selectedCalendarEvent}/activities`)
    const authFetchActiveDay = useAuthorizedFetch(`${ENDPOINT}/active_days/${selectedCalendarEvent}`)

    // console.log(selectedCalendarEvent)


    useEffect(() => {
        authFetchActiveDayActivities().then(setActivitiesByDay)
        authFetchActiveDay().then(setSelectedDate)
    }, [deletingActivity])

    // console.log(activitiesByDay)

    const calorieSum = activitiesByDay.reduce((acc, obj) => {
        return acc + obj.calories
    }, 0)

    const distanceSum = activitiesByDay.reduce((acc, obj) => {
        return acc + obj.distance
    }, 0)
    
    const activityLengthSum = activitiesByDay.reduce((acc, obj) => {
        return acc + obj.activity_length
    }, 0)

    function handleDeleteActivity(activity) {
        fetch(`${ENDPOINT}/activities/${activity.id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        }).then(setDeletingActivity(activity))
    }



  return (

    <Box>
        <Grid container direction={'column'} alignContent='center'>
            <Grid item>
                <Paper elevation={20} sx={{ p: 2, width: '60vw', border: 3, borderColor: 'primary.main', mb: 5}}>
                    <Typography align='center' variant='h2'>
                        Activities for {capitalizeFirstLetter(selectedDate.active_day.day_of_week)}, {selectedDate.active_day.date}
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
        <Grid container direction={'column'} alignContent='center'>
            {activitiesByDay.length <= 0 ? (
                <Typography variant='h3'>
                    No data from this date
                </Typography>
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
                            <Typography align='center' variant='h6'>
                                Calories Burned:
                            </Typography>
                            <Typography align='center' variant='h4'>
                                {activity.calories}
                            </Typography>
                            <Typography align='center' variant='h6'>
                                Duration:
                            </Typography>
                            <Typography align='center' variant='h4'>
                                {activity.activity_length} minutes
                            </Typography>
                            <Typography align='center' variant='h6'>
                                Distance:
                            </Typography>
                            <Typography align='center' variant='h4'>
                                {activity.distance} miles
                            </Typography>
                            <Grid container alignContent={'center'}>
                                <Rating 
                                    value={activity.rating}
                                    readOnly
                                    max={10}
                                    sx={{ m: 'auto'}}
                                />
                            </Grid>
                            </CardContent>
                            <Box display={'flex'}>
                                <CardActions sx={{ m: 'auto'}}>
                                    <Button variant='outlined' sx={{ m: 'auto'}}>
                                        edit
                                    </Button>
                                    <Button variant='outlined' sx={{ m: 'auto'}} onClick={() => {
                                            handleDeleteActivity(activity)
                                        }}>
                                        delete
                                    </Button>
                                </CardActions>
                            </Box>
                        </Card>
                    </Grid>
                ))
            )}
        </Grid>
        <Grid container direction={'column'} alignContent='center'>
            <Grid item>
                <Card 
                    raised={true} 
                    sx={{ m: 1, border: .5, borderColor: 'primary.main', width: 900}}
                >
                    <CardContent>
                    <Typography align='center' variant='h3'>
                        Daily Totals:
                    </Typography>
                    <Typography align='center' variant='h6'>
                        Calories Burned
                    </Typography>
                    <Typography align='center' variant='h4'>
                        {calorieSum}
                    </Typography>
                    <Typography align='center' variant='h6'>
                        Total Duration
                    </Typography>
                    <Typography align='center' variant='h4'>
                        {activityLengthSum} minutes
                    </Typography>
                    <Typography align='center' variant='h6'>
                        Total Distance
                    </Typography>
                    <Typography align='center' variant='h4'>
                        {distanceSum} miles
                    </Typography>
                    </CardContent>
                    <Box display={'flex'}>
                        <CardActions sx={{ m: 'auto'}}>
                            <Button 
                                variant='outlined'
                                component={Link}
                                to='/home'
                            >
                                Back To Calendar
                            </Button>
                        </CardActions>
                    </Box>
                </Card>
            </Grid>
        </Grid>
    </Box>
    )
}

export default Event