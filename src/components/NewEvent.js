import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { addEventDateState, newEventDataState, currentUser, activeDaysForNewEventState } from '../recoil/atoms'
import { Link } from 'react-router-dom'
import { Button, Container, FormControl, Grid, InputLabel, MenuItem, Rating, Select, TextField, Typography } from '@mui/material'
import DatePicker from './DatePicker'
import useAuthorizedFetch from '../lib/useAuthorizedFetch'

function NewEvent({ ENDPOINT }) {

  const [newEventData, setNewEventData] = useRecoilState(newEventDataState)
  const [addEventDate, setAddEventDate] = useRecoilState(addEventDateState)
  const [activeDaysForNewEvent, setActiveDaysForNewEvent] = useRecoilState(activeDaysForNewEventState)
  const user = useRecoilValue(currentUser)

  const authFetchActiveDays = useAuthorizedFetch(`${ENDPOINT}/active_days/`)
  const authFetchSubmitNewEvent = useAuthorizedFetch(`${ENDPOINT}/active_days/`, 'POST')

  
  useEffect(() => {
    authFetchActiveDays().then(json => json.filter(e => e.user_id === user.id)).then(j => setActiveDaysForNewEvent(j[j.length -1]))
  }, [])
  
  console.log(activeDaysForNewEvent)
  
  function handleFormChange(e) {
    const name = e.target.name
    let value = e.target.value
    
    setNewEventData({
      ...newEventData,
      [name]: value,
    })
  }
  
  const transformedEventDate = {
    date: new Date(addEventDate.$y, addEventDate.$M, addEventDate.$D),
    
  }
  
  function getDayName(dateStr, locale) {
    let date = new Date(dateStr)
    return date.toLocaleDateString(locale, { weekday: 'long' })
  }
  
  function handleNewEventSubmit() {
    
    const dayToDayOfWeek = transformedEventDate.date
    const diff = Math.floor((Date.parse(activeDaysForNewEvent.date) - Date.parse(transformedEventDate.date)) / 86400000)
    console.log(diff)
    
    const newActiveDayObj = {
        active_day: {
        date: transformedEventDate.date,
        day_of_week: getDayName(dayToDayOfWeek, 'en-US'),
        streak: diff >= -2 ? activeDaysForNewEvent.streak + 1 : 1,
        user_id: user.id
      }
    }

    console.log(newActiveDayObj)
    authFetchSubmitNewEvent(newActiveDayObj).then(console.log)
  }
  




  return (


    <Grid >
      <Grid 
        container
        direction='column'
        alignItems={'center'}
        justifyContent={'center'}
        style={{ minHeight: '80vh'}}
      >
        <Grid item xs={12} align="center" sx={{ pb: 3}}>
          <Typography variant='h4' justifySelf={'center'} sx={{ pb: 2 }}>
            Date of Activity
          </Typography>
          <DatePicker />
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant='h4' justifySelf={'center'} sx={{ pb: 2 }} >
            Activity Details
          </Typography>
          <FormControl sx={{ m: 2 }} >
            <InputLabel id='exerciseTypeLabel'>Exercise Type</InputLabel>
            <Select
              value={newEventData.exercise_type}
              labelId='exerciseTypeLabel'
              label='Exercise Type'
              name='exercise_type'
              onChange={handleFormChange}
            >
              <MenuItem value={'bike'}>Bike</MenuItem>
              <MenuItem value={'run'}>Run</MenuItem>
              <MenuItem value={'ski'}>Ski</MenuItem>
              <MenuItem value={'hike'}>Hike</MenuItem>
              <MenuItem value={'swim'}>Swim</MenuItem>
            </Select>
            <TextField
              sx={{ m: 2, mt: 4 }}
              type='number'
              required
              autoComplete="off"
              value={newEventData.calories}
              onChange={handleFormChange}
              label='Calories Burned'
              name='calories'
            />
            <TextField
              sx={{ m: 2 }}
              type='number'
              required
              autoComplete="off"
              value={newEventData.distance}
              onChange={handleFormChange}
              label='Distance'
              name='distance'
            />
            <TextField
              sx={{ m: 2 }}
              type='number'
              required
              autoComplete="off"
              value={newEventData.activity_length}
              onChange={handleFormChange}
              label='Exercise Time'
              name='activity_length'
            />
            <Rating
              sx={{ m: 1 }}
              value={parseInt(newEventData.rating)}
              max={10}
              name='rating'
              onChange={(e) => setNewEventData({
                ...newEventData,
                [e.target.name]: parseInt(e.target.value)
              })}
              
            />
            <Button
                sx={{ m: 2 }}
                onClick={handleNewEventSubmit}
                variant="contained"
            >
                Submit
            </Button>
          </FormControl>
                </Grid>
            </Grid>
        </Grid>
  )
}

export default NewEvent