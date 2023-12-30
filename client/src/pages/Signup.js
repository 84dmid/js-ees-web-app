import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { AppContext } from '../components/AppContext.js';
import { Container, Card, Form, Button } from 'react-bootstrap';
import userAPI from '../http/userAPI.js';

const Signup = observer(() => {
    const { user } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user.isAdmin) {
            return navigate('/admin', { replace: true });
        }
        if (user.isAuth && !user.isAdmin) {
            return navigate('/user', { replace: true });
        }
        // eslint-disable-next-line
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const email = event.target.email.value.trim();
        const password = event.target.password.value.trim();
        const data = await userAPI.signup(email, password);
        if (data) {
            user.login(data);
            if (user.isAdmin) {
                navigate('/admin', { replace: true });
            }
            if (user.isAuth && !user.isAdmin) {
                navigate('/user', { replace: true });
            }
        }
    };

    return (
        <Container className="d-flex justify-content-center">
            <Card style={{ width: '50%' }} className="p-2 mt-5 bg-light">
                <h3 className="m-auto">Регистрация</h3>
                <Form className="d-flex flex-column" onSubmit={handleSubmit}>
                    <Form.Control
                        type="email"
                        name="email"
                        className="mt-3"
                        placeholder="Введите ваш email..."
                    />
                    <Form.Control
                        // type="password"
                        name="password"
                        className="mt-3"
                        placeholder="Введите ваш пароль..."
                    />
                    <div className="d-grid gap-2 mt-3">
                        <Button type="submit">Зарегистрироваться</Button>
                    </div>
                </Form>
            </Card>
        </Container>
    );
});

export default Signup;
