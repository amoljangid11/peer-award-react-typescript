import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  big: {
    [theme.breakpoints.up('xs')]: {
      width: theme.spacing(12),
      height: theme.spacing(12),
    },
    [theme.breakpoints.only('xs')]: {
      width: theme.spacing(9),
      height: theme.spacing(9),
    },
  },
  small: {
    width: theme.spacing(5.5),
    height: theme.spacing(5.5),
  },
  smaller: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

export default useStyles;
