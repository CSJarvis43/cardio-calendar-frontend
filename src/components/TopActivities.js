import { FormControl, Grid, MenuItem, Paper, Select, Typography, InputLabel, Button } from '@mui/material'
import React from 'react'
import { useRecoilState } from 'recoil'
import { personalRecordSelectState } from '../recoil/atoms'

function TopActivities({ GradientBox }) {

    const [personalRecordSelect, setPersonalRecordSelect] = useRecoilState(personalRecordSelectState)


    function handleTopSelectChange(e) {
        const name = e.target.name
        let value = e.target.value
    
        setPersonalRecordSelect({
            ...personalRecordSelect,
            [name]: value,
        })
    }

    function handleFetchRecords() {
        console.log('good place to stop for the night')
    }


  return (
    
    <GradientBox style={{ minHeight: '95vh'}}>
        <Grid container direction={'column'} alignContent='center'>
            <Grid item>
                <Paper elevation={20} sx={{ p: 2, width: '60vw', border: 3, borderColor: 'primary.main', mb: 5}}>
                    <Typography align='center' variant='h2'>
                        Your Personal Records
                    </Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl sx={{ minWidth: '10vw', pr: .5}}>
                    <InputLabel id='exerciseTypeLabel'>Exercise Type</InputLabel>
                    <Select
                        value={personalRecordSelect.exercise_type}
                        labelId='exerciseTypeLabel'
                        label='Exercise Type'
                        name='exercise_type'
                        onChange={handleTopSelectChange}
                    >
                        <MenuItem value={'bike'}>Bike</MenuItem>
                        <MenuItem value={'run'}>Run</MenuItem>
                        <MenuItem value={'ski'}>Ski</MenuItem>
                        <MenuItem value={'hike'}>Hike</MenuItem>
                        <MenuItem value={'swim'}>Swim</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ minWidth: '10vw', pl: .5}}>
                    <InputLabel id='sortByLabel'>Sort Activities By</InputLabel>
                    <Select
                        value={personalRecordSelect.sort_by}
                        labelId='sortByLabel'
                        label='Sort Activities By'
                        name='sort_by'
                        onChange={handleTopSelectChange}
                    >
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center" sx={{ pt: 4}}>
                <Button
                    variant='contained'
                    onClick={handleFetchRecords}
                >
                    Search
                </Button>
            </Grid>
        </Grid>
    </GradientBox>



  )
}

export default TopActivities