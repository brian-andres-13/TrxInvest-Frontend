import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import LangIcon from '@material-ui/icons/Language';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import logo from '~/static/images/crypto-logo.svg';
import brand from '~/static/text/brand';
import imgApi from '~/static/images/imgAPI';
import { i18n, withTranslation } from '~/i18n';
import useStyles from './footer-style';

function Copyright() {
  return (
    <Typography variant="body2" display="block" color="textSecondary">
      &copy;&nbsp;
      {brand.crypto.footerText}
    </Typography>
  );
}

const footer = {
  description: ['Resource', 'Another resource', 'Final resource', 'Privacy policy', 'Terms of use', 'Terms Condition'],
  link: ['#resource', '#another-resource', '#final-resource', '#privacy-policy', '#terms-of-use'],
};

const news = [
  {
    text: 'Sed imperdiet enim ligula vitae viverra.',
    img: imgApi.photo[5]
  },
  {
    text: 'Sed imperdiet enim ligula vitae viverra.',
    img: imgApi.photo[6]
  },
  {
    text: 'Sed imperdiet enim ligula vitae viverra.',
    img: imgApi.photo[7]
  }
];

function Footer(props) {
  const classes = useStyles();
  const { t, invert } = props;
  const [values, setValues] = useState({
    lang: 'en',
  });

  useEffect(() => {
    setValues({ lang: i18n.language });
  }, []);

  function handleChange(event) {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
    if (event.target.value === 'pe') {
      i18n.changeLanguage('pe');
      props.toggleDir('rtl');
    } else {
      i18n.changeLanguage(event.target.value);
      props.toggleDir('ltr');
    }
  }

  return (
    <Container fixed component="footer">
      <div className={clsx(classes.footer, invert && classes.invert)}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={8}>
            <div className={classes.logo}>
              <img src={logo} alt="logo" />
              <Typography variant="h6" color="textPrimary">
                {brand.crypto.projectName}
              </Typography>
            </div>
            <Typography color="textPrimary" className={classes.footerDesc} gutterBottom>
              {t('crypto-landing:banner_title')}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.socmed}>
              <IconButton aria-label="FB" className={classes.margin} size="small">
                <i className="ion-social-twitter" />
              </IconButton>
              <IconButton aria-label="TW" className={classes.margin} size="small">
                <i className="ion-social-facebook" />
              </IconButton>
              <IconButton aria-label="IG" className={classes.margin} size="small">
                <i className="ion-social-instagram" />
              </IconButton>
              <IconButton aria-label="LI" className={classes.margin} size="small">
                <i className="ion-social-linkedin" />
              </IconButton>
            </div>
            <Select
              value={values.lang}
              onChange={handleChange}
              startAdornment={(
                <InputAdornment className={classes.icon} position="start">
                  <LangIcon />
                </InputAdornment>
              )}
              className={classes.selectLang}
              input={<OutlinedInput labelWidth={200} name="lang" id="outlined-lang-simple" />}
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="pe">فارسی</MenuItem>
              <MenuItem value="hd">हिन्दी</MenuItem>
              <MenuItem value="pt">Português</MenuItem>
              <MenuItem value="zh">简体中文</MenuItem>
            </Select>
            <Copyright />
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}

Footer.propTypes = {
  t: PropTypes.func.isRequired,
  invert: PropTypes.bool,
  toggleDir: PropTypes.func,
};

Footer.defaultProps = {
  invert: false,
  toggleDir: () => {},
};

export default withTranslation(['crypto-landing'])(Footer);
