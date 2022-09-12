import { FormControl, Grid, Typography, InputLabel, Select, MenuItem, TextField, Button, Paper } from '@mui/material'
import React from 'react'
import { useRecoilState } from 'recoil'
import { calorieCalculatorValueState, newEventDataState } from '../recoil/atoms'

function CalorieCalculator() {

    const [newEventData, setNewEventData] = useRecoilState(newEventDataState)
    const [calorieCalculatorValue, setCalorieCalculatorValue] = useRecoilState(calorieCalculatorValueState)

    const POUNDSTOKILOGRAMS = 2.20462
    const CALORIECOEFFICIENT = .0175

    function handleCalculatorChange(e) {
        const name = e.target.name
        let value = e.target.value
    
        setCalorieCalculatorValue({
            ...calorieCalculatorValue,
            [name]: value,
        })
    }


    function handleCalculation() {
        let result

        const exerciseType = calorieCalculatorValue.exercise_type
        const weight = calorieCalculatorValue.weight
        const time = calorieCalculatorValue.activity_length

        switch(exerciseType) {
            case 'bike':
                result = (weight / POUNDSTOKILOGRAMS) * 9 * CALORIECOEFFICIENT * time
                setNewEventData({
                    ...newEventData,
                        exercise_type: 'bike',
                        calories: result.toFixed(),
                        activity_length: time
                    })
                break

            case 'run':
                result = (weight / POUNDSTOKILOGRAMS) * 10 * CALORIECOEFFICIENT * time
                setNewEventData({
                    ...newEventData,
                        exercise_type: 'run',
                        calories: result.toFixed(),
                        activity_length: time
                    })
                break

            case 'ski':
                result = (weight / POUNDSTOKILOGRAMS) * 6 * CALORIECOEFFICIENT * time
                setNewEventData({
                    ...newEventData,
                        exercise_type: 'ski',
                        calories: result.toFixed(),
                        activity_length: time
                    })
                break

            case 'swim':
                result = (weight / POUNDSTOKILOGRAMS) * 10 * CALORIECOEFFICIENT * time
                setNewEventData({
                    ...newEventData,
                        exercise_type: 'swim',
                        calories: result.toFixed(),
                        activity_length: time
                    })
                break

            case 'hike':
                result = (weight / POUNDSTOKILOGRAMS) * 4.8 * CALORIECOEFFICIENT * time
                setNewEventData({
                    ...newEventData,
                        exercise_type: 'hike',
                        calories: result.toFixed(),
                        activity_length: time
                    })
                break

        }
        setCalorieCalculatorValue({
            ...calorieCalculatorValue,
            exercise_type: '',
            activity_length: '',
            weight: ''
        })
        
    }
    
    console.log(newEventData)

  return (
    <Grid >
        <Grid 
            container
            direction='column'
            alignItems={'center'}
            justifyContent={'center'}
            style={{ minHeight: '80vh'}}
        >
            <Grid item xs={12} align="center">
                <Typography variant='h4' justifySelf={'center'} sx={{ pb: 2 }} >
                    Per Activity Calorie Calculator
                </Typography>
                <FormControl sx={{ m: 2 }} >
                <InputLabel id='exerciseTypeLabel'>Exercise Type</InputLabel>
                <Select
                    value={calorieCalculatorValue.exercise_type}
                    labelId='exerciseTypeLabel'
                    label='Exercise Type'
                    name='exercise_type'
                    onChange={handleCalculatorChange}
                    required
                >
                    <MenuItem value={'bike'}>Bike</MenuItem>
                    <MenuItem value={'run'}>Run</MenuItem>
                    <MenuItem value={'ski'}>Ski</MenuItem>
                    <MenuItem value={'hike'}>Hike</MenuItem>
                    <MenuItem value={'swim'}>Swim</MenuItem>
                </Select>
                <TextField
                    sx={{ m: 2, mt: 4 }}
                    required
                    type='number'
                    autoComplete="off"
                    value={calorieCalculatorValue.activity_length}
                    onChange={handleCalculatorChange}
                    label='Time Active (mins)'
                    name='activity_length'
                />
                <TextField
                    sx={{ m: 2 }}
                    type='number'
                    required
                    autoComplete="off"
                    value={calorieCalculatorValue.weight}
                    onChange={handleCalculatorChange}
                    label='Body Weight (lbs)'
                    name='weight'
                />
                <Button
                    sx={{ m: 2 }}
                    onClick={handleCalculation}
                    variant="contained"
                >
                    Calculate
                </Button>

                </FormControl>
            </Grid>
            {newEventData.exercise_type.length > 0 ? (
            <Grid item xs={12} align="center">
                <Paper elevation={20} sx={{ p: 2, width: '40vw', border: 3, borderColor: 'primary.main', mb: 5}}>
                    <Typography variant='h5'>
                        {`You would burn ${newEventData.calories} calories on a ${newEventData.activity_length} minute ${newEventData.exercise_type}`}
                    </Typography>
                </Paper>
                <Button
                    sx={{ m: 2 }}
                    // onClick={handleNewEventSubmit}
                    variant="contained"
                    // component={Link}
                    // to='/'
                >
                    Add a New Event
                </Button>
            </Grid>
            ) : (
                null
            )}
        </Grid>
    </Grid>
  )
}

export default CalorieCalculator