import React, { Component } from 'react';
import { Link } from "react-router-dom";
import api from '../../services/api';
import './styles.css';
import Loading from '../../components/Loading/Loading';

class Main extends Component {
    constructor() {
        super();
        this.state = {
            personagens: [],
            personagemtInfo: {},
            page: 1
        };
    }


    componentDidMount(){
        this.loadpersonagems();
    }

    loadpersonagems = async (page = 1) => {
        const response = await api.get(`/people/?page=${page}`);

        const { results, ...personagemtInfo} = response.data;

        this.setState({ personagens: results, personagemtInfo, page, load:true });
    }

    prevPage = () => {
        const { page } = this.state;
        if( page === 1) return;
        const pageNumber = page - 1;
        this.loadpersonagems(pageNumber);
    }

    nextPage = () => {
        this.setState({load:false},()=>{
            const { page, personagemtInfo } = this.state;
            if( page === personagemtInfo.pages) return;
            const pageNumber = page + 1;
            this.loadpersonagems(pageNumber);
        })
    };

    render() {
        const { personagens, page, personagemtInfo, load } = this.state;

        // console.log(personagens);

        personagens.sort(function(a, b){
            if(a.name < b.name) { return -1; }
            if(a.name > b.name) { return 1; }
            return 0;
        });

        return (
            <div className="personagem-list">
                {!load?<Loading/> :
                personagens.map(personagem => (
                    <article key={personagem.name} style={{color: personagem.eye_color, flex:1, flexDirection:'column'}}>
                        <p><strong>Nome: {personagem.name}</strong></p>
                        <p><strong>Olhos: {personagem.eye_color}</strong></p>
                        <p><strong>Altura: {personagem.height} cm</strong></p>
                        <p><strong>Peso: {personagem.mass} Kg</strong></p>
                        <p><strong>Ano de Nascimento: {personagem.birth_year}</strong></p>
                        <Link to={`/person/${personagem.name}`} style={{background: personagem.eye_color}}>Saiba Mais</Link>
                    </article>
                ))}



                <div className="actions">
                    <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page === personagemtInfo.pages} onClick={this.nextPage}>Próxima</button>
                </div>
            </div>
        )
    }
}

export default Main;