import React, {useEffect, useState} from "react";
import {Grid, Header, Form, Segment, Button, Message} from 'semantic-ui-react';
import {Link, Redirect} from "react-router-dom";
import axios from 'axios';
import alert from "sweetalert";
import './styles.css'

const Register = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(()=>{
        if (localStorage.getItem('token') !== null) setIsLogin(true);
    },[isLogin, isSuccess]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const url = process.env.REACT_APP_API_URL + '/user/register';
        const data = {
            name: event.target.fname.value + ' ' + event.target.lname.value,
            username: event.target.username.value,
            email: event.target.email.value,
            telp: event.target.phone.value,
            password: event.target.password.value
        };
        axios.post(url, data).then(r => {
            if (r.data.status === 200) {
                setIsSuccess(true);
                alert({title: 'Success', text: r.data.message, icon: 'success', timer: 5000});
            } else {
                alert({title: 'Warning', text: r.data.message, icon: 'warning', timer: 5000});
            }
        }).catch(e => alert({title: 'Error', text: e.data.message, icon: 'error', timer: 5000}));
    };

    if (isLogin) return <Redirect to={'/'}/>;
    else if (isSuccess) return <Redirect to={'/login'}/>;
    else return (
          <Grid textAlign={'center'} className={'root'} verticalAlign={'middle'}>
              <Grid.Column className={'box'}>
                  <Header as={'h2'} color={'teal'} textAlign={'center'}>Create new account</Header>
                  <Form size={'large'} onSubmit={(event)=>{handleSubmit(event)}}>
                      <Segment stacked>
                          <Form.Group widths={'equal'}>
                              <Form.Input name={'fname'} placeholder={'First Name'} icon={'address book'} iconPosition={'left'} fluid/>
                              <Form.Input name={'lname'} placeholder={'Last name'} icon={'address book'} iconPosition={'left'} fluid/>
                          </Form.Group>
                          <Form.Input name={'username'} placeholder={'Username'} icon={'user'} iconPosition={'left'} fluid/>
                          <Form.Input name={'email'} placeholder={'E-mail'} icon={'mail'} iconPosition={'left'} fluid/>
                          <Form.Input name={'phone'} placeholder={'Phone'} icon={'phone'} iconPosition={'left'} fluid/>
                          <Form.Input name={'password'} placeholder={'Password'} icon={'lock'} iconPosition={'left'} type={'password'} fluid/>
                          <Button type={'submit'} color={'teal'} size={'large'} fluid>Register</Button>
                      </Segment>
                  </Form>
                  <Message>
                      Have an account? <Link to='/login'>Login</Link>
                  </Message>
              </Grid.Column>
          </Grid>
        )
};

export default Register;
