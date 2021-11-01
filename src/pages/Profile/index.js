import React, { useState, useEffect } from 'react';
import './style.css'
import { Link, useHistory, useParams } from "react-router-dom";
import api from '../../services/api';

export default function Profile() {
    const { id } = useParams();
    const history = useHistory();
    const initUser = {
        name: '',
        email: '',
        idade: 0,
        empresa: ''
    }
    const [user, setUser] = useState(initUser);

    useEffect(() => {
        if (id) {
            api.get(`/users/${id}`).then(response => {
                setUser(...response.data)
            })
        }
    }, [])

    function onSubmit(ev) {
        ev.preventDefault();
        const method = id ? 'put' : 'post';
        const url = id ? `/users/${id}` : '/users';
        api[method](url, user).then((response) => {
            history.push('/')
        })
    }

    function onChange(ev) {
        const { name, value } =
        ev.target;
        setUser({...user, [name]: value })
        console.log(user)
    }

    return ( <
        div id = "profile-container" > <
        h1 > Cadastro < /h1>  <
        form onSubmit = { onSubmit } > <
        strong > Nome: < /strong> < 
        input name = "name"
        onChange = { onChange }
        value = { user.name }
        / > <
        strong > Email: < /strong> < 
        input type = "email"
        name = "email"
        onChange = { onChange }
        value = { user.email }
        / > <
        strong > Idade: < /strong> < 
        input name = "idade"
        onChange = { onChange }
        value = { user.idade }
        / > <
        strong > Empresa: < /strong> < 
        input name = "empresa"
        onChange = { onChange }
        value = { user.empresa }
        / > <
        div className = "actions" > <
        Link className = "button"
        onClick = {
            () => history.push('/')
        } >
        Voltar < /Link> <
        button className = "button"
        type = "submit" > Salvar < /button>  < /
        div > < /
        form >
        <
        /div >
    );
}