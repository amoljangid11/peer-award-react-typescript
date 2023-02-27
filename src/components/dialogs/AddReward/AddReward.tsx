import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { validationSchema } from './validationSchema';
import { Button, Container, Grid, InputAdornment, TextField } from '@material-ui/core';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useUser } from '../../providers/AuthProvider';
import { CURRENCY } from '../../../config';
import { fetchJSON, getFullName } from '../../../utils';
import { IRewardForm, IUser } from '../../../types';
import useStyles from '../Dialog.style';
import UserAvatar from '../../shared/UserAvatar';

type AddRewardProps = {
  closeDialog: () => void;
  addReward: (form: IRewardForm) => void;
};

const AddReward = ({ closeDialog, addReward }: AddRewardProps): JSX.Element => {
  const from = useUser();
  const [users, setUsers] = useState([] as IUser[]);
  const usersOptions = users.filter((user) => user.email !== from.email);
  const classes = useStyles();

  useEffect(() => {
    fetchJSON('/mockups/users.json', (json) => setUsers(json));
  }, []);

  const onSubmit = (values: IRewardForm) => {
    addReward(values);
    closeDialog();
  };
  const initialValues = { from, to: null, reward: 0, message: '' };
  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { values, touched, errors, handleChange, handleSubmit, setFieldValue } = formik;

  const handleAutocompleteChange = (event: object, value: IUser | null) => {
    setFieldValue('to', value);
  };

  return (
    <Dialog open onClose={closeDialog} aria-labelledby="add-reward-dialog">
      <Container maxWidth="xs" className={classes.container}>
        <DialogTitle>Reward a person</DialogTitle>
        <DialogContent>
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Autocomplete
                  id="to"
                  fullWidth
                  options={usersOptions}
                  getOptionLabel={(user) => getFullName(user)}
                  value={values.to}
                  onChange={handleAutocompleteChange}
                  renderOption={(user) => (
                    <>
                      <UserAvatar user={user} size="smaller" />
                      <span className={classes.optionName}>{getFullName(user)}</span>
                    </>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Person"
                      placeholder="Person to reward"
                      name="to"
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <>
                            {values.to && (
                              <InputAdornment position="start">
                                <UserAvatar user={values.to as unknown as IUser} size="smaller" />
                              </InputAdornment>
                            )}
                            {params.InputProps.startAdornment}
                          </>
                        ),
                      }}
                      required
                      error={touched.to && Boolean(errors.to)}
                      helperText={touched.to && errors.to}
                    />
                  )}
                  blurOnSelect
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Reward"
                  placeholder="Reward amount"
                  id="reward"
                  name="reward"
                  type="number"
                  InputProps={{
                    inputProps: { min: 0 },
                    startAdornment: <InputAdornment position="start">{CURRENCY}</InputAdornment>,
                  }}
                  value={values.reward}
                  onChange={handleChange}
                  error={touched.reward && Boolean(errors.reward)}
                  helperText={touched.reward && errors.reward}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Message"
                  placeholder="Why person is rewarded"
                  id="message"
                  name="message"
                  multiline
                  rows={3}
                  value={values.message}
                  onChange={handleChange}
                  error={touched.message && Boolean(errors.message)}
                  helperText={touched.message && errors.message}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} className={classes.buttons}>
              <Grid item xs={12} sm={6}>
                <Button onClick={closeDialog} fullWidth variant="contained" color="secondary">
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button type="submit" fullWidth variant="contained" color="primary">
                  Reward
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Container>
    </Dialog>
  );
};
export default AddReward;
