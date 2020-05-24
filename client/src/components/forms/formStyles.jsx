import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    flexFlow: 'column nowrap',
    margin: '50px auto',
    padding: '0 30px 30px 30px',
    border: '1px solid rgba(0,0,0, 0.5)',
    borderRadius: 10,
    '& > div': {
      marginTop: 10,
    },
  },

  submitBtn: {
    marginTop: 30,
    width: '20%',
  },
});

export default styles;
