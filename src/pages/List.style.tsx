import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  list: {
    width: '100%',
    marginLeft: theme.spacing(2),
    overflowY: 'auto',
    maxHeight: '60vh',
  },
}));

export default useStyles;
