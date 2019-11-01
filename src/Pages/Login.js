import React, {useEffect, useState} from 'react';
import {Grid, Header, Form, Segment, Button, Message} from 'semantic-ui-react';
import {Link, Redirect} from "react-router-dom";
import axios from "axios";
import alert from 'sweetalert';
import './styles.css'

const Index = () => {
    const [isLogin, setIsLogin] = useState(false);

    useEffect(()=>{
        if (localStorage.getItem('token') !== null) setIsLogin(true);
    },[isLogin]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const url = process.env.REACT_APP_API_URL + '/user/login';
        const data = {username: event.target.username.value, password: event.target.password.value};
        axios.post(url, data).then(r => {
            if (r.data.status === 200) {
                localStorage.setItem('token', r.data.results.token);
                alert({title: 'Success', text: r.data.message, icon: 'success', timer: 5000});
                setIsLogin(true);
            } else {
                alert({title: 'Warning', text: r.data.message, icon: 'warning', timer: 5000});
            }
        }).catch(e => alert({title: 'Error', text: e.data.message, icon: 'error', timer: 5000}));
    };

    if (isLogin) return <Redirect to={'/'}/>;
    else return (
      <div>
          <Grid textAlign={'center'} className={'root'} verticalAlign={'middle'}>
              <Grid.Column className={'box'}>
                  <Header as={'h2'} color={'teal'} textAlign={'center'}>Login to Your Account</Header>
                  <Form onSubmit={(event)=>{handleSubmit(event)}} size={'large'}>
                      <Segment stacked>
                          <Form.Input name={'username'} icon={'user'} placeholder={'Username'} iconPotition={'left'} fluid/>
                          <Form.Input name={'password'} icon={'lock'} placeholder={'Password'} iconPotition={'left'} type={'password'} fluid/>
                          <Button type={'submit'} color={'teal'} size={'large'} fluid>Login</Button>
                      </Segment>
                  </Form>
                  <Message>New to us? <Link to={'/register'}>Register</Link></Message>
              </Grid.Column>
          </Grid>
      </div>
    )
};

export default Index;
